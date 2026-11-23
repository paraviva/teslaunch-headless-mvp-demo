import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
} from 'lucide-react';

interface HeadlessPathPageProps {
  onBackToStorefront: () => void;
  onInspectFlagshipPdp: () => void;
}

type RouteTrack = 'hydrogen' | 'nextjs';

interface TrackSpec {
  id: RouteTrack;
  name: string;
  tagline: string;
  hosting: string;
  caching: string;
  bestFor: string;
  costProfile: string;
  installCmd: string;
}

const ROUTE_TRACKS: Record<RouteTrack, TrackSpec> = {
  hydrogen: {
    id: 'hydrogen',
    name: '路线 A · Shopify Hydrogen + Oxygen（官方首选）',
    tagline:
      'Shopify 原生 React Remix 框架，代码推送即部署至 Shopify 全球边缘节点（Oxygen），免除额外服务器与 DevOps 运维。',
    hosting: 'Shopify Oxygen（含在商店套餐内）',
    caching: '原生 Sub-request Cache + CacheShort / CacheLong 指令',
    bestFor: '希望快速上线、最小化运维成本、原生打通 Storefront API 与 Customer Account API 的团队。',
    costProfile: '零独立服务器账单，只需标准 / Plus 店铺订阅',
    installCmd: 'npm create @shopify/hydrogen@latest -- --template skeleton',
  },
  nextjs: {
    id: 'nextjs',
    name: '路线 B · Next.js App Router + Vercel Edge',
    tagline:
      'React Server Components 直连 Storefront GraphQL API，适合已有独立前端基建或需要多品牌内容中台接入的团队。',
    hosting: 'Vercel Edge Network / Cloudflare Pages',
    caching: 'Next.js ISR（revalidateTag 按 Shopify Webhook 精准刷新）',
    bestFor: '需要高度自定义路由、多国家内容站点融合或重度交互配置的研发团队。',
    costProfile: 'Vercel Pro 按量计费 + 独立 Webhook 缓存刷新路由',
    installCmd: 'npx create-next-app@latest teslaunch-headless --typescript --tailwind',
  },
};

const SCOPE_BOUNDARIES = [
  {
    zone: '01. 原样保留（Shopify 后台）',
    summary: '不动数据库，不重构财务与风控',
    items: [
      '全部商品、SKU 变体、库存与多仓履约逻辑',
      'Shopify 原生 Checkout 结账页与 Shop Pay / Apple Pay',
      '订单管理、售后退款、税率规则与欺诈风控',
      '原 Liquid 主题保留作为 30 秒极速回滚兜底方案',
    ],
  },
  {
    zone: '02. 全面重构（Headless 前端）',
    summary: '只替换决定首屏速度的 4 个核心页面',
    items: [
      '极速首页与按需挂载 Mega Menu（DOM 压降至 350 节点以内）',
      'Model Y Juniper / Model 3 Highland 等车型级集合筛选页',
      '固定图片容器比例的 0.00 CLS 产品详情页（PDP）',
      '原生 Storefront Cart API 侧边栏购物车与预校验适配年份',
    ],
  },
  {
    zone: '03. 彻底剥离（第三方 JS 清理）',
    summary: '消除 117 个脚本对主线程的 3,910 ms 阻塞',
    items: [
      '移除全站注入的评论弹窗、倒计时与关联推荐前端插件',
      '多语言由 Shopify Markets + GraphQL @inContext 原生直出',
      '广告转化像素收拢至 Customer Events / Server-Side GTM',
      '所有非首屏说明书、安装视频与参数表采用懒加载水合',
    ],
  },
];

