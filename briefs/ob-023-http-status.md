---
id: ob-023
title: HTTP status codes — what the number is trying to say
summary: |
  HTTP status codes are three-digit signals on every response: 1xx informational, 2xx success, 3xx redirect, 4xx client error, 5xx server error. Reading them separates “URL wrong,” “auth failed,” “not found,” and “server melted” faster than staring at a blank page.
  Common ones you’ll live with: 200 OK, 201 Created, 301/302 redirects, 400 Bad Request, 401/403 authz, 404 Not Found, 429 rate limit, 500/502/503 server-side trouble. APIs should pick codes deliberately so clients can automate retries and user messaging.
  Debug tip: log method, path, and status together—status alone without context lies.
tags: [web, networks, software]
source:
  title: HTTP response status codes
  url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
  license: CC-BY-SA-2.5+
  attribution_text: "Summary based on “HTTP response status codes” by Mozilla Contributors (MDN), licensed under CC-BY-SA 2.5+"
order: 23
---

HTTP status codes are three-digit signals on every response: 1xx informational, 2xx success, 3xx redirect, 4xx client error, 5xx server error. Reading them separates “URL wrong,” “auth failed,” “not found,” and “server melted” faster than staring at a blank page.

Common ones you’ll live with: 200 OK, 201 Created, 301/302 redirects, 400 Bad Request, 401/403 authz, 404 Not Found, 429 rate limit, 500/502/503 server-side trouble. APIs should pick codes deliberately so clients can automate retries and user messaging.

Debug tip: log method, path, and status together—status alone without context lies.
