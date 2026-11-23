import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CraftsmanshipSectionProps {
  onOpenHeadlessPath?: () => void;
}

const BENCHMARK_ROWS = [
  {
    metric: 'First Contentful Paint (FCP)',
    liquidLegacy: '4.5s (33 Render-Blocking Assets)',
    headlessTarget: '< 0.6s (Inlined Critical CSS)',
  },
  {
    metric: 'Largest Contentful Paint (LCP)',
    liquidLegacy: '6.7s (6.8 MB / 478 Requests)',
    headlessTarget: '< 0.9s (Preloaded Hero + No App Bloat)',
  },
  {
    metric: 'Total Blocking Time (TBT)',
    liquidLegacy: '3,910 ms (117 JS Scripts / WPM Pixels)',
    headlessTarget: '< 40 ms (Zero Third-Party Main-Thread Lock)',
  },
  {
    metric: 'Time to Interactive (TTI)',
    liquidLegacy: '41.5s (25.5s Main-Thread Work)',
    headlessTarget: '< 1.2s (Pre-Hydrated Storefront API)',
  },
  {
    metric: 'DOM Complexity & Mega Menu',
    liquidLegacy: '4,961 Nodes (Eager Mega Menu + Swatches)',
    headlessTarget: '< 350 Nodes (Lazy-Mounted Mega Menu)',
  },
];

export const CraftsmanshipSection: React.FC<CraftsmanshipSectionProps> = ({
  onOpenHeadlessPath,
}) => {
  return (
    <section id="architecture" className="border-t border-[#E5E7EB] bg-white">
      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-wider text-[#52525B]">
              Lighthouse Audit Diagnosis &amp; Architecture
            </p>
            <h2
              className="font-display mt-2 text-2xl font-semibold tracking-tight text-[#111214] sm:text-3xl"
              style={{ textWrap: 'balance' }}
            >
              Eliminating the 3,910 ms Main-Thread Bottleneck on Teslaunch PDPs
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#52525B]">
              Mobile Lighthouse telemetry on the live Model Y Juniper PPF
              product page recorded a Performance score of 29/100 driven by
              4,961 DOM nodes, 117 JavaScript bundles (Loox, CodeBlackBelt,
              EasyGift, Omnisend, Langwill, and 15 Web-Pixel sandboxes), and
              eagerly rendered Mega Menu trees. This headless frontend lazy-mounts
              the Mega Menu on interaction and locks image geometry for 0.00 CLS.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-6 border-t border-[#E5E7EB] pt-6">
              <div>
                <p className="font-mono text-2xl font-semibold tabular-nums text-[#111214]">
                  4,961 → &lt;350
                </p>
                <p className="mt-1 text-xs text-[#52525B]">
                  Initial DOM node reduction by lazy-mounting Mega Menu and PDP
                  accordion drawers.
                </p>
              </div>
              <div>
                <p className="font-mono text-2xl font-semibold tabular-nums text-[#111214]">
                  478 → &lt;25
                </p>
                <p className="mt-1 text-xs text-[#52525B]">
                  Network request reduction by consolidating apps into Storefront
                  API + edge worker pixels.
                </p>
              </div>
            </div>

            {onOpenHeadlessPath && (
              <div className="mt-6">
                <button
                  type="button"
                  onClick={onOpenHeadlessPath}
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#111214] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#27272A]"
                >
                  <span>查看 Headless Shopify 极简落地路径页</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          <div className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] lg:col-span-7">
            <div className="border-b border-[#E5E7EB] bg-[#F3F4F6] px-5 py-3.5">
              <h3 className="font-display text-sm font-semibold text-[#111214]">
                Live Lighthouse Audit vs. Headless Storefront Target
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#E5E7EB] text-xs font-medium text-[#52525B]">
                    <th className="px-5 py-3">Lighthouse Metric</th>
                    <th className="px-5 py-3">Current Liquid PDP (Score 29)</th>
                    <th className="px-5 py-3 text-[#111214]">
                      Headless React Target
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {BENCHMARK_ROWS.map((row) => (
                    <tr key={row.metric} className="bg-white">
                      <td className="px-5 py-3.5 font-medium text-[#111214]">
                        {row.metric}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-xs tabular-nums text-[#71717A]">
                        {row.liquidLegacy}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-xs font-semibold tabular-nums text-[#111214]">
                        {row.headlessTarget}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
