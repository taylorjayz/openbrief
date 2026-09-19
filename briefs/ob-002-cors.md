---
id: ob-002
title: CORS — why browsers block cross-origin fetches
summary: |
  Browsers enforce a same-origin policy so a page from one site cannot freely read another site’s responses. That protects users, but it also blocks legitimate frontends that talk to APIs on another host. CORS (Cross-Origin Resource Sharing) is the server’s way to opt in.
  With CORS, a server advertises which origins, methods, and headers are allowed—often via response headers such as Access-Control-Allow-Origin. Some requests trigger a preflight OPTIONS check before the real call. Misconfigured CORS shows up as a browser error even when curl works fine—because curl is not enforcing the browser’s rules.
  For engineers: treat CORS as a browser security feature you configure deliberately, not a bug to “turn off” with wildcards in production without understanding credentialed requests.
tags: [web, software, practices]
source:
  title: Cross-Origin Resource Sharing (CORS)
  url: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
  license: CC-BY-SA-2.5+
  attribution_text: "Summary based on “Cross-Origin Resource Sharing (CORS)” by Mozilla Contributors (MDN), licensed under CC-BY-SA 2.5+"
order: 2
---

Browsers enforce a same-origin policy so a page from one site cannot freely read another site’s responses. That protects users, but it also blocks legitimate frontends that talk to APIs on another host. CORS (Cross-Origin Resource Sharing) is the server’s way to opt in.

With CORS, a server advertises which origins, methods, and headers are allowed—often via response headers such as Access-Control-Allow-Origin. Some requests trigger a preflight OPTIONS check before the real call. Misconfigured CORS shows up as a browser error even when curl works fine—because curl is not enforcing the browser’s rules.

For engineers: treat CORS as a browser security feature you configure deliberately, not a bug to “turn off” with wildcards in production without understanding credentialed requests.
