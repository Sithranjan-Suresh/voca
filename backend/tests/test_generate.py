"""Smoke test: verify sentence generation pipeline parses correctly."""
import os
import pytest

# Skip if no API key present (CI without secrets)
pytestmark = pytest.mark.skipif(
    not os.getenv("GROQ_API_KEY"),
    reason="GROQ_API_KEY not set",
)

from services.groq_client import generate_sentences


def test_generate_sentences_returns_three():
    sentences = generate_sentences.__wrapped__ if hasattr(generate_sentences, '__wrapped__') else generate_sentences
    result = generate_sentences("Return exactly 3 sentences numbered like this, one per line, nothing else:\n1. I need water right now.\n2. Can someone get me some water?\n3. I'm thirsty and need help.\n\nConcepts: Water, Help")
    assert isinstance(result, list)
    assert len(result) == 3
    assert all(isinstance(s, str) and len(s) > 5 for s in result)


def test_parse_emergency_single_concept():
    """Emergency concepts work with single-concept generation."""
    from data.concepts import get_labels
    labels = get_labels(["chest_pain"])
    assert labels == ["Chest Pain"]


def test_basics_concepts_present():
    """Basics vocabulary is registered."""
    from data.concepts import CONCEPT_MAP
    for cid in ["yes", "no", "please", "thank_you", "stop", "wait", "more", "again"]:
        assert cid in CONCEPT_MAP, f"Missing concept: {cid}"


def test_profiles_distinct():
    """Jake and Maria have meaningfully different phrasing styles."""
    from data.profiles import get_profile
    jake = get_profile("jordan")
    maria = get_profile("alex")
    assert jake["phrasing_style"] != maria["phrasing_style"]
    assert jake["sample_phrases"] != maria["sample_phrases"]
