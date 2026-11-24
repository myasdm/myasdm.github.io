---
title: "Regional deployment starts with constraints."
titleZh: "跨区域部署，先从约束开始。"
date: "2026-11-22"
summary: "Gateway routing, ownership verification, and a one-week domestic cloud migration at MYA Cards."
summaryZh: "MYA Cards 的多区域网关、卡片确权与一周国内云迁移实践。"
tags: [Architecture, Field notes]
---
## Two versions, one product workflow

MYA Cards needed overseas and domestic releases. The workflow covered card display, ownership verification, exchange, and dispute arbitration.

## Implementation

1. Designed a Global API Gateway for nearby regional access and gradual traffic routing.
2. Used **database transactions + an idempotent queue** for two-stage ownership verification.
3. Moved the domestic version to Alibaba Cloud, completing dual-cloud operation in one week.

## Delivery and operating results

- Web/H5 launched in 3 months; iOS/Android MVP delivered in the following 2 months.
- System availability: **99.95%**.
- Ownership verification: **under 200 ms**.
- Complaint rate: **below 0.1%**.

## Questions for the next migration

- Which business state must remain authoritative?
- How will duplicate requests be handled?
- Which traffic can be moved incrementally?
- What evidence permits the next migration step?

A regional architecture is not just a diagram of clouds. It is a set of choices about routing, state, and delivery risk.

<!-- zh -->
## 双版本，共同的产品闭环

MYA Cards 需要海外与国内双版本发布。业务闭环包括卡牌展示、确权、交换和争议仲裁。

## 亲自实施

1. 自研 Global API Gateway，支持多区域就近接入与灰度分流。
2. 采用**数据库事务 + 幂等队列**，实现二级确权。
3. 将国内版移植到阿里云，一周完成双云在线。

## 交付与运行结果

- 3 个月上线 Web/H5，再用 2 个月交付 iOS/Android MVP。
- 系统可用性：**99.95%**。
- 确权耗时：**低于 200 ms**。
- 客诉率：**低于 0.1%**。

## 下一次迁移之前的问题

- 哪份业务状态必须保持权威？
- 重复请求如何处理？
- 哪部分流量可以逐步迁移？
- 用什么证据允许进入下一步？

跨区域架构不只是云节点的示意图，更是一组关于路由、状态与交付风险的选择。
