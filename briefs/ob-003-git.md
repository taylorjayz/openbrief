---
id: ob-003
title: Git tracks snapshots, not just diffs
summary: |
  Git is a distributed version-control system: every clone can hold a full history, and collaboration usually happens by sharing commits through remotes. Instead of thinking only in “file diffs,” Git stores snapshots of the project tree, linked into a graph of commits.
  Branching is cheap: a branch name is a movable pointer to a commit. Merging combines histories; rebasing replays commits for a linear story—both are tools, not moral laws. Staging lets you craft commits deliberately instead of dumping every dirty file.
  Engineering habit: small, reviewable commits with clear messages beat giant “WIP” blobs. Learn status, diff, log, and bisect early—they repay themselves the first time a regression appears.
tags: [software, oss, practices]
source:
  title: Git
  url: https://en.wikipedia.org/wiki/Git
  license: CC-BY-SA-4.0
  attribution_text: "Summary based on Wikipedia “Git,” licensed under CC BY-SA 4.0"
order: 3
---

Git is a distributed version-control system: every clone can hold a full history, and collaboration usually happens by sharing commits through remotes. Instead of thinking only in “file diffs,” Git stores snapshots of the project tree, linked into a graph of commits.

Branching is cheap: a branch name is a movable pointer to a commit. Merging combines histories; rebasing replays commits for a linear story—both are tools, not moral laws. Staging lets you craft commits deliberately instead of dumping every dirty file.

Engineering habit: small, reviewable commits with clear messages beat giant “WIP” blobs. Learn status, diff, log, and bisect early—they repay themselves the first time a regression appears.
