"""Pydantic schemas for data validation."""
from pydantic import BaseModel
from typing import Optional


class ContactSchema(BaseModel):
    """Contact information for waste management department."""
    official_phone: Optional[str] = None
    department_name: Optional[str] = None
    website_url: Optional[str] = None


class FacilitySchema(BaseModel):
    """Single drop-off facility."""
    name: str
    address: Optional[str] = None
    type: Optional[str] = None
    hours: Optional[str] = None
    tipping_fee: Optional[str] = None
    residency_required: Optional[bool] = None
    notes: Optional[str] = None
    google_maps_url: Optional[str] = None
    source: Optional[str] = None


class CurbsideRulesSchema(BaseModel):
    """
    Curbside collection rules.

    IMPORTANT: is_available uses three-valued logic:
      True  → city explicitly offers curbside bulk/mattress pickup
      False → city explicitly states curbside is NOT available
      None  → status unknown / not found in scraped content

    The original `bool = False` default was wrong: Pydantic would silently
    coerce None → False, causing "no curbside pickup" to be published for
    cities where we simply had no information.
    """
    is_available: Optional[bool] = None          # FIX: was `bool = False`
    mattress_specific_rule: Optional[str] = None
    placement_time: Optional[str] = None
    size_limits: Optional[str] = None
    the_catch: Optional[str] = None
    schedule_logic: Optional[str] = None


class IllegalDumpingSchema(BaseModel):
    """Illegal dumping fines and citations."""
    fine_amount: Optional[str] = None
    citation: Optional[str] = None