# Building 100K QPS Systems: Patterns That Work

## The Reality of High-Concurrency Systems

When you're handling 100,000+ requests per second, every millisecond counts. This post shares battle-tested patterns from building IoT platforms and ad-serving infrastructure.

## Core Patterns

### 1. Connection Pooling Done Right

```java
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
```

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
