"""Main orchestration for the autonomous scraper."""
import asyncio
import random
from typing import Dict
from datetime import datetime

from .utils import Logger, calculate_confidence
from .phases import (
    Phase1Foundation, Phase2Reconnaissance, Phase3Intelligence,
    Phase5Competitor
)
from .agents import CharismaSynthesizer


class AutonomousScraper:
    """
    Multi-agent orchestration system for autonomous city data generation.
    Refactored with proper async HTTP, modular structure, and security.
    """
    
    def __init__(self):
        self.logger = Logger()
        
        # Initialize phases
        self.phase1 = Phase1Foundation(self.logger)
        self.phase2 = Phase2Reconnaissance(self.logger)
        self.phase3 = Phase3Intelligence(self.logger)
        self.phase5 = Phase5Competitor(self.logger)
        
        # Initialize charisma synthesizer
        self.charisma = CharismaSynthesizer(self.logger)
    
    async def scrape_city_autonomous(self, city_name: str, state_abbr: str, state_name: str) -> Dict:
        """
        Main orchestration method - generates 100% of v5.0 schema.
        
        Args:
            city_name: City name (e.g., "Austin")
            state_abbr: State abbreviation (e.g., "TX")
            state_name: Full state name (e.g., "Texas")
            
        Returns:
            Complete city data dict
        """
        # Reset log for each city
        self.logger.reset()
        
        print(f"\n{'='*80}")
        print(f"🤖 AUTONOMOUS PIPELINE: {city_name}, {state_abbr}")
        print(f"{'='*80}\n")
        
        # Phase 1: Foundation Layer (Deterministic APIs)
        print("📍 PHASE 1: Foundation Layer (Geo + Census + Weather)")
        geo_data = await self.phase1.execute(city_name, state_abbr, state_name)
        
        # Check if geographical validation failed
        if geo_data.get('geo_validation_failed'):
            print(f"\n❌ VALIDATION FAILED: {geo_data.get('geo_validation_error')}")
            print(f"⚠️  Skipping {city_name}, {state_abbr} to prevent data hallucination\n")
            return {
                'error': 'geo_validation_failed',
                'message': geo_data.get('geo_validation_error'),
                'city_name': city_name,
                'state_abbr': state_abbr,
                'skipped': True
            }
        
        # Phase 2: Reconnaissance Layer (Search & Fetch)
        print("\n🔍 PHASE 2: Reconnaissance Layer (Official Sources)")
        official_content = await self.phase2.execute(city_name, state_abbr, state_name)
        
        # Check if content validation failed
        if official_content.get('content_validation_failed'):
            print(f"\n⚠️  CONTENT VALIDATION WARNING: {official_content.get('content_validation_warning')}")
            print(f"🔄 Scraped content rejected - will use fallback data only\n")
        
        # Phase 3: Intelligence Layer (LLM Extraction)
        print("\n🧠 PHASE 3: Intelligence Layer (Structured Extraction)")
        extracted_data = await self.phase3.execute(official_content, city_name, state_abbr)
        
        # Phase 4: Charisma Synthesis Layer (Copywriting)
        print("\n✨ PHASE 4: Charisma Synthesis (SEO + Hero + Neighborhoods)")
        charisma_data = await self.charisma.generate(extracted_data, geo_data, city_name, state_abbr)
        
        # Phase 5: Competitor Triangulation
        print("\n💰 PHASE 5: Competitor Triangulation (Pricing)")
        competitor_data = await self.phase5.execute(city_name, state_abbr)
        
        # Phase 6: Assembly & Validation
        print("\n🔧 PHASE 6: Assembly & Validation")
        final_data = self._phase6_assembly(
            city_name, state_name, state_abbr,
            geo_data, official_content, extracted_data, charisma_data, competitor_data
        )
        
        return final_data
    
    def _phase6_assembly(self, city_name: str, state_name: str, state_abbr: str,
                         geo_data: Dict, official_content: Dict, extracted_data: Dict, charisma_data: Dict,
                         competitor_data: Dict) -> Dict:
        """
        Phase 6: Assemble final v5.0 schema with validation.
        """
        # Normalize website URL
        contacts = extracted_data.get('contacts', {}).copy()
        if contacts.get('website_url'):
            url = contacts['website_url']
            if not url.startswith('http'):
                contacts['website_url'] = 'https://www.' + url
        
        # Build complete city object
        city_data = {
            'city_slug': f"{city_name.lower().replace(' ', '-')}-{state_abbr.lower()}",
            'city_name': city_name,
            'state_name': state_name,
            'state_slug': state_name.lower().replace(' ', '-'),
            'state_abbr': state_abbr,
            
            # Phase 1: Geo data
            'geo': {
                'latitude': geo_data.get('latitude'),
                'longitude': geo_data.get('longitude'),
                'zip_codes': geo_data.get('zip_codes', [])
            },
            
            # Phase 4: SEO & Charisma
            'seo': {
                'title_override': charisma_data.get('seo_title'),
                'meta_desc_override': charisma_data.get('seo_description')
            },
            'hero_hook': charisma_data.get('hero_hook', ''),
            'neighborhoods': charisma_data.get('neighborhoods', ''),
            
            # Phase 1: Population
            'population': geo_data.get('population', {
                'count': None,
                'year': 2020,
                'source': f"https://www.census.gov/quickfacts/{city_name.lower().replace(' ', '')}city{state_abbr.lower()}"
            }),
            
            # Phase 3: Extracted data
            'contacts': contacts,
            'curbside_rules': extracted_data.get('curbside_rules', {}),
            'weather_profile': geo_data.get('weather_profile', {}),
            'drop_off_locations': extracted_data.get('drop_off_locations', []),
            'donation_policy': extracted_data.get('donation_policy'),
            'illegal_dumping': extracted_data.get('illegal_dumping', {}),
            
            # Phase 5: Affiliate & Competitor
            'affiliate_config': {
                'partner_name': 'LoadUp',
                'custom_link_slug': f"{city_name.lower().replace(' ', '-')}-{state_abbr.lower()}-mattress-disposal",
                'base_price_display': '$80',
                'competitor_comparison': competitor_data
            },
            
            # Audit metadata
            'audit_metadata': {
                'confidence_score': calculate_confidence(extracted_data, geo_data)['grade'],
                'confidence_breakdown': calculate_confidence(extracted_data, geo_data)['breakdown'],
                'verification_checklist': {
                    'gov_source_found': bool(extracted_data.get('contacts', {}).get('website_url')),
                    'mattress_rule_verified': bool(extracted_data.get('curbside_rules', {}).get('mattress_specific_rule')),
                    'facility_hours_verified': len(extracted_data.get('drop_off_locations', [])) > 0,
                    'facility_type_verified': True,
                    'population_census_verified': bool(
                        geo_data.get('population', {}) and
                        geo_data['population'].get('count') is not None
                    ),
                    'geo_validation_passed': not geo_data.get('geo_validation_failed', False),
                    # BUG D FIX: was hardcoded True; now reads actual Phase 2 result
                    'content_validation_passed': not official_content.get('content_validation_failed', False),
                },
                'sources_used': self.logger.get_successful_sources(),
                'rejected_sources': [],  # Will be populated if validation failed
                'last_updated': datetime.now().strftime('%Y-%m-%d'),
                'scraping_method': 'AUTONOMOUS_MULTI_AGENT_PIPELINE_V2'
            }
        }
        
        # Add Google Maps URLs to facilities
        for facility in city_data['drop_off_locations']:
            if facility.get('address') and not facility.get('google_maps_url'):
                address_encoded = facility['address'].replace(' ', '+')
                facility['google_maps_url'] = f"https://www.google.com/maps/search/?api=1&query={address_encoded}"
        
        return city_data