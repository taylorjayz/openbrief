---
id: ob-024
title: JavaScript modules — import what you need
summary: |
  ES modules split code into files that export values and import what they need. Static import/export makes dependencies explicit and lets bundlers and browsers analyze the graph ahead of time. Each module has its own scope—no accidental globals.
  In browsers you load modules with type="module"; in Node, "type": "module" or .mjs enables the same mental model. Circular dependencies and side-effectful imports still bite—prefer exporting pure functions when you can.
  Practice: one clear responsibility per module, named exports for libraries, and default exports sparingly.
tags: [web, software, practices]
source:
  title: JavaScript modules
  url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
  license: CC-BY-SA-2.5+
  attribution_text: "Summary based on “JavaScript modules” by Mozilla Contributors (MDN), licensed under CC-BY-SA 2.5+"
order: 24
---

ES modules split code into files that export values and import what they need. Static import/export makes dependencies explicit and lets bundlers and browsers analyze the graph ahead of time. Each module has its own scope—no accidental globals.

In browsers you load modules with type="module"; in Node, "type": "module" or .mjs enables the same mental model. Circular dependencies and side-effectful imports still bite—prefer exporting pure functions when you can.

Practice: one clear responsibility per module, named exports for libraries, and default exports sparingly.
