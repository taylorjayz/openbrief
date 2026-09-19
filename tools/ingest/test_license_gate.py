#!/usr/bin/env python3
"""Unit-ish tests: non-approved domains never get license_ok true (fail closed)."""

from __future__ import annotations

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from license_gate import gate_url, known_pool_license


class LicenseGateTests(unittest.TestCase):
    def test_wikipedia_pool_ok(self):
        ok, lic, notes = gate_url("https://en.wikipedia.org/wiki/TCP")
        self.assertTrue(ok)
        self.assertEqual(lic, "CC-BY-SA-4.0")
        self.assertIn("known pool", notes)

    def test_mdn_pool_ok(self):
        ok, lic, notes = gate_url(
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"
        )
        self.assertTrue(ok)
        self.assertEqual(lic, "CC-BY-SA-2.5+")

    def test_fake_non_approved_domain_never_license_ok(self):
        """Assert a fake non-approved domain never gets license_ok true."""
        ok, lic, notes = gate_url("https://evil-news.example/paywalled-engineering")
        self.assertFalse(ok, "non-approved domain must fail closed")
        self.assertEqual(lic, "")
        self.assertIn("bad_license", notes)

    def test_random_blog_no_spdx_fails(self):
        ok, _, notes = gate_url("https://all-rights-reserved.blog/post", page_text="hello world")
        self.assertFalse(ok)
        self.assertIn("bad_license", notes)

    def test_unknown_domain_with_clear_spdx_passes(self):
        ok, lic, notes = gate_url(
            "https://docs.example-foss.org/guide",
            page_text="This documentation is licensed under Apache-2.0",
        )
        self.assertTrue(ok)
        self.assertIn("Apache-2.0", lic)

    def test_known_pool_helper(self):
        self.assertIsNotNone(known_pool_license("https://en.wikipedia.org/wiki/X"))
        self.assertIsNone(known_pool_license("https://not-approved.example/x"))


if __name__ == "__main__":
    unittest.main()
