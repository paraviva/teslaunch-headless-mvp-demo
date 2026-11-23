import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  Check,
  CheckCircle2,
  Minus,
  Plus,
  ShieldCheck,
  Star,
  Truck,
  Wrench,
} from 'lucide-react';
import { ProductVariant, ShopifyProduct } from '../types/shopify';
import { ResilientImage } from './ResilientImage';

interface ProductDetailViewProps {
  product: ShopifyProduct;
  relatedProducts: ShopifyProduct[];
  onBackToCatalog: () => void;
  onAddToCart: (
    product: ShopifyProduct,
    variant: ProductVariant,
    quantity: number,
    fitmentLabel: string,
    openDrawer?: boolean
  ) => void;
  onSelectProduct: (product: ShopifyProduct) => void;
}

const GARAGE_VEHICLES = [
  '2024–2026 Model 3 Highland',
  '2021–2026 Model Y',
  '2019–2023 Model 3',
  '2024–2026 Cybertruck',
  '2021–2026 Model S / X',
];

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  relatedProducts,
  onBackToCatalog,
  onAddToCart,
  onSelectProduct,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    () => ({ ...product.variants[0].selectedOptions })
  );
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedGarage, setSelectedGarage] = useState<string>(
    product.metafields.fitmentYears[0] || GARAGE_VEHICLES[0]
  );
  const [activeTab, setActiveTab] = useState<
    'specs' | 'install' | 'reviews'
  >('specs');
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setSelectedOptions({ ...product.variants[0].selectedOptions });
    setActiveImageIndex(0);
    setQuantity(1);
    setSelectedGarage(product.metafields.fitmentYears[0] || GARAGE_VEHICLES[0]);
    setActiveTab('specs');
    setJustAdded(false);
  }, [product]);

  const activeVariant = useMemo(() => {
    const exactMatch = product.variants.find((variant) =>
      Object.entries(selectedOptions).every(
        ([optName, optVal]) => variant.selectedOptions[optName] === optVal
      )
    );
    return exactMatch || product.variants[0];
  }, [product.variants, selectedOptions]);

  const handleOptionSelect = (optionName: string, value: string) => {
    const nextOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(nextOptions);

    const matched = product.variants.find((variant) =>
      Object.entries(nextOptions).every(
        ([k, v]) => variant.selectedOptions[k] === v
      )
    );
    if (matched && product.images[matched.imageIndex]) {
      setActiveImageIndex(matched.imageIndex);
    }
  };

  const isGarageCompatible = useMemo(() => {
    const normalized = selectedGarage.toLowerCase();
    return product.metafields.compatibleModels.some((model) => {
      if (model === 'Model 3 Highland') {
        return normalized.includes('model 3');
      }
      if (model === 'Model Y') {
        return normalized.includes('model y');
      }
      if (model === 'Cybertruck') {
        return normalized.includes('cybertruck');
      }
      if (model === 'Model S / X') {
        return normalized.includes('model s');
      }
      return false;
    });
  }, [product.metafields.compatibleModels, selectedGarage]);

  const savings = activeVariant.compareAtPrice
    ? activeVariant.compareAtPrice - activeVariant.price
    : 0;

  const handleAddClick = (openDrawer = true) => {
    onAddToCart(product, activeVariant, quantity, selectedGarage, openDrawer);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div className="bg-[#FAFAFA] pb-20 lg:pb-14">
      <div className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2 text-xs text-[#52525B]">
            <button
              type="button"
              onClick={onBackToCatalog}
              className="inline-flex items-center gap-1.5 font-medium text-[#111214] whitespace-nowrap shrink-0 hover:text-[#DC2626] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DC2626]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Catalog</span>
            </button>
            <span aria-hidden="true">/</span>
            <span className="whitespace-nowrap shrink-0">{product.category}</span>
            <span aria-hidden="true">/</span>
            <span className="truncate font-medium text-[#111214]">
              {product.title}
            </span>
          </div>

          <span className="hidden font-mono text-xs tabular-nums text-[#52525B] sm:inline whitespace-nowrap shrink-0">
            SKU: {activeVariant.sku}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-4 pt-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Sticky Gallery Column */}
          <div className="lg:sticky lg:top-24 lg:col-span-7">
            <div className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white">
              <ResilientImage
                src={
                  product.images[activeImageIndex]?.url || product.images[0].url
                }
                alt={
                  product.images[activeImageIndex]?.alt || product.images[0].alt
                }
                aspectClass="aspect-[4/3]"
                priority={true}
              />
              <div className="flex items-center justify-between border-t border-[#E5E7EB] px-4 py-2.5 text-xs text-[#52525B]">
                <span className="truncate">
                  {product.images[activeImageIndex]?.caption}
                </span>
                <span className="font-mono tabular-nums whitespace-nowrap shrink-0">
                  {activeImageIndex + 1} / {product.images.length}
                </span>
              </div>
            </div>

            {product.images.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5">
                {product.images.map((img, idx) => {
                  const isActive = idx === activeImageIndex;
                  return (
                    <button
                      key={img.url + idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      aria-label={`View gallery image ${idx + 1}: ${img.caption}`}
                      className={`overflow-hidden rounded-lg border transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DC2626] ${
                        isActive
                          ? 'border-[#111214] ring-1 ring-[#111214]'
                          : 'border-[#E5E7EB] opacity-75 hover:opacity-100'
                      }`}
                    >
                      <ResilientImage
                        src={img.url}
                        alt={img.alt}
                        aspectClass="aspect-[4/3]"
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Key Hardware Highlights */}
            <div className="mt-6 rounded-xl border border-[#E5E7EB] bg-white p-6">
              <h2 className="font-display text-base font-semibold text-[#111214]">
                Engineering Highlights
              </h2>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[#3F3F46]">
                {product.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#111214]"
                      strokeWidth={2}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Contiguous Purchase Module */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#52525B]">
                <span className="font-medium uppercase tracking-wider">
                  {product.category} · {product.metafields.difficulty}
                </span>
                <span className="inline-flex items-center gap-1 font-medium text-[#111214]">
                  <Star className="h-3.5 w-3.5 fill-[#111214] text-[#111214]" />
                  <span className="font-mono tabular-nums">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-[#52525B]">
                    ({product.reviewCount} reviews)
                  </span>
                </span>
              </div>

              <h1
                className="font-display mt-2.5 text-2xl font-semibold tracking-tight text-[#111214] sm:text-3xl"
                style={{ textWrap: 'balance' }}
              >
                {product.title}
              </h1>

              <p className="mt-1.5 text-sm text-[#52525B]">{product.subtitle}</p>

              {/* Tabular Pricing Row */}
              <div className="mt-5 flex flex-wrap items-baseline gap-3 border-y border-[#E5E7EB] py-4">
                <span className="font-mono text-2xl font-semibold tabular-nums text-[#111214]">
                  ${activeVariant.price.toFixed(2)}
                </span>
                {activeVariant.compareAtPrice && (
                  <span className="font-mono text-sm tabular-nums text-[#71717A] line-through">
                    ${activeVariant.compareAtPrice.toFixed(2)}
                  </span>
                )}
                {savings > 0 && (
                  <span className="font-mono text-xs font-semibold tabular-nums text-[#DC2626]">
                    Save ${savings.toFixed(2)}
                  </span>
                )}
                <span className="ml-auto font-mono text-xs tabular-nums text-[#52525B]">
                  {activeVariant.inventoryQuantity} units ready
                </span>
              </div>

              {/* Interactive Vehicle Fitment Check */}
              <div className="mt-5">
                <label
                  htmlFor="garage-fitment"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#111214]"
                >
                  Verify Your Vehicle Fitment
                </label>
                <select
                  id="garage-fitment"
                  value={selectedGarage}
                  onChange={(e) => setSelectedGarage(e.target.value)}
                  className="mt-2 h-10 w-full rounded-lg border border-[#D4D4D8] bg-white px-3 text-sm font-medium text-[#111214] focus:border-[#111214] focus:outline-none"
                >
                  {GARAGE_VEHICLES.map((veh) => (
                    <option key={veh} value={veh}>
                      {veh}
                    </option>
                  ))}
                </select>
                <div className="mt-2 flex items-center gap-2 text-xs">
                  {isGarageCompatible ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#15803D]" />
                      <span className="font-medium text-[#15803D]">
                        Confirmed OEM Fitment for {selectedGarage}
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 shrink-0 text-[#B45309]" />
                      <span className="font-medium text-[#B45309]">
                        Not calibrated for {selectedGarage} — check compatible
                        models below
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Variant Option Groups */}
              <div className="mt-6 space-y-5">
                {product.options.map((group) => (
                  <div key={group.name}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold uppercase tracking-wider text-[#111214]">
                        {group.name}
                      </span>
                      <span className="font-medium text-[#52525B]">
                        {selectedOptions[group.name]}
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {group.values.map((val) => {
                        const isSelected = selectedOptions[group.name] === val;
                        return (
                          <button
                            key={val}
                            type="button"
                            onClick={() => handleOptionSelect(group.name, val)}
                            className={`flex min-h-[42px] items-center justify-center rounded-lg border px-3 py-2 text-center text-xs font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DC2626] ${
                              isSelected
                                ? 'border-[#111214] bg-[#111214] text-white'
                                : 'border-[#D4D4D8] bg-white text-[#111214] hover:border-[#111214]'
                            }`}
                          >
                            <span className="truncate">{val}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quantity & Purchase CTA */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-11 items-center rounded-lg border border-[#D4D4D8] bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="flex h-full w-10 items-center justify-center text-[#111214] transition-colors hover:bg-[#F3F4F6]"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-9 text-center font-mono text-sm font-semibold tabular-nums text-[#111214]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    aria-label="Increase quantity"
                    className="flex h-full w-10 items-center justify-center text-[#111214] transition-colors hover:bg-[#F3F4F6]"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleAddClick(true)}
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#DC2626] px-5 text-sm font-semibold text-white whitespace-nowrap transition-colors duration-150 hover:bg-[#B91C1C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DC2626]"
                >
                  {justAdded ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <span>
                      Add to Bag · $
                      {(activeVariant.price * quantity).toFixed(2)}
                    </span>
                  )}
                </button>
              </div>

              {/* Compact 4-Cell Metafield Matrix */}
              <div className="mt-6 grid grid-cols-2 divide-x divide-y divide-[#E5E7EB] overflow-hidden rounded-lg border border-[#E5E7EB] bg-[#FAFAFA]">
                <div className="p-3.5">
                  <div className="flex items-center gap-1.5 text-xs text-[#52525B]">
                    <Wrench className="h-3.5 w-3.5" />
                    <span>Install Time</span>
                  </div>
                  <p className="mt-1 font-mono text-xs font-semibold tabular-nums text-[#111214]">
                    ~{product.metafields.installTimeMinutes} min ({product.metafields.difficulty})
                  </p>
                </div>
                <div className="p-3.5">
                  <div className="flex items-center gap-1.5 text-xs text-[#52525B]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Warranty</span>
                  </div>
                  <p className="mt-1 font-mono text-xs font-semibold tabular-nums text-[#111214]">
                    {product.metafields.warrantyMonths} Months OEM
                  </p>
                </div>
                <div className="p-3.5">
                  <div className="flex items-center gap-1.5 text-xs text-[#52525B]">
                    <Truck className="h-3.5 w-3.5" />
                    <span>Dispatch</span>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-[#111214]">
                    Ships in 24h (CA / EU)
                  </p>
                </div>
                <div className="p-3.5">
                  <p className="text-xs text-[#52525B]">Connection</p>
                  <p className="mt-1 truncate text-xs font-semibold text-[#111214]">
                    {product.metafields.harnessType}
                  </p>
                </div>
              </div>

              {/* Interactive Specifications / Installation / Reviews Tabs */}
              <div className="mt-6 border-t border-[#E5E7EB] pt-5">
                <div
                  role="tablist"
                  aria-label="Product technical documentation"
                  className="flex items-center gap-1 rounded-lg bg-[#F3F4F6] p-1"
                >
                  {(
                    [
                      { id: 'specs', label: 'Specifications' },
                      { id: 'install', label: 'Installation' },
                      {
                        id: 'reviews',
                        label: `Reviews (${product.reviews.length})`,
                      },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={activeTab === tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`h-8 flex-1 rounded-md px-2 text-xs font-medium whitespace-nowrap transition-colors ${
                        activeTab === tab.id
                          ? 'bg-white text-[#111214] shadow-xs'
                          : 'text-[#52525B] hover:text-[#111214]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {activeTab === 'specs' && (
                  <dl className="mt-4 divide-y divide-[#F1F2F4] text-xs">
                    <div className="flex justify-between gap-4 py-2.5">
                      <dt className="text-[#52525B]">Primary Material</dt>
                      <dd className="text-right font-medium text-[#111214]">
                        {product.metafields.material}
                      </dd>
                    </div>
                    {product.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex justify-between gap-4 py-2.5"
                      >
                        <dt className="text-[#52525B]">{spec.label}</dt>
                        <dd className="text-right font-medium text-[#111214]">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                {activeTab === 'install' && (
                  <ol className="mt-4 space-y-3.5">
                    {product.installationSteps.map((step) => (
                      <li
                        key={step.step}
                        className="rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] p-3.5"
                      >
                        <p className="text-xs font-semibold text-[#111214]">
                          {String(step.step).padStart(2, '0')}. {step.title}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-[#52525B]">
                          {step.detail}
                        </p>
                      </li>
                    ))}
                  </ol>
                )}

                {activeTab === 'reviews' && (
                  <div className="mt-4 space-y-3.5">
                    {product.reviews.map((rev) => (
                      <article
                        key={rev.id}
                        className="rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] p-4"
                      >
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="font-semibold text-[#111214]">
                            {rev.author}
                          </span>
                          <span className="text-[#52525B]">{rev.date}</span>
                        </div>
                        <p className="mt-0.5 text-[11px] text-[#52525B]">
                          {rev.vehicle} · Verified Owner
                        </p>
                        <p className="mt-2 text-xs font-semibold text-[#111214]">
                          {rev.title}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-[#52525B]">
                          {rev.body}
                        </p>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Hardware Modules */}
        {relatedProducts.length > 0 && (
          <div className="mt-14 border-t border-[#E5E7EB] pt-10">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-[#111214]">
                Compatible Hardware Pairings
              </h2>
              <button
                type="button"
                onClick={onBackToCatalog}
                className="text-xs font-medium text-[#52525B] hover:text-[#111214]"
              >
                View Full Catalog
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((rel) => (
                <button
                  key={rel.id}
                  type="button"
                  onClick={() => onSelectProduct(rel)}
                  className="group flex flex-col overflow-hidden rounded-xl border border-[#E5E7EB] bg-white text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <ResilientImage
                    src={rel.images[0].url}
                    alt={rel.images[0].alt}
                    aspectClass="aspect-[4/3]"
                  />
                  <div className="p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-[#52525B]">
                      {rel.category} · {rel.metafields.installTimeMinutes} min
                    </p>
                    <p className="font-display mt-1 text-sm font-semibold text-[#111214] group-hover:text-[#DC2626]">
                      {rel.title}
                    </p>
                    <p className="mt-2 font-mono text-sm font-semibold tabular-nums text-[#111214]">
                      ${rel.variants[0].price.toFixed(2)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Bottom Buy Bar (≤ 64px height, respecting 15% mobile cap) */}
      <div className="fixed inset-x-0 bottom-0 z-20 flex h-16 items-center justify-between gap-4 border-t border-[#E5E7EB] bg-white/95 px-4 backdrop-blur-sm lg:hidden">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-[#52525B]">
            {activeVariant.title}
          </p>
          <p className="font-mono text-base font-semibold tabular-nums text-[#111214]">
            ${activeVariant.price.toFixed(2)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => handleAddClick(true)}
          className="h-10 rounded-lg bg-[#DC2626] px-5 text-xs font-semibold text-white whitespace-nowrap shrink-0 hover:bg-[#B91C1C]"
        >
          {justAdded ? 'Added' : 'Add to Bag'}
        </button>
      </div>
    </div>
  );
};
