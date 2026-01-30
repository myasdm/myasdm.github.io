# Solving Message Ordering in Million-Device IoT Systems

## The Problem

When managing 2M+ gas meters, message ordering becomes critical:

- Alarm sequences must be processed in order
- Meter readings need temporal consistency
- Duplicate detection requires ordered streams

## Why Traditional Approaches Fail

### Single Queue Bottleneck

```
Device A ─┐
Device B ─┼─→ [Single Queue] → [Processor]  ❌ 1K QPS max
Device C ─┘
```

### Naive Partitioning

Random partitioning breaks ordering:

```
Device A ─→ [Queue 1] → [Processor 1]
         ↘ [Queue 2] → [Processor 2]  ❌ Out of order!
```

## Our Solution: Consistent Sharding

### Key Insight

Messages from the same device must always go to the same partition.

```java
// Consistent hashing for device-to-partition mapping
public int getPartition(String deviceId, int partitionCount) {
    int hash = MurmurHash3.hash32(deviceId.getBytes());
    return Math.abs(hash % partitionCount);
}
```

### Architecture

```
Device A ─→ Hash(A) mod N ─→ [Queue 1] → [Processor 1]
Device B ─→ Hash(B) mod N ─→ [Queue 2] → [Processor 2]
Device C ─→ Hash(C) mod N ─→ [Queue 1] → [Processor 1]
```

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
