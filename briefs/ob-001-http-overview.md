---
id: ob-001
title: HTTP is request and response
summary: |
  HTTP is how browsers and apps ask servers for pages, images, APIs, and more. It is a client–server protocol: your user-agent (usually a browser) starts the conversation; the server answers. Messages are discrete requests and responses, not a continuous stream.
  Under the hood HTTP rides a reliable transport (typically TCP, often wrapped in TLS). Proxies may cache, filter, or balance load along the way. HTTP itself is extensible via headers and is “stateless” at the core—cookies and similar mechanisms add session context when sites need it.
  Practical takeaway: when something “breaks on the web,” separate DNS, TLS, HTTP status, and application logic. Reading a request line, status code, and a few headers already unlocks a huge amount of debugging power.
tags: [web, software, networks]
source:
  title: Overview of HTTP
  url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview
  license: CC-BY-SA-2.5+
  attribution_text: "Summary based on “Overview of HTTP” by Mozilla Contributors (MDN), licensed under CC-BY-SA 2.5+"
order: 1
---

HTTP is how browsers and apps ask servers for pages, images, APIs, and more. It is a client–server protocol: your user-agent (usually a browser) starts the conversation; the server answers. Messages are discrete requests and responses, not a continuous stream.

Under the hood HTTP rides a reliable transport (typically TCP, often wrapped in TLS). Proxies may cache, filter, or balance load along the way. HTTP itself is extensible via headers and is “stateless” at the core—cookies and similar mechanisms add session context when sites need it.

Practical takeaway: when something “breaks on the web,” separate DNS, TLS, HTTP status, and application logic. Reading a request line, status code, and a few headers already unlocks a huge amount of debugging power.
