# konlue 的博客

基于 [AstroPaper](https://github.com/satnaing/astro-paper)（Astro 7 + Tailwind CSS v4）的个人博客。本 README 是这个仓库的操作手册：写文章、发文章、改功能、守红线。

## 常用命令

包管理器用 pnpm（通过 corepack 调用，无需全局安装）：

```bash
corepack pnpm dev       # 本地开发，http://localhost:4321
corepack pnpm build     # 生产构建（含 astro check 类型检查 + pagefind 搜索索引）
corepack pnpm preview   # 预览生产构建产物（dist/）
```

## 文章发布流程

### 1. 新建文章

在 `src/content/posts/` 下新建 Markdown 文件（文件名即 slug 的一部分），头部模板：

```markdown
---
pubDatetime: 2026-10-11T06:00:00.000Z
title: "文章标题"
slug: my-post-slug
featured: false
draft: false
tags:
  - 后端
description: "一句话摘要，会显示在列表页与 SEO meta 里。"
---

正文从这里开始。
```

| 字段 | 说明 |
|---|---|
| `pubDatetime` | 发布时间，**UTC**（ISO 格式，北京时间 -8 小时） |
| `title` / `description` | 标题与摘要，摘要会进列表卡片和 OG 图 |
| `slug` | URL 路径，建议英文短横线 |
| `featured: true` | 上首页「精选」区（目前只放一篇） |
| `draft: true` | 草稿，不渲染不展示 |
| `tags` | 标签页自动按 tag 聚合 |

### 2. 预览

```bash
corepack pnpm dev
```

改动即热更新。`pubDatetime` 写**未来时间** = 定时发布：文章在站点上不可见，到点自动出现（构建时刻在发布时间前 15 分钟内也会显示）。

### 3. 提交与部署

```bash
git add -A
git commit -m "posts: 文章标题"
git push
```

推送后由 CI 自动构建部署，具体配置见 [DEPLOY.md](./DEPLOY.md)。

## 功能约定

- **目录**：文章的二/三级标题 ≥ 3 个时，宽屏（≥1380px）自动出现右侧目录，滚动高亮当前章节
- **mermaid 图**：正文里直接写 ` ```mermaid ` 代码块，客户端渲染、跟随明暗主题；仅页面存在图表时才加载渲染器
- **图片**：放 `src/assets/images/`，正文用相对路径引用，如 `![说明](../../assets/images/xx.png)`
- **页头头像**：替换 `src/assets/images/avatar.png`（jpg/png/webp 均可，文件名固定 `avatar`），自动裁圆、压缩
- **滚动渐入 / 主题涟漪 / 状态流动画**：全部尊重系统「减弱动态效果」设置，关闭后自动退化为静态

## 自定义位置速查

| 想改什么 | 在哪 |
|---|---|
| 站点名、作者、社交链接 | `astro-paper.config.ts` |
| 首页 hero 文案与状态流 | `src/pages/index.astro` |
| 中文界面文案 | `src/i18n/lang/zh-cn.ts` |
| 主题色、明暗配色 | `src/styles/theme.css` |
| 点阵背景、状态流动画 | `src/pages/index.astro` 的 `<style>` / `global.css` |
| 主题切换涟漪 | `src/scripts/theme.ts` |
| 目录与滚动渐入 | `src/pages/posts/[...slug]/index.astro`、`Layout.astro`、`global.css` |
| About 页 | `src/content/pages/about.md` |
