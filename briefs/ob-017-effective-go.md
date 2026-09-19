---
id: ob-017
title: Effective Go — clarity over cleverness
summary: |
  Effective Go collects idioms for writing clear Go: formatting with gofmt, short names in small scopes, meaningful package names, and error handling that checks and returns rather than hiding failures.
  
  Goroutines and channels are powerful concurrency tools, but the doc stresses simplicity—don’t reach for clever concurrency when a straight loop will do. Interfaces are satisfied implicitly; keep them small.
  
  Takeaway: readable Go is intentional Go. Let tools format; spend brainpower on names, errors, and APIs. When a function can fail, make the error obvious at the call site instead of panicking by default.
tags: [software, practices, oss]
source:
  title: Effective Go
  url: https://go.dev/doc/effective_go
  license: CC-BY-4.0
  attribution_text: "Summary based on “Effective Go” (go.dev), licensed under CC BY 4.0"
order: 17
---
Effective Go collects idioms for writing clear Go: formatting with gofmt, short names in small scopes, meaningful package names, and error handling that checks and returns rather than hiding failures.

Goroutines and channels are powerful concurrency tools, but the doc stresses simplicity—don’t reach for clever concurrency when a straight loop will do. Interfaces are satisfied implicitly; keep them small.

Takeaway: readable Go is intentional Go. Let tools format; spend brainpower on names, errors, and APIs. When a function can fail, make the error obvious at the call site instead of panicking by default.
