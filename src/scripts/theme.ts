const THEME_KEY = "theme";
const LIGHT = "light";
const DARK = "dark";

type ThemeViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
};
const doc = document as Document & {
  startViewTransition?: (update: () => void) => ThemeViewTransition;
};

function getPreferredTheme(): string {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? DARK
    : LIGHT;
}

// Reuse the value already set by the inline FOUC-prevention script if available.
let themeValue: string =
  (window as unknown as { __theme?: { value: string } }).__theme?.value ??
  getPreferredTheme();

function persist(): void {
  localStorage.setItem(THEME_KEY, themeValue);
  reflect();
}

function reflect(): void {
  const root = document.firstElementChild;
  root?.setAttribute("data-theme", themeValue);
  root?.classList.toggle("dark", themeValue === DARK);
  document.querySelector("#theme-btn")?.setAttribute("aria-label", themeValue);

  // Fill <meta name="theme-color"> with the computed background colour so
  // Android's browser chrome matches the page background.
  const bg = window.getComputedStyle(document.body).backgroundColor;
  document
    .querySelector("meta[name='theme-color']")
    ?.setAttribute("content", bg);
}

function setTheme(next: string): void {
  themeValue = next;
  persist();
}

// 主题切换的焦点动效：新主题从切换按钮位置以圆形扩散揭开
function startThemeTransition(
  next: string,
  origin: { x: number; y: number }
): void {
  const root = document.firstElementChild;
  if (!root || !doc.startViewTransition) {
    setTheme(next);
    return;
  }
  root.classList.add("vt-theme");
  const transition = doc.startViewTransition(() => setTheme(next));
  const radius = Math.hypot(
    Math.max(origin.x, window.innerWidth - origin.x),
    Math.max(origin.y, window.innerHeight - origin.y)
  );
  transition.ready
    .then(() => {
      root.animate(
        {
          clipPath: [
            `circle(0px at ${origin.x}px ${origin.y}px)`,
            `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
          ],
        },
        {
          duration: 450,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    })
    .catch(() => {});
  transition.finished
    .catch(() => {})
    .finally(() => root.classList.remove("vt-theme"));
}

function setup(): void {
  reflect();
  (document.querySelector("#theme-btn") as HTMLElement | null)?.addEventListener(
    "click",
    (e: MouseEvent) => {
      const next = themeValue === LIGHT ? DARK : LIGHT;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduceMotion) {
        setTheme(next);
        return;
      }
      const origin = { x: e.clientX, y: e.clientY };
      if (!origin.x && !origin.y) {
        // 键盘激活没有坐标，从按钮中心展开
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        origin.x = rect.left + rect.width / 2;
        origin.y = rect.top + rect.height / 2;
      }
      startThemeTransition(next, origin);
    }
  );
}

setup();

// Re-run after View Transitions navigation.
document.addEventListener("astro:after-swap", setup);

// Carry the theme-color value across View Transitions to prevent the
// Android navigation bar from flashing during page transitions.
document.addEventListener("astro:before-swap", event => {
  const color = document
    .querySelector("meta[name='theme-color']")
    ?.getAttribute("content");
  if (color) {
    (event as { newDocument: Document }).newDocument
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", color);
  }
});

// Sync with OS-level dark/light preference changes.
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches }) => {
    themeValue = matches ? DARK : LIGHT;
    persist();
  });
