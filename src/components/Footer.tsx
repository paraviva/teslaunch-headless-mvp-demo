import React from 'react';
import { VehicleModel } from '../types/shopify';

interface FooterProps {
  onSelectModel: (model: VehicleModel) => void;
  onNavigateHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectModel,
  onNavigateHome,
}) => {
  return (
    <footer className="bg-[#111214] text-[#E4E4E7]">
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 border-b border-[#27272A] pb-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <button
              type="button"
              onClick={onNavigateHome}
              className="font-display text-lg font-bold tracking-tight text-white"
            >
              TESLAUNCH
            </button>
            <p className="mt-3 max-w-[38ch] text-xs leading-relaxed text-[#A1A1AA]">
              Independent Tesla aftermarket engineering studio specializing in
              OEM-fitment cockpit displays, 3K autoclave carbon aero, and
              plug-and-play EV upgrades.
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Vehicle Platforms
            </h3>
            <ul className="mt-3 space-y-2 text-xs text-[#A1A1AA]">
              {(
                [
                  'Model 3 Highland',
                  'Model Y',
                  'Cybertruck',
                  'Model S / X',
                ] as VehicleModel[]
              ).map((model) => (
                <li key={model}>
                  <button
                    type="button"
                    onClick={() => onSelectModel(model)}
                    className="transition-colors hover:text-white"
                  >
                    {model}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Fulfillment &amp; Support
            </h3>
            <ul className="mt-3 space-y-2 text-xs text-[#A1A1AA]">
              <li>Fremont, CA &amp; Rotterdam Fulfillment Centers</li>
              <li>24-Month Hardware &amp; Harness Warranty</li>
              <li>Non-Destructive Plug-and-Play Fitment Guarantee</li>
              <li>Storefront API Ready · USD ($)</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-2 text-xs text-[#71717A] sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} TESLAUNCH Hardware Studio. All rights reserved.</p>
          <p>Headless Storefront Architecture</p>
        </div>
      </div>
    </footer>
  );
};
