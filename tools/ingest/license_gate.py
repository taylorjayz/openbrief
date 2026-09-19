"""License gate — fail closed except known MDN/Wikipedia pools or clear SPDX."""

from __future__ import annotations

import re
from urllib.parse import urlparse

from pools import KNOWN_POOL_LICENSES

# SPDX-ish tokens we accept when clearly present on a page (stub heuristic).
SPDX_PATTERN = re.compile(
    r"\b("
    r"CC0(?:-1\.0)?|"
    r"CC-BY(?:-SA)?-\d(?:\.\d)?|"
    r"CC\s*BY(?:-SA)?(?:\s*\d(?:\.\d)?)?|"
    r"MIT|"
    r"Apache-2\.0|"
    r"BSD-[23]-Clause|"
    r"MPL-2\.0|"
    r"Unlicense"
    r")\b",
    re.IGNORECASE,
)


def _host(url: str) -> str:
    return urlparse(url).netloc.lower().removeprefix("www.")


def known_pool_license(url: str) -> str | None:
    host = _host(url)
    for domain, license_id in KNOWN_POOL_LICENSES.items():
        if host == domain or host.endswith("." + domain):
            return license_id
    return None


def gate_url(url: str, page_text: str | None = None) -> tuple[bool, str, str]:
    """Return (license_ok, license_string_or_empty, notes).

    Known wikipedia.org / developer.mozilla.org → accept CC-BY-SA pool license.
    Others → fail closed unless SPDX clearly present in page_text.
    """
    pool_lic = known_pool_license(url)
    if pool_lic:
        return True, pool_lic, f"known pool policy for {_host(url)}"

    if page_text:
        m = SPDX_PATTERN.search(page_text)
        if m:
            raw = m.group(1).strip()
            # Normalize a few common variants
            norm = raw.upper().replace(" ", "-")
            if norm.startswith("CC-BY") or norm.startswith("CCBY"):
                license_id = raw if "CC-" in raw.upper() else "CC-BY-SA-4.0"
            else:
                license_id = raw
            return True, license_id, "SPDX-like token found in page text"

    return False, "", "reject bad_license: domain not in approved pools and no clear SPDX"