const IMPLEMENTATION_STEPS = [
  {
    step: '01',
    phase: '第 1–2 天',
    title: '开通 Storefront API 并建立隔离开发分支',
    objective: '完全不触碰线上正式域名与黑五期间正在运行的 Liquid 主题。',
    actions: [
      '选项 1（最省事）：直接在现有 Shopify 后台安装官方 Headless Sales Channel，生成 Storefront API Public Access Token（只读商品与购物车权限），直接复用全部线上 SKU 与 Metafields。',
      '选项 2（完全沙盒）：在 Shopify Partner 后台开通开发测试店，用 Shopify CLI 或表格导出主力车型商品与菜单导航数据，避免测试订单混入真实财务报表。',
    ],
    deliverable: '可用的 Storefront GraphQL Endpoint + Public Token，能查回真实商品与价格。',
  },
  {
    step: '02',
    phase: '第 3–7 天',
    title: '搭好核心 4 页与 Storefront API 数据链路',
    objective: '按流量权重优先打通最影响转化的页面，不做大而全的盲目重写。',
    actions: [
      '接入 Mega Menu 与 Header：顶栏与车型菜单仅在悬停/点击时按需渲染二级面板，彻底解决 Liquid 主题首屏预渲染数千个隐藏 DOM 节点的问题。',
      '改造 PDP 产品详情页：首屏只保留画廊主图（固定宽高比防偏移）、变体选择、年份适配与加购按钮；折叠面板与评价列表等用户滚到再加载。',
      '打通 Cart API 与原生 Checkout：加购直接调用 cartLinesAdd Mutation，点击去结账时前端跳转到 Shopify 返回的 checkoutUrl（支持绑定 checkout.teslaunch.net）。',
    ],
    deliverable: '本地或预览地址已完整跑通「选车 → 看详情 → 加购 → 跳官方结账」全流程。',
  },
  {
    step: '03',
    phase: '第 8–10 天',
    title: '边缘节点部署与 Lighthouse 性能压测',
    objective: '把移动端 PDP 性能评分从目前的 29 分拉升至 90+ 分。',
    actions: [
      '部署到 Oxygen 或 Vercel Edge，为商品与集合页配置 stale-while-revalidate 边缘缓存，通过 Shopify Webhook（products/update）在改价或改库存时自动秒级刷新缓存。',
      '图片全量走 Shopify CDN 的 width/format=webp 自适应参数，首屏 Hero 图添加 fetchpriority="high" 与 preload。',
      '使用真机 4G 限速跑一遍 PageSpeed Insights，核对 LCP < 1.2s、TBT < 50ms、CLS = 0.00。',
    ],
    deliverable: '二级预览域名（例如 next.teslaunch.net）通过性能基线验收与下单联调。',
  },
  {
    step: '04',
    phase: '第 11–12 天',
    title: '黑五后灰度切流与零风险回滚机制',
    objective: '用真实付费流量验证 ROI，确保转化率稳定上升后全量切换。',
    actions: [
      '第一步灰度测试：先不切主域名，将 1–2 个高流量广告系列（如 Model Y Juniper PPF 落地页）直接投放至 Headless 测试域名，连续 7 天对比加购率与跳出率。',
      '第二步全量切换：确认转化提升后，将主域名 DNS（或 Cloudflare Workers）指向 Headless 边缘端；同时保留 checkout 子域名由 Shopify 原生托管。',
      '兜底预案：原有 Liquid 主题保持发布状态不删除，一旦出现任何第三方物流或支付兼容波动，30 秒修改 DNS 解析即可无损切回原站。',
    ],
    deliverable: '主站正式完成 Headless 升级，兼具独立站极速体验与 Shopify 后台稳定性。',
  },
];

const PLUGIN_REPLACEMENT_ROWS = [
  {
    plugin: '评价展示插件（Loox / Judge.me）',
    legacyCost: '全站注入多份样式与弹窗 JS，阻塞首屏解析',
    headlessPlan: '服务端定时抓取评分摘要随首屏直出，图文评价列表滚动触底再懒加载',
  },
  {
    plugin: '捆绑加购与推荐（CodeBlackBelt / EasyGift）',
    legacyCost: '每次打开 PDP 在前端暴力拉取推荐列表与促销弹窗',
    headlessPlan: '商品关联 SKU 直接存入 Shopify Metafields，首屏 0 次额外接口请求',
  },
  {
    plugin: '邮件弹窗与营销脚本（Omnisend）',
    legacyCost: '刚进页面即触发多个追踪器与遮罩层，拉高 TBT 与布局偏移',
    headlessPlan: '仅在用户停留超过 10 秒且产生滚动交互后按需加载提交表单',
  },
  {
    plugin: '多语言翻译重写（Langwill）',
    legacyCost: '浏览器端遍历整棵 DOM 树替换文本，造成画面闪烁与主线程卡顿',
    headlessPlan: '使用 Shopify Markets + GraphQL @inContext(language) 服务端直接输出对应语言',
  },
  {
    plugin: '15 个 Web Pixel 追踪沙盒',
    legacyCost: '大量沙盒 iframe 并发抢占手机端 CPU，TTI 拖慢至 41.5 秒',
    headlessPlan: '收拢至 Customer Events 或服务端转发，非关键统计统一延后至 idle 阶段发送',
  },
];

