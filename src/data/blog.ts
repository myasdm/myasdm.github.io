export interface BlogPost {
  id: string;
  title: string;
  titleZh: string;
  date: string;
  summary: string;
  summaryZh: string;
  tags: string[];
  filePath: string;
}

// Blog posts metadata - content is loaded from .md files
export const blogPosts: BlogPost[] = [
  {
    id: 'cloud-native-migration-2024',
    title: 'Cloud-Native Migration: Lessons from the Trenches',
    titleZh: '云原生迁移：来自一线的经验教训',
    date: '2024-12-15',
    summary: 'Key insights from migrating legacy monoliths to Kubernetes, including common pitfalls and best practices.',
    summaryZh: '从遗留单体应用迁移到Kubernetes的关键洞察，包括常见陷阱和最佳实践。',
    tags: ['Kubernetes', 'DevOps', 'Architecture'],
    filePath: '/blog/cloud-native-migration-2024.md',
  },
  {
    id: 'high-concurrency-patterns',
    title: 'Building 100K QPS Systems: Patterns That Work',
    titleZh: '构建10万QPS系统：行之有效的模式',
    date: '2024-11-20',
    summary: 'Practical patterns for building high-concurrency systems, drawn from real-world IoT and ad-tech experience.',
    summaryZh: '构建高并发系统的实用模式，源自物联网和广告技术的实战经验。',
    tags: ['High Concurrency', 'System Design', 'Performance'],
    filePath: '/blog/high-concurrency-patterns.md',
  },
  {
    id: 'gis-3d-visualization',
    title: 'GIS & 3D Visualization in Smart City Platforms',
    titleZh: 'GIS与智慧城市平台中的3D可视化',
    date: '2024-10-05',
    summary: 'How we built city-scale 3D visualization serving 40+ government bureaus with real-time data integration.',
    summaryZh: '我们如何构建服务40+政府部门的城市级3D可视化平台及实时数据集成。',
    tags: ['GIS', '3D Visualization', 'Government'],
    filePath: '/blog/gis-3d-visualization.md',
  },
  {
    id: 'iot-message-ordering',
    title: 'Solving Message Ordering in Million-Device IoT Systems',
    titleZh: '百万设备物联网系统中的消息顺序问题解决方案',
    date: '2024-08-22',
    summary: 'Deep dive into maintaining message order at scale while achieving 10x throughput improvement.',
    summaryZh: '深入探讨如何在规模化场景下保持消息顺序，同时实现10倍吞吐量提升。',
    tags: ['IoT', 'MQTT', 'Distributed Systems'],
    filePath: '/blog/iot-message-ordering.md',
  },
  {
    id: 'microservices-lessons',
    title: 'Microservices: When to Split, When to Stay',
    titleZh: '微服务：何时拆分，何时保留',
    date: '2024-07-10',
    summary: 'Pragmatic guidance on microservices adoption based on team size, domain complexity, and operational maturity.',
    summaryZh: '基于团队规模、领域复杂性和运维成熟度的微服务采用务实指南。',
    tags: ['Microservices', 'Architecture', 'Team Building'],
    filePath: '/blog/microservices-lessons.md',
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

// Helper function to load blog content from file
export const loadBlogContent = async (filePath: string): Promise<string> => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load blog content: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error('Error loading blog content:', error);
    return '# Error Loading Content\n\nUnable to load this blog post. Please try again later.';
  }
};
