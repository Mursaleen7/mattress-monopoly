"""Utility functions for the scraper."""
import json
import re
from typing import Dict, List
from datetime import datetime


class ScraperError(Exception):
    """Base exception for scraper errors."""
    pass


class RateLimitError(ScraperError):
    """Rate limit exceeded."""
    pass


class ParseError(ScraperError):
    """Failed to parse response."""
    pass


def parse_llm_json(text: str) -> dict:
    """
    Parse JSON from LLM response with proper error handling.
    
    Args:
        text: Raw text from LLM that may contain JSON
        
    Returns:
        Parsed JSON dict
        
    Raises:
        ParseError: If JSON cannot be extracted
    """
    # Strip markdown fences
    text = re.sub(r'```(?:json)?\s*|\s*```', '', text).strip()
    
    # Try direct parse first
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass
    
    # Try extracting the outermost JSON object
    match = re.search(r'\{[\s\S]*\}', text)
    if match:
        try:
            return json.loads(match.group(0))
        except json.JSONDecodeError:
            pass
    
    raise ParseError(f"Could not parse JSON from LLM response: {text[:200]}")


def calculate_confidence(extracted: Dict, geo: Dict) -> Dict:
    """
    Calculate confidence score with detailed breakdown.
    
    Args:
        extracted: Extracted data dict
        geo: Geographic data dict
        
    Returns:
        Dict with score, grade, and breakdown
    """
    checks = {
        'has_phone': bool(extracted.get('contacts', {}).get('official_phone')),
        'has_website': bool(extracted.get('contacts', {}).get('website_url')),
        'has_curb_rule': bool(extracted.get('curbside_rules', {}).get('mattress_specific_rule')),
        'has_facilities': len(extracted.get('drop_off_locations', [])) > 0,
        'has_fine': bool(extracted.get('illegal_dumping', {}).get('fine_amount')),
        'has_geo': bool(geo.get('latitude')),
    }
    
    score = sum(checks.values()) / len(checks)
    
    return {
        'score': round(score, 2),
        'grade': 'HIGH' if score >= 0.8 else 'MEDIUM' if score >= 0.5 else 'LOW',
        'breakdown': checks
    }


class Logger:
    """Centralized logging for scraper operations."""
    
    def __init__(self):
        self.log_entries: List[Dict] = []
    
    def log(self, field: str, status: str, details: str):
        """Log a scraper operation."""
        log_entry = {
            'field': field,
            'status': status,
            'details': details[:200],
            'timestamp': datetime.now().isoformat()
        }
        self.log_entries.append(log_entry)
        print(f"  [{status}] {field}: {details[:100]}")
    
    def get_successful_sources(self) -> List[str]:
        """Get list of successful source URLs."""
        return [
            entry['details'] for entry in self.log_entries
            if entry['status'] == 'SUCCESS' and entry['field'] in
            ('gov_page_scraped', 'ordinance_page', 'dallas_fallback', 'pdf_extracted')
        ]
    
    def reset(self):
        """Reset log entries."""
        self.log_entries = []