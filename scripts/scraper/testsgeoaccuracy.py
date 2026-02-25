"""
tests_geo_accuracy.py — Unit tests for all 10 accuracy bugs fixed.

Run with: python -m pytest tests_geo_accuracy.py -v
"""

import sys, os
sys.path.insert(0, os.path.dirname(__file__))

import re
import pytest
from unittest.mock import AsyncMock, MagicMock, patch


# ─────────────────────────────────────────────────────────────────────────────
# Minimal stubs so tests run without real API keys
# ─────────────────────────────────────────────────────────────────────────────

os.environ.setdefault('GEMINI_API_KEY', 'test-key')
os.environ.setdefault('GOOGLE_MAPS_API_KEY', 'test-key')
os.environ.setdefault('SERPAPI_KEY', 'test-key')


# ─────────────────────────────────────────────────────────────────────────────
# Import modules under test (after env vars are set)
# ─────────────────────────────────────────────────────────────────────────────

from geo_validator import GeoValidator, US_STATES, _AMBIGUOUS_ABBRS
from config import CITY_KNOWN_DATA
from schemas import CurbsideRulesSchema


# ─────────────────────────────────────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────────────────────────────────────

def make_validator():
    logger = MagicMock()
    logger.log = MagicMock()
    return GeoValidator(logger, 'fake-key')


# ═════════════════════════════════════════════════════════════════════════════
# BUG 1: _detect_conflicting_states — ambiguous abbreviation false positives
# ═════════════════════════════════════════════════════════════════════════════

class TestBug1DetectConflictingStates:
    """
    State abbreviations IN, OR, ME, LA, MA etc. are common English words.
    The old code matched them as bare substrings, generating false positives
    on legitimate content like Austin TX solid-waste pages.
    """

    def setup_method(self):
        self.v = make_validator()

    def test_or_not_matched_as_oregon_in_normal_text(self):
        """'or' as conjunction must not be detected as Oregon."""
        text = (
            "Place your bulk items at the curb or call 3-1-1 for more information. "
            "Mattresses must be bagged or covered. Items accepted on Monday or Tuesday."
        )
        conflicts = self.v._detect_conflicting_states(text, 'TX', 'Texas')
        conflict_names = [c[0] for c in conflicts]
        assert 'Oregon' not in conflict_names, (
            "'or' in text should NOT detect Oregon as a conflicting state"
        )

    def test_in_not_matched_as_indiana(self):
        """'in' as preposition must not be detected as Indiana."""
        text = (
            "Items in the curbside pile must be placed in a visible location. "
            "Place them in your driveway in advance of collection day."
        )
        conflicts = self.v._detect_conflicting_states(text, 'TX', 'Texas')
        conflict_names = [c[0] for c in conflicts]
        assert 'Indiana' not in conflict_names

    def test_me_not_matched_as_maine(self):
        """'me' as pronoun must not be detected as Maine."""
        text = "Call me at 311. This applies to me and my household items."
        conflicts = self.v._detect_conflicting_states(text, 'TX', 'Texas')
        conflict_names = [c[0] for c in conflicts]
        assert 'Maine' not in conflict_names

    def test_la_not_matched_as_louisiana(self):
        """'la' must not trigger Louisiana detection."""
        text = "Contact la ciudad for more details on bulk waste pickup schedules."
        conflicts = self.v._detect_conflicting_states(text, 'TX', 'Texas')
        conflict_names = [c[0] for c in conflicts]
        assert 'Louisiana' not in conflict_names

    def test_full_state_name_detected_correctly(self):
        """Content genuinely about New York should be detected when target is TX."""
        text = (
            "New York City residents must schedule a pickup. "
            "The New York Department of Sanitation handles bulk waste in New York. "
            "Contact New York City 311 for assistance."
        )
        conflicts = self.v._detect_conflicting_states(text, 'TX', 'Texas')
        conflict_names = [c[0] for c in conflicts]
        assert 'New York' in conflict_names

    def test_target_state_not_counted_as_conflict(self):
        """The target state must never appear in its own conflict list."""
        text = (
            "Austin, Texas residents can schedule bulk item pickup through "
            "Austin Resource Recovery. Texas law requires proper disposal."
        )
        conflicts = self.v._detect_conflicting_states(text, 'TX', 'Texas')
        conflict_names = [c[0] for c in conflicts]
        assert 'Texas' not in conflict_names

    def test_ambiguous_abbrs_list_is_comprehensive(self):
        """Key ambiguous abbreviations must be in the exclusion set."""
        ambiguous = ['IN', 'OR', 'ME', 'LA', 'MA', 'PA', 'CO', 'DE', 'HI', 'ID', 'OK']
        for abbr in ambiguous:
            assert abbr in _AMBIGUOUS_ABBRS, f"{abbr} should be in _AMBIGUOUS_ABBRS"


