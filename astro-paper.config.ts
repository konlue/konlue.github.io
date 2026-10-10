import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://konlue.github.io",
    title: "Konlue的博客",
    description:
      "Java 后端 / AI 应用开发学习者。写工作流状态机、跨系统回调、缓存优化与 Agent 工作流的实现与复盘。",
    author: "Konlue",
    profile: "https://konlue.github.io",
    ogImage: "default-og.jpg",
    lang: "zh-cn",
    timezone: "Asia/Shanghai",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: false,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/konlue" },
    { name: "mail", url: "mailto:yuxiaoyu.dev@gmail.com" },
  ],
  shareLinks: [],
});