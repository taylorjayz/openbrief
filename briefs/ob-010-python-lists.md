---
id: ob-010
title: Python lists — stacks, queues, and comprehensions
summary: |
  Python lists are mutable sequences with rich methods: append, pop, sort, and more. They make a natural stack (append/pop at the end). As a queue they work poorly—prefer collections.deque for fast pops from the left.
  List comprehensions build new lists from iterables with optional filters—concise and often clearer than a manual loop that mutates. Nested comprehensions can transpose matrices, though zip is usually clearer for that case.
  Practice tip: mutating methods return None on purpose; chain by writing new expressions, not by expecting fluent returns.
tags: [software, practices]
source:
  title: Data Structures — Python 3 tutorial
  url: https://docs.python.org/3/tutorial/datastructures.html
  license: PSF-2.0
  attribution_text: "Summary based on Python 3 tutorial “Data Structures,” licensed under PSF License Version 2"
order: 10
---

Python lists are mutable sequences with rich methods: append, pop, sort, and more. They make a natural stack (append/pop at the end). As a queue they work poorly—prefer collections.deque for fast pops from the left.

List comprehensions build new lists from iterables with optional filters—concise and often clearer than a manual loop that mutates. Nested comprehensions can transpose matrices, though zip is usually clearer for that case.

Practice tip: mutating methods return None on purpose; chain by writing new expressions, not by expecting fluent returns.