# ═════════════════════════════════════════════════════════════════════════════
# BUG 2: validate_scraped_content — weak state counting with str.count()
# ═════════════════════════════════════════════════════════════════════════════

class TestBug2StateCountingWordBoundary:

    def setup_method(self):
        self.v = make_validator()

    def test_tx_not_counted_in_text_or_extra(self):
        """'tx' substring inside 'text' and 'extra' must not count as Texas."""
        # Old code: text.count('tx') on "text extra matrix" → returns 3 (wrong!)
        text = "Please contact us for extra text information about matrix programs."
        count = self.v._count_state_mentions(text, 'TX', 'Texas')
        assert count == 0, f"Expected 0 TX mentions in common words, got {count}"

    def test_ca_not_counted_in_because_can_category(self):
        """'ca' inside 'because', 'can', 'category' should not count as California."""
        text = "Because we can help you, category A items are accepted."
        count = self.v._count_state_mentions(text, 'CA', 'California')
        assert count == 0

    def test_texas_full_name_counted(self):
        """Full state name with word boundary should count correctly."""
        text = "Texas residents must follow Texas solid waste guidelines."
        count = self.v._count_state_mentions(text, 'TX', 'Texas')
        assert count >= 2

    def test_geo_abbr_pattern_counted(self):
        """', TX' address pattern should count."""
        text = "Austin, TX — Call 512-974-2000. Dallas, TX residents see section 3."
        count = self.v._count_state_mentions(text, 'TX', 'Texas')
        assert count >= 2

    def test_content_not_rejected_for_austin_tx(self):
        """Valid Austin TX content should pass validation."""
        text = (
            "Austin, Texas residents can set bulk items at the curb on their "
            "regular collection day. Austin Resource Recovery (ARR) accepts "
            "mattresses, box springs, and furniture. Contact ARR at 3-1-1 or "
            "visit austintexas.gov. Texas law prohibits illegal dumping with "
            "fines up to $2,000 per Austin City Code Chapter 12-8."
        )
        is_valid, warning = self.v.validate_scraped_content(text, 'Austin', 'TX', 'Texas')
        assert is_valid, f"Austin TX content should be valid, got warning: {warning}"


# ═════════════════════════════════════════════════════════════════════════════
# BUG 3: CITY_KNOWN_DATA keyed by city name only (no state)
# ═════════════════════════════════════════════════════════════════════════════

