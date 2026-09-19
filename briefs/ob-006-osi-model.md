---
id: ob-006
title: The OSI model — a map for talking about networks
summary: |
  The OSI model is a seven-layer teaching framework for how networked systems communicate: from physical signals up through links, routing, transport, and application concerns. Real stacks (like TCP/IP) do not match OSI one-for-one, but the vocabulary still helps teams debug.
  Lower layers move bits and frames; middle layers deliver packets and end-to-end reliability; upper layers speak application protocols. When latency spikes, asking “is this loss, congestion, DNS, TLS, or the app?” is layer-thinking in plain clothes.
  Use OSI as a shared language, not as dogma. The win is isolating whether a fault is cabling, switching, IP routing, TCP behavior, or something above.
tags: [networks, systems]
source:
  title: OSI model
  url: https://en.wikipedia.org/wiki/OSI_model
  license: CC-BY-SA-4.0
  attribution_text: "Summary based on Wikipedia “OSI model,” licensed under CC BY-SA 4.0"
order: 6
---

The OSI model is a seven-layer teaching framework for how networked systems communicate: from physical signals up through links, routing, transport, and application concerns. Real stacks (like TCP/IP) do not match OSI one-for-one, but the vocabulary still helps teams debug.

Lower layers move bits and frames; middle layers deliver packets and end-to-end reliability; upper layers speak application protocols. When latency spikes, asking “is this loss, congestion, DNS, TLS, or the app?” is layer-thinking in plain clothes.

Use OSI as a shared language, not as dogma. The win is isolating whether a fault is cabling, switching, IP routing, TCP behavior, or something above.
