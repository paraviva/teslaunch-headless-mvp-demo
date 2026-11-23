import React from 'react';
import { ArrowUpRight, Plus, Search, SlidersHorizontal } from 'lucide-react';
import {
  ProductCategory,
  ShopifyProduct,
  VehicleModel,
} from '../types/shopify';
import { ResilientImage } from './ResilientImage';

interface CatalogSectionProps {
  products: ShopifyProduct[];
  selectedModel: VehicleModel;
  onSelectModel: (model: VehicleModel) => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc';
  onSortChange: (sort: 'featured' | 'price-asc' | 'price-desc') => void;
  onOpenProduct: (product: ShopifyProduct) => void;
  onQuickAdd: (product: ShopifyProduct) => void;
}

const VEHICLE_TABS: VehicleModel[] = [
  'All',
  'Model 3 Highland',
  'Model Y',
  'Cybertruck',
  'Model S / X',
];

const CATEGORY_TABS: ProductCategory[] = [
  'All',
  'Cockpit Tech',
  'Exterior Aero',
  'Interior Trim',
  'Wheel & Chassis',
];

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  selectedModel,
  onSelectModel,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onOpenProduct,
  onQuickAdd,
}) => {
  return (
    <section
      id="catalog"
      className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col gap-6 border-b border-[#E5E7EB] pb-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-medium text-[#52525B]">
              Verified Fitment Catalog · {products.length} Hardware Modules
            </p>
            <h2 className="font-display mt-1 text-2xl font-semibold tracking-tight text-[#111214] sm:text-3xl">
              Engineered Upgrades by Chassis
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#71717A]" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search SKU, carbon, HUD..."
                aria-label="Search catalog products"
                className="h-10 w-full rounded-lg border border-[#D4D4D8] bg-white pl-9 pr-3 text-sm text-[#111214] placeholder:text-[#71717A] focus:border-[#111214] focus:outline-none"
              />
            </div>

            <div className="relative flex items-center">
              <SlidersHorizontal className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-[#52525B]" />
              <select
                value={sortBy}
                onChange={(e) =>
                  onSortChange(
                    e.target.value as 'featured' | 'price-asc' | 'price-desc'
                  )
                }
                aria-label="Sort products"
                className="h-10 appearance-none rounded-lg border border-[#D4D4D8] bg-white pl-8 pr-8 text-sm font-medium text-[#111214] focus:border-[#111214] focus:outline-none"
              >
                <option value="featured">Featured Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="tablist"
            aria-label="Filter by Tesla Vehicle Model"
            className="flex flex-wrap items-center gap-1 rounded-lg bg-[#F3F4F6] p-1"
          >
            {VEHICLE_TABS.map((model) => {
              const active = selectedModel === model;
              return (
                <button
                  key={model}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onSelectModel(model)}
                  className={`h-8 rounded-md px-3 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DC2626] ${
                    active
                      ? 'bg-white text-[#111214] shadow-xs'
                      : 'text-[#52525B] hover:text-[#111214]'
                  }`}
                >
                  {model === 'All' ? 'All Models' : model}
                </button>
              );
            })}
          </div>

          <div
            role="tablist"
            aria-label="Filter by Hardware Category"
            className="flex flex-wrap items-center gap-1"
          >
            {CATEGORY_TABS.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onSelectCategory(cat)}
                  className={`h-8 rounded-md px-3 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DC2626] ${
                    active
                      ? 'bg-[#111214] text-white'
                      : 'text-[#52525B] hover:bg-[#F3F4F6] hover:text-[#111214]'
                  }`}
                >
                  {cat === 'All' ? 'All Categories' : cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="mt-10 rounded-xl border border-[#E5E7EB] bg-white px-6 py-14 text-center">
          <p className="font-display text-lg font-semibold text-[#111214]">
            No matching hardware modules found
          </p>
          <p className="mt-1 text-sm text-[#52525B]">
            Try clearing your search query or switching to All Models.
          </p>
          <button
            type="button"
            onClick={() => {
              onSelectModel('All');
              onSelectCategory('All');
              onSearchChange('');
            }}
            className="mt-5 inline-flex h-10 items-center rounded-lg bg-[#111214] px-4 text-sm font-medium text-white transition-colors hover:bg-[#27272A]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {products.map((product) => {
            const defaultVariant = product.variants[0];
            const discountPercent = defaultVariant.compareAtPrice
              ? Math.round(
                  ((defaultVariant.compareAtPrice - defaultVariant.price) /
                    defaultVariant.compareAtPrice) *
                    100
                )
              : 0;

            return (
              <article
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-[#E5E7EB] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => onOpenProduct(product)}
                  className="relative block w-full text-left focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#DC2626]"
                >
                  <ResilientImage
                    src={product.images[0].url}
                    alt={product.images[0].alt}
                    aspectClass="aspect-[4/3]"
                    className="group-hover:[&_img]:scale-[1.03]"
                  />
                </button>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-[#52525B]">
                      <span className="truncate font-medium uppercase tracking-wider">
                        {product.category} · {product.metafields.installTimeMinutes} min install
                      </span>
                      <span className="shrink-0 font-medium text-[#111214]">
                        {product.availabilityNote}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenProduct(product)}
                      className="mt-2 block text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DC2626]"
                    >
                      <h3 className="font-display text-base font-semibold leading-snug text-[#111214] transition-colors group-hover:text-[#DC2626]">
                        {product.title}
                      </h3>
                    </button>

                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[#52525B]">
                      {product.tagline}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#F1F2F4] pt-4">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-base font-semibold tabular-nums text-[#111214]">
                        ${defaultVariant.price.toFixed(2)}
                      </span>
                      {defaultVariant.compareAtPrice && (
                        <span className="font-mono text-xs tabular-nums text-[#71717A] line-through">
                          ${defaultVariant.compareAtPrice.toFixed(2)}
                        </span>
                      )}
                      {discountPercent > 0 && (
                        <span className="font-mono text-xs font-medium tabular-nums text-[#DC2626]">
                          -{discountPercent}%
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onQuickAdd(product)}
                        aria-label={`Quick add ${product.title} to bag`}
                        className="inline-flex h-9 items-center gap-1 rounded-lg border border-[#D4D4D8] bg-white px-3 text-xs font-semibold text-[#111214] whitespace-nowrap shrink-0 transition-colors hover:border-[#111214] hover:bg-[#111214] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DC2626]"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Quick Add</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenProduct(product)}
                        aria-label={`View details for ${product.title}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3F4F6] text-[#111214] transition-colors hover:bg-[#E5E7EB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111214]"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