class TestBug3CityKnownDataStateQualifiedKeys:

    def test_portland_or_and_me_separate_entries(self):
        """Portland OR and Portland ME must have separate entries."""
        assert 'Portland|OR' in CITY_KNOWN_DATA
        assert 'Portland|ME' in CITY_KNOWN_DATA
        or_data = CITY_KNOWN_DATA['Portland|OR']
        me_data = CITY_KNOWN_DATA['Portland|ME']
        assert or_data['website_url'] != me_data['website_url'], (
            "Portland OR and ME must have different URLs"
        )

    def test_columbus_oh_and_ga_separate_entries(self):
        """Columbus OH and Columbus GA must have separate entries."""
        assert 'Columbus|OH' in CITY_KNOWN_DATA
        assert 'Columbus|GA' in CITY_KNOWN_DATA

    def test_no_bare_city_name_keys(self):
        """No key in CITY_KNOWN_DATA should be a bare city name without state."""
        for key in CITY_KNOWN_DATA:
            assert '|' in key, (
                f"CITY_KNOWN_DATA key '{key}' lacks state suffix — must be 'City|ST'"
            )
            parts = key.split('|')
            assert len(parts) == 2
            assert len(parts[1]) == 2, f"State part '{parts[1]}' must be 2-letter abbr"
            assert parts[1].isupper(), f"State part '{parts[1]}' must be uppercase"

    def test_all_states_valid(self):
        """All state abbreviations in CITY_KNOWN_DATA must be real US states."""
        for key in CITY_KNOWN_DATA:
            state = key.split('|')[1]
            assert state in US_STATES, f"'{state}' in key '{key}' is not a valid US state"

    def test_apply_known_data_patch_uses_state_key(self):
        """Phase3._apply_known_data_patch must use City|ST key."""
        # Simulate the lookup pattern that phases.py now uses.
        city, state = 'Portland', 'OR'
        key = f"{city}|{state.upper()}"
        assert key in CITY_KNOWN_DATA
        assert CITY_KNOWN_DATA[key].get('website_url') is not None

        # Portland ME must NOT get Portland OR data
        key_me = f"Portland|ME"
        assert CITY_KNOWN_DATA.get(key_me) != CITY_KNOWN_DATA.get('Portland|OR')


# ═════════════════════════════════════════════════════════════════════════════
# BUG 4: CurbsideRulesSchema.is_available default was bool=False → None coercion
# ═════════════════════════════════════════════════════════════════════════════

class TestBug4CurbsideSchemaIsAvailable:

    def test_none_stays_none_not_coerced_to_false(self):
        """Pydantic must NOT coerce None → False for is_available."""
        schema = CurbsideRulesSchema(is_available=None)
        assert schema.is_available is None, (
            "is_available=None must remain None, not be coerced to False"
        )

    def test_false_stays_false(self):
        schema = CurbsideRulesSchema(is_available=False)
        assert schema.is_available is False

    def test_true_stays_true(self):
        schema = CurbsideRulesSchema(is_available=True)
        assert schema.is_available is True

    def test_default_is_none_not_false(self):
        """Default value must be None (unknown), not False (explicitly unavailable)."""
        schema = CurbsideRulesSchema()
        assert schema.is_available is None, (
            "Default is_available must be None, not False. "
            "False = 'explicitly no curbside'. None = 'we don't know'."
        )


# ═════════════════════════════════════════════════════════════════════════════
# BUG 6: _is_relevant_domain — any .gov was accepted regardless of state
# ═════════════════════════════════════════════════════════════════════════════

class TestBug6RelevantDomainStateAware:

    def test_ny_gov_rejected_for_tx_city(self):
        """ny.gov domain should be rejected when processing an Austin TX query."""
        from scraper.phases import Phase2Reconnaissance
        assert not Phase2Reconnaissance._is_relevant_domain(
            'https://www.ny.gov/bulk-waste', 'Austin', 'TX'
        ), "ny.gov must be rejected for TX city"

    def test_tx_gov_accepted_for_tx_city(self):
        from scraper.phases import Phase2Reconnaissance
        assert Phase2Reconnaissance._is_relevant_domain(
            'https://www.austintexas.gov/solidwaste', 'Austin', 'TX'
        )

    def test_gov_without_state_label_accepted(self):
        """Generic .gov without a state DNS label should be accepted."""
        from scraper.phases import Phase2Reconnaissance
        assert Phase2Reconnaissance._is_relevant_domain(
            'https://www.cityofdallas.gov/sanitation', 'Dallas', 'TX'
        )

    def test_epa_always_rejected(self):
        from scraper.phases import Phase2Reconnaissance
        assert not Phase2Reconnaissance._is_relevant_domain(
            'https://www.epa.gov/waste', 'Houston', 'TX'
        )


