---
id: ob-022
title: Fetch API — modern requests in the browser
summary: |
  The Fetch API is the browser’s modern way to request network resources and read responses as Promises. You pass a URL (and optional method, headers, body, credentials mode); you get a Response you can parse as JSON, text, or a stream.
  Unlike older XMLHttpRequest, Fetch composes cleanly with async/await and service workers. Remember: a 404 still “succeeds” at the network layer—check response.ok or status before assuming JSON is usable. CORS still applies for cross-origin calls.
  Habit: centralize error handling around failed statuses and network throws, and don’t treat every resolved Promise as business success.
tags: [web, software]
source:
  title: Fetch API
  url: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
  license: CC-BY-SA-2.5+
  attribution_text: "Summary based on “Fetch API” by Mozilla Contributors (MDN), licensed under CC-BY-SA 2.5+"
order: 22
---

The Fetch API is the browser’s modern way to request network resources and read responses as Promises. You pass a URL (and optional method, headers, body, credentials mode); you get a Response you can parse as JSON, text, or a stream.

Unlike older XMLHttpRequest, Fetch composes cleanly with async/await and service workers. Remember: a 404 still “succeeds” at the network layer—check response.ok or status before assuming JSON is usable. CORS still applies for cross-origin calls.

Habit: centralize error handling around failed statuses and network throws, and don’t treat every resolved Promise as business success.
