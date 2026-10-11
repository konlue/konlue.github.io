import type { ImageMetadata } from "astro";

// 站点可选图片：作者放好文件即生效，缺席时页面保持原样式（不报错、不破版）。
const images = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/*.{jpg,jpeg,png,webp,avif,gif}",
  { eager: true },
);

/** 按不带扩展名的文件名查找 src/assets/images/ 下的图片，如 getOptionalImage("avatar")。 */
export function getOptionalImage(basename: string): ImageMetadata | undefined {
  const entry = Object.entries(images).find(([path]) => {
    const file = path.split("/").pop() ?? "";
    const dot = file.lastIndexOf(".");
    return dot > 0 && file.slice(0, dot).toLowerCase() === basename.toLowerCase();
  });
  return entry?.[1]?.default;
}
