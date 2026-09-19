---
id: ob-014
title: JavaScript Promises — async without callback soup
summary: |
  A Promise represents a future value: pending, fulfilled, or rejected. then handles success paths; catch handles failures; finally runs cleanup. Chaining keeps asynchronous steps readable compared with deeply nested callbacks.
  async/await is syntactic sugar over Promises—errors surface as thrown exceptions inside async functions. Remember: forgetting to await (or return) a Promise is a common source of “it sometimes works” bugs.
  Use Promises for I/O and timers; keep CPU-heavy work off the main thread when UI jank matters.
tags: [web, software]
source:
  title: Promise - JavaScript | MDN
  url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
  license: CC-BY-SA-2.5+
  attribution_text: "Summary based on “Promise” by Mozilla Contributors (MDN), licensed under CC-BY-SA 2.5+"
order: 14
---

A Promise represents a future value: pending, fulfilled, or rejected. then handles success paths; catch handles failures; finally runs cleanup. Chaining keeps asynchronous steps readable compared with deeply nested callbacks.

async/await is syntactic sugar over Promises—errors surface as thrown exceptions inside async functions. Remember: forgetting to await (or return) a Promise is a common source of “it sometimes works” bugs.

Use Promises for I/O and timers; keep CPU-heavy work off the main thread when UI jank matters.