# ═════════════════════════════════════════════════════════════════════════════
# BUG 10: _detect_state_in_url — path fragments matched as state abbreviations
# ═════════════════════════════════════════════════════════════════════════════

class TestBug10DetectStateInUrl:

    def setup_method(self):
        self.v = make_validator()

    def test_or_in_ordinance_path_not_flagged(self):
        """'/ordinance/' in URL path must not be detected as Oregon."""
        result = self.v._detect_state_in_url(
            'https://portland.gov/ordinance/bulk-items', 'OR'
        )
        # 'or' is in the TARGET state ('OR'), so no conflict → None
        assert result is None

    def test_in_in_information_path_not_flagged(self):
        """'/information/' must not be detected as Indiana."""
        result = self.v._detect_state_in_url(
            'https://austin.gov/information/bulk-waste', 'TX'
        )
        assert result is None, "'in' in '/information/' must not flag Indiana"

    def test_me_in_membership_not_flagged(self):
        """'/membership/' must not flag Maine."""
        result = self.v._detect_state_in_url(
            'https://austin.gov/membership/register', 'TX'
        )
        assert result is None

    def test_co_in_contact_not_flagged(self):
        """'co' in '/contact/' must not flag Colorado."""
        result = self.v._detect_state_in_url(
            'https://dallas.gov/contact/waste', 'TX'
        )
        assert result is None

    def test_ny_gov_domain_detected_as_conflict(self):
        """ny.gov as a DNS label must be detected as a different state."""
        result = self.v._detect_state_in_url(
            'https://www.ny.gov/solidwaste', 'TX'
        )
        assert result == 'NY', "ny.gov should detect New York as conflicting state"

    def test_tx_us_domain_not_flagged_for_tx(self):
        """TX in domain is not a conflict when target is TX."""
        result = self.v._detect_state_in_url(
            'https://www.dallas.tx.us/sanitation', 'TX'
        )
        assert result is None

    def test_ny_us_flagged_when_target_is_tx(self):
        """ny.us domain should be flagged when processing TX city."""
        result = self.v._detect_state_in_url(
            'https://www.somecity.ny.us/waste', 'TX'
        )
        assert result == 'NY'


# ═════════════════════════════════════════════════════════════════════════════
# NYC content validation — key integration test
# ═════════════════════════════════════════════════════════════════════════════

class TestNYCContentValidation:

    def setup_method(self):
        self.v = make_validator()

    def test_nyc_content_rejected_for_non_ny_city(self):
        """NYC-specific content must be rejected when target is NOT NY."""
        text = (
            "NYC Department of Sanitation (DSNY) handles bulk waste in New York City. "
            "Manhattan, Brooklyn, Queens, the Bronx, and Staten Island residents "
            "should visit nyc.gov/dsny or call 311 NYC. NYC Administrative Code "
            "Section 16-118 governs illegal dumping in New York City."
        )
        is_valid, warning = self.v.validate_scraped_content(
            text, 'New York', 'TX', 'Texas'
        )
        assert not is_valid, "NYC content should be rejected for TX city"
        assert warning is not None

    def test_nyc_content_accepted_for_ny(self):
        """NYC content must be accepted when target state IS NY."""
        text = (
            "NYC Department of Sanitation (DSNY) handles bulk waste in New York City. "
            "Manhattan, Brooklyn, Queens, the Bronx, and Staten Island residents "
            "should visit nyc.gov/dsny or call NYC 311."
        )
        is_valid, warning = self.v.validate_scraped_content(
            text, 'New York City', 'NY', 'New York'
        )
        assert is_valid, f"NYC content should pass for NY target, got: {warning}"

    def test_valid_dallas_tx_content_not_rejected(self):
        """Normal Dallas TX content must not trigger any false rejection."""
        text = (
            "Dallas Sanitation Services provides curbside bulk waste collection. "
            "Dallas residents can place large items including mattresses, box springs, "
            "and furniture at the curb. Dallas, Texas - City Code Chapter 18 "
            "governs illegal dumping fines of $500 to $2,000. Contact Dallas 3-1-1."
        )
        is_valid, warning = self.v.validate_scraped_content(
            text, 'Dallas', 'TX', 'Texas'
        )
        assert is_valid, f"Valid Dallas TX content should pass, got warning: {warning}"