const CHECKLIST_ITEMS = [
  '在 Shopify 后台开启 Headless Channel 并拿到 Storefront API Public Token',
  '建立独立代码仓库并验证 GraphQL 商品查询（含价格、库存与兼容车型 Metafield）',
  '完成 Header 懒加载 Mega Menu（未展开前不渲染隐藏节点）',
  '完成 0.00 CLS 的产品详情页（固定主图宽高比 + 变体库存切换）',
  '接通 Storefront Cart API 并实测跳转 Shopify 官方 checkoutUrl 完成一笔测试订单',
  '配置产品 Webhook 自动清理 CDN 缓存并跑通移动端 Lighthouse 90+ 压测',
  '黑五后选取 1 个核心广告落地页灰度试跑 7 天，验证加购率提升后切主域名',
];

const STOREFRONT_SNIPPET = `// 1. Storefront API 极简商品查询示例（免后端中转，直接读边缘缓存）
export async function fetchProductByHandle(handle: string) {
  const endpoint = \`https://\${process.env.PUBLIC_STORE_DOMAIN}/api/2026-01/graphql.json\`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.PUBLIC_STOREFRONT_API_TOKEN!,
    },
    body: JSON.stringify({
      query: \`
        query ProductByHandle($handle: String!) {
          product(handle: $handle) {
            id
            title
            handle
            variants(first: 10) {
              nodes { id title availableForSale price { amount currencyCode } }
            }
          }
        }
      \`,
      variables: { handle },
    }),
  });

  return response.json();
}`;

const CHECKLIST_STORAGE_KEY = 'teslaunch_headless_roadmap_checks_v1';

