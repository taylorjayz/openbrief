---
id: ob-019
title: REST — resources, verbs, and hypermedia ideas
summary: |
  Representational State Transfer (REST) is an architectural style for networked applications, popularized for HTTP APIs. Resources are identified by URIs; representations (JSON, HTML) carry state; uniform methods (GET, POST, PUT, DELETE) express intent.
  
  Good REST practice favors stateless servers, cacheable responses, and clear status codes. Many “REST APIs” are really HTTP+JSON without hypermedia—still useful, but know which constraints you’re actually keeping.
  
  Design tip: make safe methods safe, and don’t overload GET with side effects. Document error bodies the same way you document success—clients need both.
tags: [web, software, practices]
source:
  title: REST
  url: https://en.wikipedia.org/wiki/REST
  license: CC-BY-SA-4.0
  attribution_text: "Summary based on Wikipedia “REST,” licensed under CC BY-SA 4.0"
order: 19
---
Representational State Transfer (REST) is an architectural style for networked applications, popularized for HTTP APIs. Resources are identified by URIs; representations (JSON, HTML) carry state; uniform methods (GET, POST, PUT, DELETE) express intent.

Good REST practice favors stateless servers, cacheable responses, and clear status codes. Many “REST APIs” are really HTTP+JSON without hypermedia—still useful, but know which constraints you’re actually keeping.

Design tip: make safe methods safe, and don’t overload GET with side effects. Document error bodies the same way you document success—clients need both.
