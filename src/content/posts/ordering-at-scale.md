---
title: "Throughput and order are different problems."
titleZh: "吞吐与顺序，是两个不同的问题。"
date: "2026-11-23"
summary: "A field note from a gas IoT platform connecting 2 million meters and 300,000 alarms."
summaryZh: "来自接入 200 万台燃气表、30 万台报警器的物联网平台实践。"
tags: [Distributed systems, Field notes]
---
## Context

The gas IoT platform connected **2 million meters and 300,000 alarms**. Increasing traffic capacity also required addressing disorder in upstream and downstream messages.

## What I implemented

- A self-developed **Netty + MQTT** long-connection gateway.
- Number-range sharding combined with **consistent hashing** to address message ordering.
- A gateway supporting 500,000 devices per node, with horizontal expansion to five nodes.

## Recorded outcomes

| Measure | Outcome |
| --- | --- |
| Peak throughput | 1,000 → 10,000 QPS |
| Message disorder | Below 0.01% |
| Connected gas meters | 2 million |
| Connected alarms | 300,000 |

The platform became the group's smart-kitchen foundation, allowing later devices to reuse the platform rather than repeat the investment.

## The decision to examine

Capacity and correctness need separate acceptance criteria. When introducing partitions, make the ordering scope explicit: which messages must stay together, and what happens when ownership moves?

The implementation details depend on the system. The requirement should be clear before the scaling decision.

<!-- zh -->
## 场景

燃气物联网平台接入了 **200 万台燃气表与 30 万台报警器**。在提升流量承载能力的同时，需要处理海量上下行消息乱序问题。

## 我亲自完成的工作

- 自研 **Netty + MQTT** 长连接网关。
- 采用**按号段分片与一致性 Hash** 解决消息乱序。
- 网关单节点支持 50 万设备，横向扩展至 5 节点。

## 简历记录的结果

| 指标 | 结果 |
| --- | --- |
| 峰值吞吐 | 1,000 → 10,000 QPS |
| 消息乱序率 | 低于 0.01% |
| 燃气表接入 | 200 万台 |
| 报警器接入 | 30 万台 |

平台成为集团智慧厨房战略底座，后续智能设备可以直接复用，避免重复投入。

## 值得审视的决策

容量与正确性需要不同的验收标准。引入分片时，应明确顺序的范围：哪些消息必须在一起，归属发生变化时又该如何处理？

实现细节因系统而异，但扩容之前，约束必须足够清楚。
