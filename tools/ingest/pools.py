"""Approved seed URL pools for v0 stub discover (MDN + Wikipedia engineering pages)."""

from __future__ import annotations

# Hardcoded allowlist — only MDN / Wikipedia engineering docs.
# discover() skips any URL already in briefs/feed.json or candidates/.
SEED_POOL: list[dict] = [
    {
        "url": "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API",
        "pool": "mdn",
        "fallback_title": "Fetch API",
        "proposed_tags": ["web", "software"],
    },
    {
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status",
        "pool": "mdn",
        "fallback_title": "HTTP response status codes",
        "proposed_tags": ["web", "networks", "software"],
    },
    {
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",
        "pool": "mdn",
        "fallback_title": "JavaScript modules",
        "proposed_tags": ["web", "software", "practices"],
    },
    {
        "url": "https://en.wikipedia.org/wiki/Transmission_Control_Protocol",
        "pool": "wikipedia",
        "fallback_title": "Transmission Control Protocol",
        "proposed_tags": ["networks", "systems"],
    },
    {
        "url": "https://en.wikipedia.org/wiki/Continuous_integration",
        "pool": "wikipedia",
        "fallback_title": "Continuous integration",
        "proposed_tags": ["practices", "software", "reliability"],
    },
    {
        "url": "https://en.wikipedia.org/wiki/Virtual_machine",
        "pool": "wikipedia",
        "fallback_title": "Virtual machine",
        "proposed_tags": ["systems", "software"],
    },
    {
        "url": "https://en.wikipedia.org/wiki/CAP_theorem",
        "pool": "wikipedia",
        "fallback_title": "CAP theorem",
        "proposed_tags": ["systems", "reliability", "networks"],
    },
    {
        "url": "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
        "pool": "mdn",
        "fallback_title": "The WebSocket API",
        "proposed_tags": ["web", "networks", "software"],
    },
]

CONTROLLED_TAGS = frozenset(
    {
        "software",
        "systems",
        "web",
        "oss",
        "electronics",
        "networks",
        "reliability",
        "practices",
    }
)

KNOWN_POOL_LICENSES = {
    "wikipedia.org": "CC-BY-SA-4.0",
    "developer.mozilla.org": "CC-BY-SA-2.5+",
}
