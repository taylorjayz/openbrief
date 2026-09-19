---
id: ob-004
title: DNS turns names into where to connect
summary: |
  The Domain Name System (DNS) maps human-friendly names like example.com to the records systems need—most famously IP addresses (A/AAAA), but also mail exchangers (MX), service locators (SRV), and text policies (TXT).
  Resolution is hierarchical and usually recursive: your stub resolver asks a recursive resolver, which walks from root hints toward the authoritative name servers for that zone. Caching speeds the internet up and also explains “it works for me” when TTLs differ.
  When a service is “down,” check DNS first: wrong record, expired cache, or a broken delegation can look identical to an application outage. Tools like dig make the conversation visible.
tags: [networks, systems, web]
source:
  title: Domain Name System
  url: https://en.wikipedia.org/wiki/Domain_Name_System
  license: CC-BY-SA-4.0
  attribution_text: "Summary based on Wikipedia “Domain Name System,” licensed under CC BY-SA 4.0"
order: 4
---

The Domain Name System (DNS) maps human-friendly names like example.com to the records systems need—most famously IP addresses (A/AAAA), but also mail exchangers (MX), service locators (SRV), and text policies (TXT).

Resolution is hierarchical and usually recursive: your stub resolver asks a recursive resolver, which walks from root hints toward the authoritative name servers for that zone. Caching speeds the internet up and also explains “it works for me” when TTLs differ.

When a service is “down,” check DNS first: wrong record, expired cache, or a broken delegation can look identical to an application outage. Tools like dig make the conversation visible.