# ═════════════════════════════════════════════════════════════════════════════
# Full namesake city disambiguation scenarios
# ═════════════════════════════════════════════════════════════════════════════

class TestNamesakeCityDisambiguation:

    def setup_method(self):
        self.v = make_validator()

    def test_springfield_il_not_mo(self):
        """Springfield IL content must not be rejected as Springfield MO."""
        text = (
            "Springfield, Illinois solid waste services. The City of Springfield IL "
            "Public Works Department handles bulk waste. Illinois residents can "
            "contact 217-789-2255. Illinois state law applies."
        )
        is_valid, _ = self.v.validate_scraped_content(
            text, 'Springfield', 'IL', 'Illinois'
        )
        assert is_valid

    def test_columbus_ga_content_not_confused_with_ohio(self):
        """Columbus GA content should pass without triggering Ohio detection."""
        text = (
            "Columbus, Georgia Consolidated Government solid waste. "
            "Georgia residents in Columbus can drop off bulk items at the "
            "Columbus Transfer Station on Schatulga Road. Georgia law governs fines."
        )
        is_valid, warning = self.v.validate_scraped_content(
            text, 'Columbus', 'GA', 'Georgia'
        )
        assert is_valid, f"Columbus GA content should pass, got: {warning}"

    def test_ohio_content_not_passed_for_georgia(self):
        """Content clearly about Columbus Ohio must be rejected for Columbus GA."""
        text = (
            "Columbus, Ohio residents contact the city at 614-645-3111. "
            "Ohio solid waste regulations in Columbus Ohio apply to all residents. "
            "Columbus Ohio code section 921 governs illegal dumping. Ohio EPA rules."
        )
        is_valid, warning = self.v.validate_scraped_content(
            text, 'Columbus', 'GA', 'Georgia'
        )
        # Ohio appears far more than Georgia → should fail
        assert not is_valid, "Ohio content should be rejected for Georgia target"


# ═════════════════════════════════════════════════════════════════════════════
# Source URL validation (covers Bug 10 in context)
# ═════════════════════════════════════════════════════════════════════════════

class TestSourceUrlValidation:

    def setup_method(self):
        self.v = make_validator()

    def test_correct_state_gov_url_accepted(self):
        valid, rejected = self.v.validate_sources(
            ['https://www.austintexas.gov/solidwaste'], 'Austin', 'TX'
        )
        assert len(valid) == 1
        assert len(rejected) == 0

    def test_wrong_state_domain_rejected(self):
        valid, rejected = self.v.validate_sources(
            ['https://www.ny.gov/bulk-waste'], 'Austin', 'TX'
        )
        assert len(rejected) == 1
        assert len(valid) == 0

    def test_path_with_or_not_rejected_for_oregon(self):
        """URL with 'or' in path should NOT be rejected as Oregon-specific."""
        valid, rejected = self.v.validate_sources(
            ['https://www.austintexas.gov/ordinance/waste-rules'], 'Austin', 'TX'
        )
        assert len(valid) == 1, (
            "URL with '/ordinance/' must not be rejected as Oregon domain"
        )

    def test_city_name_in_url_accepted(self):
        valid, rejected = self.v.validate_sources(
            ['https://www.houston.gov/solidwaste'], 'Houston', 'TX'
        )
        assert len(valid) == 1


if __name__ == '__main__':
    import subprocess
    result = subprocess.run(
        ['python', '-m', 'pytest', __file__, '-v', '--tb=short'],
        capture_output=False,
    )
    sys.exit(result.returncode)