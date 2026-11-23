# 给 Google AI Studio 的提示词（复制 MVP 用）

把 `teslaunch-megamenu-reference.html`（或 `teslaunch-mega-panels-only.html`）上传/粘贴到 AI Studio，然后配合下面的提示词。

---

## 提示词（直接复制）

```
I've attached the HTML source of a Shopify store's header navigation with three mega menus.
Please build a clean, standalone MVP of this navigation system using React + Tailwind CSS.

Requirements:
1. Top-level nav: Shop by Models / Collections / Deals / Supports / Blogs, with the logo on the left and search/account/cart icons on the right (use placeholder SVGs).
2. Three mega menu panels:
   - "Shop by Models": a 5-column grid grouped by Tesla model (Model 3, Model Y, Model S, Model X, Cybertruck), each with sub-links and small category thumbnails.
   - "Collections": a 5-column card grid of product categories, each card with an image placeholder + name.
   - "Supports": a 4-column link list.
3. Interaction: hover on desktop opens the mega menu; click/tap opens it on mobile. Mega menu closes on mouse leave / outside click / Escape.
4. Use the original class names as data attributes if helpful, but write modern semantic React components. Replace all real product URLs with placeholder data.
5. Responsive: desktop mega menu (>=1024px), slide-in/off-canvas mobile menu (<1024px) with accordion submenus.
6. Output a single self-contained React component file + Tailwind config notes. Keep it runnable in a fresh Vite/Next.js project.

Important: this is for a UI/UX prototype only — do not copy any real brand logos, product photography, or copyrighted text. Use placeholders for all of those.
```

---

## 中文提示词（如需中文沟通）

```
我附上了一个 Shopify 店铺首页导航（含三个 MEGA MENU）的 HTML 源码。
请用 React + Tailwind CSS 做一个干净的 MVP：

1. 顶部导航：Shop by Models / Collections / Deals / Supports / Blogs，左侧 logo，右侧搜索/账户/购物车图标（用占位 SVG）。
2. 三个 mega menu 面板：
   - Shop by Models：5 列，按 Tesla 车型分组，每组带子链接和分类缩略图占位；
   - Collections：5 列卡片网格，每卡图片占位 + 名称；
   - Supports：4 列链接列表。
3. 交互：桌面 hover 展开，移动端点击展开，鼠标移出/点击外部/Esc 关闭。
4. 响应式：桌面 mega menu（>=1024px），移动端抽屉式菜单 + 手风琴子菜单（<1024px）。
5. 输出单个可运行的 React 组件文件 + Tailwind 配置说明，能在新建的 Vite/Next.js 项目直接跑。

注意：只做 UI/UX 原型，所有真实品牌 logo、产品图、文案都用占位符替代，不要照搬版权内容。
```

---

## 三个文件说明

| 文件 | 用途 |
|---|---|
| `teslaunch-megamenu-reference.html` | 完整参考：导航 section + 3 个 mega menu + 原站 CSS/JS 引用，433KB |
| `teslaunch-mega-panels-only.html` | 只有 3 个 mega panel 的精简版，404KB |
| `teslaunch-home-raw.html` | 完整首页原始 HTML，4.9MB（太大，不建议直接给 AI Studio） |

如果 AI Studio 报上下文超限，优先用第二个（panels-only）；还想再小的话，把里面重复的 `<li>` 产品链接删掉大半，保留每个分类下 3–5 个示例即可。

---

## 合规提醒

- 网站禁用了右键复制，但源码是公开可获取的——技术上抓取没问题；
- 用 AI 生成 MVP 做**自己的设计参考/原型**没问题，但**不要直接照搬品牌 logo、产品图、文案**上线——那是另一个站点，避免版权/商标纠纷；
- 如果你只是想借鉴导航的信息架构和交互模式，上面的提示词已经明确了"用占位符"，这是干净的做法。
