---
id: ob-018
title: Django views — request in, HTTP response out
summary: |
  In Django, a view is a Python function (or class) that receives a web request and returns a response. URLconf routes map paths to views; templates and forms help build HTML, while JsonResponse serves APIs.
  Keep views thin: validate input, call model/query logic, return status and body. Fat views become hard to test—push business rules into models or services.
  Pattern: one clear job per view, explicit status codes, and reuse generic class-based views when they fit without fighting them.
tags: [web, software, practices]
source:
  title: Writing views — Django documentation
  url: https://docs.djangoproject.com/en/stable/topics/http/views/
  license: BSD-3-Clause
  attribution_text: "Summary based on Django documentation “Writing views,” licensed under BSD-3-Clause"
order: 18
---

In Django, a view is a Python function (or class) that receives a web request and returns a response. URLconf routes map paths to views; templates and forms help build HTML, while JsonResponse serves APIs.

Keep views thin: validate input, call model/query logic, return status and body. Fat views become hard to test—push business rules into models or services.

Pattern: one clear job per view, explicit status codes, and reuse generic class-based views when they fit without fighting them.
