---
id: ob-021
title: HTTP caching — faster repeats, careful freshness
summary: |
  HTTP caching stores responses so later requests can skip origin work. Cache-Control, ETag, and Last-Modified tell browsers and shared caches what is fresh, what must revalidate, and what is private versus public.
  Good caching cuts latency and load; bad caching serves stale personalized data. Vary headers matter when the same URL returns different bodies by language or encoding.
  Rule of thumb: cache public static assets aggressively; keep authenticated API responses private and short-lived unless you truly understand invalidation.
tags: [web, networks, reliability]
source:
  title: HTTP caching
  url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching
  license: CC-BY-SA-2.5+
  attribution_text: "Summary based on “HTTP caching” by Mozilla Contributors (MDN), licensed under CC-BY-SA 2.5+"
order: 21
---

HTTP caching stores responses so later requests can skip origin work. Cache-Control, ETag, and Last-Modified tell browsers and shared caches what is fresh, what must revalidate, and what is private versus public.

Good caching cuts latency and load; bad caching serves stale personalized data. Vary headers matter when the same URL returns different bodies by language or encoding.

Rule of thumb: cache public static assets aggressively; keep authenticated API responses private and short-lived unless you truly understand invalidation.
