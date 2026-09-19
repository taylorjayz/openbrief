---
id: ob-011
title: Kubernetes — desired state for containers
summary: |
  Kubernetes is an open platform for running containerized workloads with declarative configuration and automation. You describe the desired state; control loops continuously steer the cluster toward it—restarts, rollouts, scaling, and service discovery included.
  It is not a full PaaS: it won’t build your app, choose your database, or mandate logging. It gives building blocks—Pods, Services, Deployments—and leaves policy to you. Self-healing and bin-packing help production resilience when health checks and resources are set honestly.
  Mental model: stop thinking “run this script next,” start thinking “keep this many healthy replicas of this image.”
tags: [systems, reliability, oss]
source:
  title: Kubernetes Overview
  url: https://kubernetes.io/docs/concepts/overview/
  license: CC-BY-4.0
  attribution_text: "Summary based on Kubernetes documentation “Overview,” licensed under CC BY 4.0"
order: 11
---

Kubernetes is an open platform for running containerized workloads with declarative configuration and automation. You describe the desired state; control loops continuously steer the cluster toward it—restarts, rollouts, scaling, and service discovery included.

It is not a full PaaS: it won’t build your app, choose your database, or mandate logging. It gives building blocks—Pods, Services, Deployments—and leaves policy to you. Self-healing and bin-packing help production resilience when health checks and resources are set honestly.

Mental model: stop thinking “run this script next,” start thinking “keep this many healthy replicas of this image.”
