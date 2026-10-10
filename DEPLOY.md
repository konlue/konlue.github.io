# 上线操作指引（GitHub Pages）

博客已本地就绪：构建通过、首页/文章页/About 页渲染正常、RSS 与搜索可用。
剩下的远端操作需要你的 GitHub 授权，按下面步骤执行即可。

## 1. 创建 GitHub 仓库

在 GitHub 上新建**空仓库**（不要勾选 README / .gitignore / License）：

- 仓库名：`konlue.github.io`（用户站点，博客地址就是 https://konlue.github.io）
- 可见性：Public（Pages 免费方案要求 Public）

## 2. 推送并部署

```bash
cd D:/code/blog
git remote add origin https://github.com/konlue/konlue.github.io.git
git push -u origin main
```

推送后 GitHub Actions 会自动构建部署（`.github/workflows/deploy.yml` 已配好）。

## 3. 开启 Pages

仓库 → Settings → Pages → Build and deployment →
Source 选 **GitHub Actions**。

第一次部署约 1–2 分钟，之后每次 `git push` 自动更新。

## 4. 验证

- 打开 https://konlue.github.io 确认首页正常
- 检查 https://konlue.github.io/rss.xml 能订阅
- 手机开一下，确认暗色/亮色与排版正常

## 5. 联动回填（发完第一篇后做）

- GitHub profile README（konlue/konlue）加一行博客链接
- dam-hub、dam-scout 的 README 各加一节"设计与实现详解"，回填文章链接
- 简历在有 5 篇以上文章后再加"技术博客"一行

## 日常写作

```bash
cd D:/code/blog
npm run dev        # 本地 http://localhost:4321 预览
# 新建 src/content/posts/xxx.md 写作，frontmatter 里 draft: true 表示不发布
npm run build      # 提交前验证
git add -A && git commit -m "post: 文章标题" && git push
```

注意：`pubDatetime` 不要晚于当前时间（晚于会被当成"定时发布"而隐藏）。
