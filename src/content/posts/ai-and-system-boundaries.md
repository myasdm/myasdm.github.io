---
title: "More code is not a better system."
titleZh: "更多代码，不等于更好的系统。"
date: "2026-11-24"
summary: "An architecture checklist for a world where generating code is easier than governing it."
summaryZh: "当生成代码变得容易，如何让系统依然可理解、可验证、可演进。"
tags: [Technical governance, AI]
---
## The unit of judgment is the system

Code generation can accelerate implementation. It does not, by itself, establish who owns data, what may fail, or how a change can be reversed.

The useful question is not **“How much code can we produce?”** It is **“Which obligations must still hold after this change?”**

## Before accepting a change

- **Ownership:** Which component is allowed to change this data?
- **Consistency:** What must never become contradictory?
- **Failure:** What happens when a dependency is unavailable?
- **Evidence:** Which test or operating metric proves the change works?
- **Recovery:** Can it be rolled back without losing business state?

| Decision | Evidence to request |
| --- | --- |
| Add a service | A clear boundary and an independent operational need |
| Introduce a queue | Ordering, retry, and idempotency rules |
| Change infrastructure | A migration plan and a tested recovery path |

## A smaller, verifiable step

Treat generated code as a proposal to review, not an architectural decision already made. Keep changes small enough to understand, and validate them against business constraints.

Speed matters. **A system that remains understandable matters too.**

<!-- zh -->
## 判断的单位，是系统

代码生成可以加快实现，但它不会自动明确数据归属、故障边界，也不会保证一次变更可以安全撤回。

更有价值的问题不是**能写出多少代码**，而是**这次变更之后，哪些约束仍然必须成立**

## 接受变更之前

- **归属：** 哪个模块有权修改这份数据？
- **一致性：** 哪些状态绝不能互相矛盾？
- **故障：** 当依赖不可用时，业务会怎样？
- **证据：** 哪个测试或运行指标能证明变更有效？
- **恢复：** 能否在不丢失业务状态的情况下回退？

| 决策 | 应当要求的证据 |
| --- | --- |
| 新增服务 | 清晰的边界与独立运行的必要性 |
| 引入消息队列 | 顺序、重试与幂等规则 |
| 更换基础设施 | 迁移计划与经过验证的恢复路径 |

## 更小、可验证的一步

把生成的代码视为待评审的提案，而不是已经完成的架构决策。把变更控制在可以理解的范围内，并用业务约束验证它。

速度很重要，**系统持续可理解，同样重要。**
