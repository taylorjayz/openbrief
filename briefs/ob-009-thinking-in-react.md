---
id: ob-009
title: Thinking in React — components, then state
summary: |
  React nudges you to build UIs by carving a mockup into a component hierarchy that mirrors your data. Start static: props flow down, no interactivity yet. Then identify the minimal state you actually need—not everything you can compute.
  Put state in the closest common parent of the components that read it, and pass updater functions down so children can request changes. That one-way data flow is more typing than two-way binding, but it makes bugs easier to find.
  Habit: dry state, compute derived lists, and don’t store what you can recalculate from props or existing state.
tags: [software, web, practices]
source:
  title: Thinking in React
  url: https://react.dev/learn/thinking-in-react
  license: MIT
  attribution_text: "Summary based on “Thinking in React” (react.dev), licensed under MIT"
order: 9
---

React nudges you to build UIs by carving a mockup into a component hierarchy that mirrors your data. Start static: props flow down, no interactivity yet. Then identify the minimal state you actually need—not everything you can compute.

Put state in the closest common parent of the components that read it, and pass updater functions down so children can request changes. That one-way data flow is more typing than two-way binding, but it makes bugs easier to find.

Habit: dry state, compute derived lists, and don’t store what you can recalculate from props or existing state.
