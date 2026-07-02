"""Smoke tests for the generation pipeline."""
import os
import sys
import pytest

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from services.groq_client import _parse_sentences


def test_parse_sentences_numbered_list():
    """Parser correctly extracts 3 sentences from numbered output."""
    raw = "1. My chest is hurting right now.\n2. I need help immediately.\n3. Please call for assistance."
    result = _parse_sentences(raw)
    assert len(result) == 3
    assert result[0] == "My chest is hurting right now."
    assert result[1] == "I need help immediately."
    assert result[2] == "Please call for assistance."


def test_parse_sentences_strips_quotes():
    """Parser strips surrounding quotes from sentences."""
    raw = '1. "First sentence here."\n2. Second sentence.\n3. Third sentence.'
    result = _parse_sentences(raw)
    assert result[0] == "First sentence here."


def test_parse_emergency_single_concept():
    """Emergency concepts produce the correct label."""
    from data.concepts import get_labels
    assert get_labels(["chest_pain"]) == ["Chest Pain"]
    assert get_labels(["cant_breathe"]) == ["Can't Breathe"]


def test_basics_concepts_present():
    """All Basics vocabulary IDs are registered."""
    from data.concepts import CONCEPT_MAP
    for cid in ["yes", "no", "please", "thank_you", "stop", "wait", "more", "again"]:
        assert cid in CONCEPT_MAP, f"Missing Basics concept: {cid}"


def test_profiles_distinct():
    """Jake and Maria have meaningfully different phrasing styles and samples."""
    from data.profiles import get_profile
    jake = get_profile("jordan")
    maria = get_profile("alex")
    assert jake["phrasing_style"] != maria["phrasing_style"]
    assert jake["sample_phrases"] != maria["sample_phrases"]


def test_exclusion_block_in_prompt():
    """Excluded sentences appear in the generated prompt."""
    from data.profiles import get_profile
    from services.prompt_builder import build_prompt
    profile = get_profile("jordan")
    prompt = build_prompt(["water", "help"], profile, ["I need water right now."])
    assert "I need water right now." in prompt
    assert "do NOT repeat" in prompt
