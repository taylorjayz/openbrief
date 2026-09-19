---
id: ob-016
title: Rust ownership — memory safety without a GC pause
summary: |
  Rust’s ownership model gives each value a single owner. When the owner goes out of scope, the value is dropped. Borrowing lets other code read or mutate temporarily under compile-time rules that prevent data races and use-after-free in safe Rust.
  Move semantics transfer ownership; references (& and &mut) borrow. The borrow checker rejects programs that would alias mutable state unsafely—shifting many bugs from runtime to compile time.
  Learning tip: fight the checker less by sketching who owns data and how long borrows last before you type.
tags: [software, practices]
source:
  title: What is Ownership? — The Rust Programming Language
  url: https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html
  license: MIT OR Apache-2.0
  attribution_text: "Summary based on The Rust Programming Language “What is Ownership?,” dual-licensed MIT OR Apache-2.0"
order: 16
---

Rust’s ownership model gives each value a single owner. When the owner goes out of scope, the value is dropped. Borrowing lets other code read or mutate temporarily under compile-time rules that prevent data races and use-after-free in safe Rust.

Move semantics transfer ownership; references (& and &mut) borrow. The borrow checker rejects programs that would alias mutable state unsafely—shifting many bugs from runtime to compile time.

Learning tip: fight the checker less by sketching who owns data and how long borrows last before you type.
