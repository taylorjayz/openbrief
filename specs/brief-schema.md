# OpenBrief — Brief / Feed Schema (v0.1)

```json
{
  "id": "ob-001",
  "title": "Short teaching title",
  "summary": "80–180 word summary in our own words…",
  "tags": ["software", "oss"],
  "source": {
    "title": "Original page title",
    "url": "https://…",
    "license": "CC-BY-SA-4.0",
    "attribution_text": "Adapted summary based on … (CC BY-SA 4.0)"
  },
  "order": 1
}
```

Markdown briefs in `/briefs/` use YAML frontmatter with the same fields + `summary` as body.
