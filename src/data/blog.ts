export interface BlogPost {
  id: string;
  title: string;
  titleZh: string;
  date: string;
  summary: string;
  summaryZh: string;
  tags: string[];
  content: string;
}

// Blog posts data - content is markdown format
export const blogPosts: BlogPost[] = [
  {
    id: 'cloud-native-migration-2024',
    title: 'Cloud-Native Migration: Lessons from the Trenches',
    titleZh: '云原生迁移：来自一线的经验教训',
    date: '2024-12-15',
    summary: 'Key insights from migrating legacy monoliths to Kubernetes, including common pitfalls and best practices.',
    summaryZh: '从遗留单体应用迁移到Kubernetes的关键洞察，包括常见陷阱和最佳实践。',
    tags: ['Kubernetes', 'DevOps', 'Architecture'],
    content: `# Cloud-Native Migration: Lessons from the Trenches

## Introduction

Migrating legacy applications to cloud-native infrastructure is one of the most challenging undertakings in modern software engineering. After leading multiple migration projects, I've compiled the key lessons that can make or break your journey.

## The Three Pillars of Successful Migration

### 1. Assessment First, Action Second

Before writing a single line of migration code, invest time in understanding:

- **Current architecture dependencies**: Map out every service, database, and external integration
- **Traffic patterns**: Understand peak loads and critical paths
- **Team capabilities**: Assess your team's Kubernetes and container expertise

\`\`\`yaml
# Example: Dependency mapping structure
services:
  user-service:
    dependencies:
      - postgres-primary
      - redis-cache
      - auth-service
    traffic_pattern: "high-read, low-write"
    criticality: "high"
\`\`\`

### 2. Strangler Fig Pattern

Don't try to migrate everything at once. The strangler fig pattern allows you to:

- Gradually route traffic to new services
- Maintain rollback capabilities
- Validate each component independently

### 3. Observability from Day One

Implement comprehensive monitoring before migration:

- Distributed tracing (Jaeger/Zipkin)
- Metrics collection (Prometheus)
- Log aggregation (ELK/Loki)

## Common Pitfalls to Avoid

1. **Underestimating stateful services**: Databases and message queues need special attention
2. **Ignoring network latency**: Microservices introduce network hops
3. **Skipping load testing**: Always validate under realistic conditions

## Conclusion

Cloud-native migration is a marathon, not a sprint. Take time to plan, execute incrementally, and always maintain rollback capabilities.

---

*Have questions about your migration journey? [Reach out](/contact) for a consultation.*
`,
  },
  {
    id: 'high-concurrency-patterns',
    title: 'Building 100K QPS Systems: Patterns That Work',
    titleZh: '构建10万QPS系统：行之有效的模式',
    date: '2024-11-20',
    summary: 'Practical patterns for building high-concurrency systems, drawn from real-world IoT and ad-tech experience.',
    summaryZh: '构建高并发系统的实用模式，源自物联网和广告技术的实战经验。',
    tags: ['High Concurrency', 'System Design', 'Performance'],
    content: `# Building 100K QPS Systems: Patterns That Work

## The Reality of High-Concurrency Systems

When you're handling 100,000+ requests per second, every millisecond counts. This post shares battle-tested patterns from building IoT platforms and ad-serving infrastructure.

## Core Patterns

### 1. Connection Pooling Done Right

\`\`\`java
// Netty-based connection pool configuration
EventLoopGroup bossGroup = new NioEventLoopGroup(1);
EventLoopGroup workerGroup = new NioEventLoopGroup(
    Runtime.getRuntime().availableProcessors() * 2
);

ServerBootstrap bootstrap = new ServerBootstrap()
    .group(bossGroup, workerGroup)
    .channel(NioServerSocketChannel.class)
    .option(ChannelOption.SO_BACKLOG, 1024)
    .childOption(ChannelOption.SO_KEEPALIVE, true)
    .childOption(ChannelOption.TCP_NODELAY, true);
\`\`\`

### 2. Sharding Strategies

For message ordering with high throughput:

- **Hash-based sharding**: Consistent hashing for even distribution
- **Range-based sharding**: When data has natural ordering
- **Hybrid approach**: Combine both for flexibility

### 3. Async Everything

Blocking I/O is your enemy. Embrace:

- Reactive programming (WebFlux, RxJava)
- Message queues for decoupling
- Event-driven architecture

## Monitoring at Scale

Key metrics to track:

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| P99 Latency | <50ms | >100ms |
| Error Rate | <0.01% | >0.1% |
| CPU Usage | <70% | >85% |
| Memory | <80% | >90% |

## The Human Factor

High-concurrency systems need:

- Runbooks for common issues
- On-call rotation with clear escalation
- Regular chaos engineering exercises

---

*Building something that needs to scale? Let's [discuss architecture](/contact).*
`,
  },
  {
    id: 'gis-3d-visualization',
    title: 'GIS & 3D Visualization in Smart City Platforms',
    titleZh: 'GIS与智慧城市平台中的3D可视化',
    date: '2024-10-05',
    summary: 'How we built city-scale 3D visualization serving 40+ government bureaus with real-time data integration.',
    summaryZh: '我们如何构建服务40+政府部门的城市级3D可视化平台及实时数据集成。',
    tags: ['GIS', '3D Visualization', 'Government'],
    content: `# GIS & 3D Visualization in Smart City Platforms

## The Challenge

Building a city-scale GIS platform that serves 40+ government bureaus requires balancing:

- Massive data volumes (TB-scale imagery)
- Real-time updates from IoT sensors
- Complex access control requirements
- Performance across diverse client devices

## Architecture Overview

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  Web 3D  │  │  Mobile  │  │  Desktop │              │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘              │
└───────┼─────────────┼─────────────┼─────────────────────┘
        │             │             │
┌───────▼─────────────▼─────────────▼─────────────────────┐
│                 API Gateway (Kong)                       │
└───────┬─────────────┬─────────────┬─────────────────────┘
        │             │             │
┌───────▼───┐  ┌──────▼────┐  ┌─────▼─────┐
│ Tile Srv  │  │ Data API  │  │ Auth Srv  │
└───────┬───┘  └──────┬────┘  └───────────┘
        │             │
┌───────▼─────────────▼───────────────────────────────────┐
│              Data Layer (PostGIS + MinIO)                │
└─────────────────────────────────────────────────────────┘
\`\`\`

## Key Technical Decisions

### 1. 3D Tile Format Selection

We chose **3D Tiles** (OGC standard) for:

- Hierarchical LOD (Level of Detail)
- Streaming large models
- Wide tool support

### 2. Image Processing Pipeline

Original processing: **18 hours**
Optimized pipeline: **2 hours** (9x improvement)

Optimizations:
- Parallel processing with GPU acceleration
- Tile caching at multiple resolutions
- Progressive loading for large imagery

### 3. Real-time Data Integration

\`\`\`typescript
// WebSocket-based sensor data integration
const sensorStream = new WebSocket('wss://api/sensors');

sensorStream.onmessage = (event) => {
  const data = JSON.parse(event.data);
  updateMapLayer(data.layerId, data.features);
  refreshVisualization();
};
\`\`\`

## Lessons Learned

1. **Start with data governance**: Clear ownership prevents chaos
2. **Build for offline**: Government networks can be unreliable
3. **Security is paramount**: Multi-level access control is complex but essential

---

*Interested in GIS architecture? [Let's connect](/contact).*
`,
  },
  {
    id: 'iot-message-ordering',
    title: 'Solving Message Ordering in Million-Device IoT Systems',
    titleZh: '百万设备物联网系统中的消息顺序问题解决方案',
    date: '2024-08-22',
    summary: 'Deep dive into maintaining message order at scale while achieving 10x throughput improvement.',
    summaryZh: '深入探讨如何在规模化场景下保持消息顺序，同时实现10倍吞吐量提升。',
    tags: ['IoT', 'MQTT', 'Distributed Systems'],
    content: `# Solving Message Ordering in Million-Device IoT Systems

## The Problem

When managing 2M+ gas meters, message ordering becomes critical:

- Alarm sequences must be processed in order
- Meter readings need temporal consistency
- Duplicate detection requires ordered streams

## Why Traditional Approaches Fail

### Single Queue Bottleneck

\`\`\`
Device A ─┐
Device B ─┼─→ [Single Queue] → [Processor]  ❌ 1K QPS max
Device C ─┘
\`\`\`

### Naive Partitioning

Random partitioning breaks ordering:

\`\`\`
Device A ─→ [Queue 1] → [Processor 1]
         ↘ [Queue 2] → [Processor 2]  ❌ Out of order!
\`\`\`

## Our Solution: Consistent Sharding

### Key Insight

Messages from the same device must always go to the same partition.

\`\`\`java
// Consistent hashing for device-to-partition mapping
public int getPartition(String deviceId, int partitionCount) {
    int hash = MurmurHash3.hash32(deviceId.getBytes());
    return Math.abs(hash % partitionCount);
}
\`\`\`

### Architecture

\`\`\`
Device A ─→ Hash(A) mod N ─→ [Queue 1] → [Processor 1]
Device B ─→ Hash(B) mod N ─→ [Queue 2] → [Processor 2]
Device C ─→ Hash(C) mod N ─→ [Queue 1] → [Processor 1]
\`\`\`

## Results

| Metric | Before | After |
|--------|--------|-------|
| Throughput | 1K QPS | 10K QPS |
| Message Disorder Rate | 2.3% | <0.01% |
| P99 Latency | 500ms | 50ms |

## Implementation Tips

1. **Choose partition count wisely**: 2x expected processor count
2. **Handle rebalancing**: Use sticky assignments
3. **Monitor hot partitions**: Some devices are chattier

---

*Need help with IoT architecture? [Get in touch](/contact).*
`,
  },
  {
    id: 'microservices-lessons',
    title: 'Microservices: When to Split, When to Stay',
    titleZh: '微服务：何时拆分，何时保留',
    date: '2024-07-10',
    summary: 'Pragmatic guidance on microservices adoption based on team size, domain complexity, and operational maturity.',
    summaryZh: '基于团队规模、领域复杂性和运维成熟度的微服务采用务实指南。',
    tags: ['Microservices', 'Architecture', 'Team Building'],
    content: `# Microservices: When to Split, When to Stay

## The Microservices Trap

Many teams rush into microservices without considering:

- Operational complexity
- Network reliability requirements
- Team structure alignment

## Decision Framework

### When to Consider Microservices

✅ **Good candidates:**
- Independent scaling requirements
- Different release cadences
- Distinct team ownership
- Technology diversity needs

### When to Stay Monolithic

❌ **Stay together when:**
- Team < 10 engineers
- Shared data models
- Tight coupling between domains
- Limited DevOps maturity

## The Pragmatic Path

### Step 1: Modular Monolith First

\`\`\`
┌─────────────────────────────────────┐
│            Monolith                  │
│  ┌─────────┐ ┌─────────┐ ┌────────┐ │
│  │ Orders  │ │ Users   │ │ Inv.   │ │
│  │ Module  │ │ Module  │ │ Module │ │
│  └────┬────┘ └────┬────┘ └───┬────┘ │
│       │           │          │      │
│  ┌────▼───────────▼──────────▼────┐ │
│  │        Shared Database         │ │
│  └────────────────────────────────┘ │
└─────────────────────────────────────┘
\`\`\`

### Step 2: Extract When Needed

Extract a service only when:

1. The module has 3+ engineers dedicated
2. It needs independent scaling
3. It has clear API boundaries
4. You have monitoring in place

## Real Example: E-commerce Platform

Started: Monolith with 5 engineers
After 2 years: 3 services, 15 engineers

Extracted:
1. **Payment Service** - Compliance requirements
2. **Search Service** - Different scaling pattern
3. **Notification Service** - Async processing

Kept together:
- Order processing
- Inventory management
- User management

## Conclusion

Microservices are a tool, not a goal. Choose the right architecture for your context.

---

*Evaluating your architecture? [Let's discuss](/contact).*
`,
  },
];

// Helper function to get posts sorted by date (newest first)
export const getSortedBlogPosts = (): BlogPost[] => {
  return [...blogPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

// Helper function to get a single post by ID
export const getBlogPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};
