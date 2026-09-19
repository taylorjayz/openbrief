"""Best-effort title fetch — optional network; never store full article body."""

from __future__ import annotations

import json
import re
import urllib.error
import urllib.parse
import urllib.request

USER_AGENT = "OpenBriefIngestStub/0.1 (+https://github.com/openbrief; henry-worker)"


def fetch_title(url: str, timeout: float = 8.0) -> str | None:
    """Return page title if network works; else None. Does not persist HTML."""
    host = urllib.parse.urlparse(url).netloc.lower()
    try:
        if "wikipedia.org" in host:
            return _wikipedia_title(url, timeout)
        if "developer.mozilla.org" in host:
            return _html_title(url, timeout)
        return _html_title(url, timeout)
    except Exception:
        return None


def _wikipedia_title(url: str, timeout: float) -> str | None:
    # https://en.wikipedia.org/wiki/Foo -> API
    path = urllib.parse.urlparse(url).path
    if "/wiki/" not in path:
        return _html_title(url, timeout)
    title = path.split("/wiki/", 1)[1]
    title = urllib.parse.unquote(title)
    api = (
        "https://en.wikipedia.org/w/api.php?"
        + urllib.parse.urlencode(
            {
                "action": "query",
                "format": "json",
                "titles": title.replace("_", " "),
                "prop": "info",
            }
        )
    )
    req = urllib.request.Request(api, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        data = json.loads(resp.read().decode("utf-8", errors="replace"))
    pages = (data.get("query") or {}).get("pages") or {}
    for page in pages.values():
        t = page.get("title")
        if t:
            return t
    return None


def _html_title(url: str, timeout: float) -> str | None:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        # Read a small prefix only — never store full article.
        chunk = resp.read(64_000).decode("utf-8", errors="replace")
    m = re.search(r"<title[^>]*>(.*?)</title>", chunk, re.IGNORECASE | re.DOTALL)
    if not m:
        return None
    raw = re.sub(r"\s+", " ", m.group(1)).strip()
    # Strip common MDN / wiki suffixes
    for sep in (" | MDN", " - MDN Web Docs", " - MDN", " - Wikipedia", " — Wikipedia", " | Wikipedia"):
        if sep in raw:
            raw = raw.split(sep)[0].strip()
    # MDN often: "Fetch API - Web APIs" / "HTTP response status codes - HTTP"
    if " - " in raw and any(
        raw.endswith(s)
        for s in (" - Web APIs", " - HTTP", " - JavaScript", " - CSS", " - Web", " - Learn web development")
    ):
        raw = raw.rsplit(" - ", 1)[0].strip()
    return raw or None
