---
id: ob-005
title: Load balancing spreads work across many servers
summary: |
  Load balancing distributes incoming requests or network traffic across a pool of backends so no single machine becomes the bottleneck—and so you can take nodes out for maintenance without a full outage.
  Strategies range from simple round-robin to least-connections, hashing (sticky sessions), and health-checked pools that stop sending traffic to dead instances. Balancers can sit at L4 (IP/port) or L7 (HTTP path, headers, cookies), with different tradeoffs for visibility and performance.
  Reliability angle: a balancer is itself a critical component—pair it with health checks, capacity planning, and clear failure modes. “We added a second server” only helps if traffic actually reaches it.
tags: [systems, reliability, networks]
source:
  title: Load balancing (computing)
  url: https://en.wikipedia.org/wiki/Load_balancing_(computing)
  license: CC-BY-SA-4.0
  attribution_text: "Summary based on Wikipedia “Load balancing (computing),” licensed under CC BY-SA 4.0"
order: 5
---

Load balancing distributes incoming requests or network traffic across a pool of backends so no single machine becomes the bottleneck—and so you can take nodes out for maintenance without a full outage.

Strategies range from simple round-robin to least-connections, hashing (sticky sessions), and health-checked pools that stop sending traffic to dead instances. Balancers can sit at L4 (IP/port) or L7 (HTTP path, headers, cookies), with different tradeoffs for visibility and performance.

Reliability angle: a balancer is itself a critical component—pair it with health checks, capacity planning, and clear failure modes. “We added a second server” only helps if traffic actually reaches it.
