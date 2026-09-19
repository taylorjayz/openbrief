---
id: ob-012
title: SQL SELECT — ask the table a precise question
summary: |
  A SELECT retrieves rows from tables: choose columns (or *), optionally filter with WHERE, sort with ORDER BY, and dedupe with DISTINCT. Expressions and AS aliases let you shape output without changing stored data.
  WHERE uses Boolean logic (AND/OR/NOT) so you return only rows that match—rainy San Francisco days, not the whole weather table. DISTINCT removes duplicate result rows; pair it with ORDER BY when you need a stable order.
  Engineering habit: * is fine for exploration; production queries usually name columns so schema changes don’t surprise callers.
tags: [software, practices]
source:
  title: Querying a Table (PostgreSQL tutorial)
  url: https://www.postgresql.org/docs/current/tutorial-select.html
  license: PostgreSQL
  attribution_text: "Summary based on PostgreSQL documentation “Querying a Table,” licensed under the PostgreSQL License"
order: 12
---

A SELECT retrieves rows from tables: choose columns (or *), optionally filter with WHERE, sort with ORDER BY, and dedupe with DISTINCT. Expressions and AS aliases let you shape output without changing stored data.

WHERE uses Boolean logic (AND/OR/NOT) so you return only rows that match—rainy San Francisco days, not the whole weather table. DISTINCT removes duplicate result rows; pair it with ORDER BY when you need a stable order.

Engineering habit: * is fine for exploration; production queries usually name columns so schema changes don’t surprise callers.
