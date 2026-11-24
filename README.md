# Damon Song · Personal website

编辑出版物风格的双语个人网站。内容与页面分离，适合 GitHub Pages 静态发布。

## 发布一篇文章

在 GitHub 打开 `src/content/posts/`，选择 **Add file → Create new file**，例如 `my-next-note.md`。保存并提交后，网站会自动收录，无需登记标题索引或修改页面。

```md
---
title: "An architecture decision"
titleZh: "一次架构决策"
date: "2026-11-24"
summary: "A short introduction."
summaryZh: "一行文章摘要。"
tags: [Architecture, Field notes]
draft: false
---
## The context

English article body. Supports **bold**, lists, code blocks, tables, and links.

<!-- zh -->
## 场景

中文正文。省略此分隔符与中文正文时，中文界面会显示原文。
```

- `title` 与引号包围的 `date: "YYYY-MM-DD"` 必填，文件名就是永久文章 ID。
- 日期倒序排列；标题、摘要、标签直接读取文章头部。
- `draft: true` 可保留草稿而不显示在任何文章列表中。
- 删除文件即可撤下文章；更改文件名会改变文章链接。
- Markdown 自动渲染，不支持执行原始 HTML 或脚本。
- 旧 `public/blog/` 文件作为历史资料保留，但不再作为发布入口；旧示例含未经简历证实的内容，请核实后再迁移。
- 新增的原则文章是编辑草稿内容，现场笔记中的个人经历与指标来自原始简历；公开发布前请确认措辞。

## 增加经历或案例

所有个人资料放在 `src/data/profile.ts`。在 `governanceCases` 数组追加一个条目，案例档案和职业经历会一起更新。`featured: true` 表示首页精选。

```ts
{
  id: 'unique-project-id',
  date: '2026 — Present',
  category: { en: 'Architecture', zh: '架构' },
  title: { en: 'Project title', zh: '项目名称' },
  context: { en: 'Context', zh: '背景' },
  action: { en: 'Your contribution', zh: '亲自完成的工作' },
  result: { en: 'Verified outcome', zh: '经过验证的结果' },
  metric: 'Your metric',
  metricLabel: { en: 'Metric meaning', zh: '指标含义' },
  role: { en: 'Your role', zh: '真实职责' },
  featured: false,
}
```

个人名字、定位、邮箱、电话、当前动态与工作原则也在同一文件维护。只使用有依据的成果与数字。教育经历在 `src/pages/About.tsx`。

## GitHub Pages

- 仓库：`myasdm.github.io`；Pages Source 保持 **GitHub Actions**。
- 提交到 `main` 自动运行 `.github/workflows/deploy.yml`；依赖安装使用 `npm ci` 与 `package-lock.json`。
- 也可以在 GitHub Actions 手动选择 **Run workflow**。
- 网站地址：`https://myasdm.github.io/`。
- 文章地址如 `https://myasdm.github.io/#/blog?post=ordering-at-scale`；案例地址如 `/#/cases#iot`。采用 hash 地址避免静态托管的子页面刷新 404。
- Lovable 预览更新不等于 GitHub Pages 已发布；以 GitHub Actions 部署任务及实际网址为准。
- 联系入口打开访客的邮件软件，没有模拟成功提示，也不会在网站内发送邮件。

## 本地开发

```sh
npm ci
npm run dev
npm test
```

React + Vite + TypeScript，Markdown 由 react-markdown / GFM 解析，文章头部由 YAML 解析。语言初始值根据浏览器语言选择中文或英文，访问不同页面时保留手动选择。