export const HeadlessPathPage: React.FC<HeadlessPathPageProps> = ({
  onBackToStorefront,
  onInspectFlagshipPdp,
}) => {
  const [selectedTrack, setSelectedTrack] = useState<RouteTrack>('hydrogen');
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as Record<number, boolean>) : {};
    } catch {
      return {};
    }
  });
  const [copiedKey, setCopiedKey] = useState<'cmd' | 'code' | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(checkedItems));
    } catch {
      // Ignore storage quota restrictions
    }
  }, [checkedItems]);

  const completedCount = CHECKLIST_ITEMS.filter((_, idx) => checkedItems[idx]).length;
  const activeTrack = ROUTE_TRACKS[selectedTrack];

  const handleCopy = async (text: string, key: 'cmd' | 'code') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      // Fallback: ignore if clipboard API unavailable
    }
  };

  const toggleChecklist = (index: number) => {
    setCheckedItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="bg-[#FAFAFA] text-[#111214]">
      {/* Page Hero & Back Navigation */}
      <section className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F1F2F4] pb-5">
            <button
              type="button"
              onClick={onBackToStorefront}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-3.5 text-xs font-semibold text-[#111214] transition-colors hover:border-[#111214]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>返回店面前台演示</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-[#52525B]">
              <span>Teslaunch Headless 方案</span>
              <span aria-hidden="true">·</span>
              <span>黒五后上线路径</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums text-[#111214]">
                4 阶段 / 12 天交付
              </span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-xs font-medium tracking-wide text-[#52525B]">
                Architecture Roadmap · 不动现有订单与支付 · 仅升级前端渲染层
              </p>
              <h1
                className="font-display mt-2 font-semibold tracking-tight text-[#111214]"
                style={{
                  fontSize: 'clamp(2rem, 3.4vw, 3rem)',
                  lineHeight: 1.12,
                  textWrap: 'balance',
                }}
              >
                Headless Shopify 具体极简落地路径
              </h1>
              <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-[#52525B]">
                针对现有 Liquid 站点产品页加载缓慢（Lighthouse 29 分、4,961 个 DOM 节点、117 个阻塞脚本）的问题，最稳妥的做法不是推翻重做电商后台，而是原封不动保留 Shopify 订单、库存与原生结账，用最轻量的 4 步路径把前端切换为边缘渲染架构。
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] p-5">
                <p className="text-xs font-semibold text-[#111214]">
                  核心预期指标对比（目标 PDP）
                </p>
                <div className="mt-4 grid grid-cols-3 gap-4 border-t border-[#E5E7EB] pt-4">
                  <div>
                    <p className="text-xs text-[#52525B]">LCP 加载</p>
                    <p className="font-mono mt-1 text-base font-semibold tabular-nums text-[#111214]">
                      6.7s → &lt;1.0s
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#52525B]">TBT 阻塞</p>
                    <p className="font-mono mt-1 text-base font-semibold tabular-nums text-[#111214]">
                      3.9s → &lt;50ms
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#52525B]">切回成本</p>
                    <p className="font-mono mt-1 text-base font-semibold tabular-nums text-[#111214]">
                      30 秒回滚
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3 border-t border-[#E5E7EB] pt-4">
                  <button
                    type="button"
                    onClick={onInspectFlagshipPdp}
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#DC2626] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#B91C1C]"
                  >
                    <span>体验重构后 PDP 示例</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={onBackToStorefront}
                    className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-[#D4D4D8] bg-white px-4 text-xs font-semibold text-[#111214] transition-colors hover:border-[#111214]"
                  >
                    <span>回到完整门店首页</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Boundary & Architecture Choice */}
      <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 border-b border-[#E5E7EB] pb-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-medium text-[#52525B]">
              第一步决策 · 技术栈选型与边界划分
            </p>
            <h2 className="font-display mt-1 text-2xl font-semibold tracking-tight text-[#111214]">
              什么留给 Shopify，什么交给 Headless 前端
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="选择 Headless 技术路线"
            className="inline-flex items-center gap-1 rounded-lg border border-[#E5E7EB] bg-white p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedTrack === 'hydrogen'}
              onClick={() => setSelectedTrack('hydrogen')}
              className={`rounded-md px-3.5 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                selectedTrack === 'hydrogen'
                  ? 'bg-[#111214] text-white'
                  : 'text-[#52525B] hover:text-[#111214]'
              }`}
            >
              Hydrogen + Oxygen（推荐）
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={selectedTrack === 'nextjs'}
              onClick={() => setSelectedTrack('nextjs')}
              className={`rounded-md px-3.5 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                selectedTrack === 'nextjs'
                  ? 'bg-[#111214] text-white'
                  : 'text-[#52525B] hover:text-[#111214]'
              }`}
            >
              Next.js + Vercel Edge
            </button>
          </div>
        </div>

        {/* Selected Tech Stack Summary */}
        <div className="mt-6 rounded-xl border border-[#E5E7EB] bg-white p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h3 className="font-display text-lg font-semibold text-[#111214]">
                {activeTrack.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#52525B]">
                {activeTrack.tagline}
              </p>
              <div className="mt-4 flex items-center justify-between gap-2 rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] px-3.5 py-2.5">
                <code className="truncate font-mono text-xs text-[#111214]">
                  {activeTrack.installCmd}
                </code>
                <button
                  type="button"
                  onClick={() => handleCopy(activeTrack.installCmd, 'cmd')}
                  className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-[#E5E7EB] bg-white px-2.5 text-xs font-medium text-[#111214] hover:border-[#111214]"
                >
                  {copiedKey === 'cmd' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#16A34A]" />
                      <span>已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>复制命令</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 border-t border-[#E5E7EB] pt-5 sm:grid-cols-2 lg:col-span-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
              <div>
                <p className="text-xs font-medium text-[#71717A]">托管节点</p>
                <p className="mt-1 text-sm font-semibold text-[#111214]">
                  {activeTrack.hosting}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-[#71717A]">缓存机制</p>
                <p className="mt-1 text-sm font-semibold text-[#111214]">
                  {activeTrack.caching}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-[#71717A]">适用场景</p>
                <p className="mt-1 text-xs leading-relaxed text-[#52525B]">
                  {activeTrack.bestFor}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-[#71717A]">成本结构</p>
                <p className="mt-1 text-xs leading-relaxed text-[#52525B]">
                  {activeTrack.costProfile}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scope Split 3 Columns */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {SCOPE_BOUNDARIES.map((block) => (
            <div
              key={block.zone}
              className="rounded-xl border border-[#E5E7EB] bg-white p-6"
            >
              <p className="font-display text-base font-semibold text-[#111214]">
                {block.zone}
              </p>
              <p className="mt-1 text-xs text-[#52525B]">{block.summary}</p>
              <ul className="mt-4 divide-y divide-[#F1F2F4] border-t border-[#F1F2F4] text-sm text-[#3F3F46]">
                {block.items.map((item) => (
                  <li key={item} className="py-2.5 leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: 4-Step Execution Path */}
      <section className="border-y border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#52525B]">
              标准执行顺序 · 12 天跑通从沙盒到黑五后切换
            </p>
            <h2 className="font-display mt-1 text-2xl font-semibold tracking-tight text-[#111214]">
              四步极简实施路径
            </h2>
          </div>

          <div className="mt-8 divide-y divide-[#E5E7EB] rounded-xl border border-[#E5E7EB] bg-[#FAFAFA]">
            {IMPLEMENTATION_STEPS.map((item) => (
              <div
                key={item.step}
                className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-12 lg:p-7"
              >
                <div className="lg:col-span-4">
                  <div className="flex items-baseline gap-3 text-xs font-medium text-[#52525B]">
                    <span className="font-mono text-sm font-semibold tabular-nums text-[#DC2626]">
                      {item.step}.
                    </span>
                    <span>{item.phase}</span>
                  </div>
                  <h3 className="font-display mt-1.5 text-lg font-semibold text-[#111214]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#52525B]">
                    {item.objective}
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <p className="text-xs font-semibold text-[#111214]">
                    具体执行动作
                  </p>
                  <ul className="mt-2.5 space-y-2.5 text-sm leading-relaxed text-[#3F3F46]">
                    {item.actions.map((act) => (
                      <li key={act}>{act}</li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-3">
                  <div className="rounded-lg border border-[#E5E7EB] bg-white p-4">
                    <p className="text-xs font-semibold text-[#111214]">
                      阶段交付物
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#52525B]">
                      {item.deliverable}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Liquid App Bloat Replacement Matrix */}
      <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium text-[#52525B]">
            性能核心抓手 · 原站插件瘦身对照表
          </p>
          <h2 className="font-display mt-1 text-2xl font-semibold tracking-tight text-[#111214]">
            不丢业务功能，只清除阻塞主线程的插件脚本
          </h2>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#F3F4F6] text-xs font-semibold text-[#52525B]">
                  <th className="px-5 py-3.5">原 Shopify App / 脚本模块</th>
                  <th className="px-5 py-3.5">当前 Liquid 页性能拖累</th>
                  <th className="px-5 py-3.5 text-[#111214]">
                    Headless 极简平替方案
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {PLUGIN_REPLACEMENT_ROWS.map((row) => (
                  <tr key={row.plugin}>
                    <td className="px-5 py-4 font-medium text-[#111214]">
                      {row.plugin}
                    </td>
                    <td className="px-5 py-4 text-xs leading-relaxed text-[#71717A]">
                      {row.legacyCost}
                    </td>
                    <td className="px-5 py-4 text-xs font-medium leading-relaxed text-[#111214]">
                      {row.headlessPlan}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 4: Interactive Launch Checklist & Minimal Code Pattern */}
      <section className="border-t border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Interactive Checklist */}
            <div className="lg:col-span-6">
              <div className="flex items-baseline justify-between gap-4 border-b border-[#E5E7EB] pb-4">
                <div>
                  <h2 className="font-display text-xl font-semibold text-[#111214]">
                    上线前联调自检清单
                  </h2>
                  <p className="mt-1 text-xs text-[#52525B]">
                    勾选状态自动保存在本地浏览器，方便技术与客户逐项对齐
                  </p>
                </div>
                <span className="font-mono text-sm font-semibold tabular-nums text-[#111214]">
                  {completedCount}/{CHECKLIST_ITEMS.length}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                {CHECKLIST_ITEMS.map((item, idx) => {
                  const isDone = !!checkedItems[idx];
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleChecklist(idx)}
                      className={`flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${
                        isDone
                          ? 'border-[#111214] bg-[#FAFAFA]'
                          : 'border-[#E5E7EB] bg-white hover:border-[#D4D4D8]'
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                          isDone
                            ? 'border-[#111214] bg-[#111214] text-white'
                            : 'border-[#D4D4D8] bg-white'
                        }`}
                      >
                        {isDone && <Check className="h-3 w-3" strokeWidth={2.5} />}
                      </span>
                      <span
                        className={`text-sm leading-snug ${
                          isDone ? 'text-[#71717A] line-through' : 'text-[#111214]'
                        }`}
                      >
                        {item}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Minimal GraphQL Pattern */}
            <div className="lg:col-span-6">
              <div className="flex items-center justify-between gap-4 border-b border-[#E5E7EB] pb-4">
                <div>
                  <h2 className="font-display text-xl font-semibold text-[#111214]">
                    Storefront API 最小读取示例
                  </h2>
                  <p className="mt-1 text-xs text-[#52525B]">
                    只需 1 个公开 Token 与标准 fetch 请求即可接管全部在售 SKU
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(STOREFRONT_SNIPPET, 'code')}
                  className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-3 text-xs font-semibold text-[#111214] hover:border-[#111214]"
                >
                  {copiedKey === 'code' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#16A34A]" />
                      <span>已复制代码</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>复制片段</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 overflow-hidden rounded-xl border border-[#27272A] bg-[#111214]">
                <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-[#E4E4E7]">
                  <code>{STOREFRONT_SNIPPET}</code>
                </pre>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3.5">
                <p className="text-xs text-[#52525B]">
                  已同步还原原站 8 大车型与 13 大类目 Mega Menu，可直接回门店实测交互。
                </p>
                <button
                  type="button"
                  onClick={onBackToStorefront}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#DC2626] hover:text-[#B91C1C]"
                >
                  <span>返回门店前台查看 Mega Menu 与 PDP</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
