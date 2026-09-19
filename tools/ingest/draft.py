"""Own-words DRAFT placeholders — never copy article body text."""

from __future__ import annotations

from pools import CONTROLLED_TAGS


def filter_tags(tags: list[str]) -> list[str]:
    out = [t for t in tags if t in CONTROLLED_TAGS]
    # 1–3 tags
    return out[:3] if out else ["software"]


def draft_summary(title: str, pool: str, url: str) -> str:
    """Produce an 80–180 word own-words placeholder clearly marked DRAFT."""
    # Fixed template — intentionally not scraped from the article.
    body = (
        f"[DRAFT — needs Sarah edit] This OpenBrief candidate points at “{title}” "
        f"({pool} source). Engineers should open the linked page for the authoritative "
        f"explanation; this stub only reserves a card slot.\n\n"
        f"The draft goal is one teachable idea: what problem the topic solves, the core "
        f"mechanism in plain language, and one practical takeaway for day-to-day work "
        f"(debugging, design, or operations). Replace this paragraph with an original "
        f"80–180 word summary. Do not paste the article. Keep attribution accurate and "
        f"tags from the controlled list only.\n\n"
        f"Source URL (link only, no full-article storage): {url}"
    )
    # Ensure word count roughly in band (pad lightly if short).
    words = body.split()
    if len(words) < 80:
        pad = (
            " Sarah: tighten voice, verify license line, and confirm the brief teaches "
            "one idea before promote."
        )
        body = body + pad
        words = body.split()
    if len(words) > 180:
        body = " ".join(words[:175]) + " […] [DRAFT truncated for length]"
    return body


def attribution_text(source_title: str, pool: str, license_id: str) -> str:
    if pool == "mdn":
        return (
            f'Summary based on “{source_title}” by Mozilla Contributors (MDN), '
            f"licensed under {license_id}"
        )
    if pool == "wikipedia":
        return f'Summary based on Wikipedia “{source_title},” licensed under {license_id}'
    return f"Summary based on “{source_title},” licensed under {license_id}"
