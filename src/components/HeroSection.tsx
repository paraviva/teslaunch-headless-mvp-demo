import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HERO_MEDIA } from '../data/catalog';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onBrowseCatalog: () => void;
  onInspectFlagshipPdp: () => void;
}

const ENGINEERING_PILLARS = [
  {
    metric: '0.00 CLS',
    label: 'Locked Media Geometry',
    detail: 'Zero layout shifts across variant switches and gallery thumbnails.',
  },
  {
    metric: '100% OEM',
    label: 'Non-Destructive Fitment',
    detail: 'Factory CAN-bus Y-harnesses with zero wire cutting or error codes.',
  },
  {
    metric: '3K Carbon',
    label: 'Autoclave Pre-Preg Aero',
    detail: 'Laser-scanned trunk and chassis tolerances within ±0.3 mm.',
  },
  {
    metric: '24–48h',
    label: 'Regional Fulfillment',
    detail: 'Dispatched from California and EU hubs with 2-year hardware coverage.',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBrowseCatalog,
  onInspectFlagshipPdp,
}) => {
  return (
    <section className="border-b border-[#E5E7EB] bg-white">
      <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-between lg:col-span-5">
            <div className="space-y-5">
              <p className="text-xs font-medium tracking-wide text-[#52525B]">
                Model 3 Highland · Model Y · Cybertruck · Model S / X
              </p>

              <h1
                className="font-display font-semibold tracking-tight text-[#111214]"
                style={{
                  fontSize: 'clamp(2.25rem, 3.6vw, 3.35rem)',
                  lineHeight: 1.08,
                  textWrap: 'balance',
                }}
              >
                Precision EV Hardware, Engineered for Instant Fit.
              </h1>

              <p className="max-w-[46ch] text-base leading-relaxed text-[#52525B]">
                OEM-grade cockpit displays, forged dry carbon steering wheels,
                and autoclave aerodynamic upgrades built for seamless
                plug-and-play installation.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onBrowseCatalog}
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#DC2626] px-5 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#B91C1C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DC2626]"
              >
                <span>Shop 2026 Catalog</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onInspectFlagshipPdp}
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#D4D4D8] bg-white px-5 text-sm font-medium text-[#111214] whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-[#111214] hover:bg-[#F9FAFB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111214]"
              >
                <span>Inspect Flagship PDP</span>
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#F3F4F6] lg:col-span-7">
            <ResilientImage
              src={HERO_MEDIA.url}
              alt={HERO_MEDIA.alt}
              aspectClass="aspect-[16/9] lg:h-full lg:aspect-auto"
              priority={true}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-5 sm:p-6">
              <div className="flex flex-wrap items-end justify-between gap-3 text-white">
                <div>
                  <p className="text-xs font-medium text-white/80">
                    Featured Aero &amp; Cockpit Suite
                  </p>
                  <p className="font-display text-lg font-semibold tracking-tight">
                    Model Y Forged Carbon Program
                  </p>
                </div>
                <span className="font-mono text-xs tabular-nums text-white/90">
                  From $159.00 USD
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 divide-y divide-[#E5E7EB] border-t border-[#E5E7EB] pt-6 sm:grid-cols-2 sm:divide-y-0 sm:gap-6 lg:grid-cols-4">
          {ENGINEERING_PILLARS.map((pillar) => (
            <div key={pillar.label} className="pt-4 sm:pt-0">
              <p className="font-mono text-sm font-semibold tabular-nums text-[#111214]">
                {pillar.metric}
              </p>
              <p className="mt-1 text-sm font-semibold text-[#111214]">
                {pillar.label}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#52525B]">
                {pillar.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
