import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  Cpu,
  Disc,
  Layers,
  ShieldCheck,
  Sparkles,
  Sun,
  Tent,
  Wifi,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import {
  BLOG_SUBMENU_LINKS,
  MEGA_MENU_COLLECTIONS,
  MEGA_MENU_MODELS,
  MEGA_MENU_SUPPORTS,
  MegaModelCategoryGroup,
} from '../data/megaMenuData';
import { ProductCategory, VehicleModel } from '../types/shopify';

export type MegaMenuKey = 'models' | 'collections' | 'supports' | 'blogs' | null;

interface MegaMenuProps {
  activeMenu: MegaMenuKey;
  onClose: () => void;
  onMouseEnterMenu: () => void;
  onMouseLeaveMenu: () => void;
  onSelectModel: (model: VehicleModel) => void;
  onSelectCategory: (category: ProductCategory) => void;
  onOpenProductByHandle: (handle: string) => void;
  onScrollToSection: (anchor: string) => void;
  onTriggerAction: (action: 'track' | 'architecture' | 'catalog' | 'deals', label: string) => void;
}

const CategoryMicroThumb: React.FC<{ kind: MegaModelCategoryGroup['thumbnailKind'] }> = ({
  kind,
}) => {
  const iconClass = 'h-3.5 w-3.5 text-[#111214]';
  switch (kind) {
    case 'ppf':
      return <ShieldCheck className={iconClass} strokeWidth={1.75} />;
    case 'wheel':
      return <Disc className={iconClass} strokeWidth={1.75} />;
    case 'screen':
      return <Cpu className={iconClass} strokeWidth={1.75} />;
    case 'spoiler':
      return <Layers className={iconClass} strokeWidth={1.75} />;
    case 'light':
      return <Sparkles className={iconClass} strokeWidth={1.75} />;
    case 'charger':
      return <Zap className={iconClass} strokeWidth={1.75} />;
    case 'camping':
      return <Tent className={iconClass} strokeWidth={1.75} />;
    case 'starlink':
      return <Wifi className={iconClass} strokeWidth={1.75} />;
    default:
      return <Sun className={iconClass} strokeWidth={1.75} />;
  }
};

export const MegaMenu: React.FC<MegaMenuProps> = ({
  activeMenu,
  onClose,
  onMouseEnterMenu,
  onMouseLeaveMenu,
  onSelectModel,
  onSelectCategory,
  onOpenProductByHandle,
  onScrollToSection,
  onTriggerAction,
}) => {
  const [selectedModelTabId, setSelectedModelTabId] = useState<string>(
    MEGA_MENU_MODELS[0].id
  );
  const [selectedCollectionTabId, setSelectedCollectionTabId] = useState<string>(
    MEGA_MENU_COLLECTIONS[0].id
  );

  useEffect(() => {
    if (!activeMenu) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMenu, onClose]);

  if (!activeMenu) return null;

  const activeModelEntry =
    MEGA_MENU_MODELS.find((m) => m.id === selectedModelTabId) ||
    MEGA_MENU_MODELS[0];

  const activeCollectionEntry =
    MEGA_MENU_COLLECTIONS.find((c) => c.id === selectedCollectionTabId) ||
    MEGA_MENU_COLLECTIONS[0];

  // Compact disclosure panel for Blogs
  if (activeMenu === 'blogs') {
    return (
      <div
        className="hidden lg:block absolute inset-x-0 top-full z-40"
        data-tl-blogs-dropdown
      >
        <div
          className="absolute inset-x-0 top-0 h-screen bg-black/15"
          onClick={onClose}
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto flex max-w-[1440px] justify-center px-6 lg:px-8 pointer-events-none">
          <div
            className="pointer-events-auto w-72 translate-x-28 rounded-b-xl border border-t-0 border-[#E5E7EB] bg-white p-2 shadow-xl"
            onMouseEnter={onMouseEnterMenu}
            onMouseLeave={onMouseLeaveMenu}
          >
            <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#71717A]">
              Editorial & Install Guides
            </p>
            <ul className="space-y-0.5">
              {BLOG_SUBMENU_LINKS.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => {
                      if (item.productHandle) {
                        onOpenProductByHandle(item.productHandle);
                      } else {
                        onSelectCategory(item.mappedCategory);
                      }
                      onClose();
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[#3F3F46] transition-colors hover:bg-[#F3F4F6] hover:text-[#111214]"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#A1A1AA]" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="hidden lg:block absolute inset-x-0 top-full z-40"
      role="region"
      aria-label="Storefront Mega Menu"
      data-tl-mega-container={activeMenu}
    >
      {/* Click-outside backdrop aligned flush under header */}
      <div
        className="absolute inset-x-0 top-0 h-screen bg-black/20"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="relative z-10 border-b border-[#E5E7EB] bg-white shadow-xl"
        onMouseEnter={onMouseEnterMenu}
        onMouseLeave={onMouseLeaveMenu}
      >
        <div className="mx-auto max-w-[1440px] px-6 py-5 lg:px-8">
        {/* Subtle header strip with close button */}
        <div className="mb-4 flex items-center justify-between border-b border-[#F1F2F4] pb-2.5">
          <p className="text-xs font-medium text-[#52525B]">
            {activeMenu === 'models' &&
              'Shop by Models · 5-Column Fitment Taxonomy (Lazy-Mounted)'}
            {activeMenu === 'collections' &&
              'Collections · 13 Hardware Categories & 5-Column Card Grid'}
            {activeMenu === 'supports' &&
              'Supports · Customer Service, Policy & Architecture'}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close mega menu"
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[#52525B] transition-colors hover:bg-[#F3F4F6] hover:text-[#111214]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* 1. SHOP BY MODELS (tl-mega-mdl — 8 platform tabs + 5-column category matrix) */}
        {activeMenu === 'models' && (
          <div className="flex gap-7" data-tl-models-mega="tl-mega-mdl">
            {/* Left Tabs */}
            <div
              role="tablist"
              aria-label="Shop by Models"
              data-tl-class="tl-mega-mdl__nav"
              className="flex w-60 shrink-0 flex-col gap-1 border-r border-[#E5E7EB] pr-5"
            >
              {MEGA_MENU_MODELS.map((entry) => {
                const isSelected = entry.id === activeModelEntry.id;
                return (
                  <button
                    key={entry.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    data-tl-mega-tab={entry.id}
                    onMouseEnter={() => setSelectedModelTabId(entry.id)}
                    onClick={() => setSelectedModelTabId(entry.id)}
                    className={`flex items-center justify-between rounded-lg px-3.5 py-2.5 text-left text-sm font-medium transition-colors ${
                      isSelected
                        ? 'bg-[#111214] text-white'
                        : 'text-[#3F3F46] hover:bg-[#F3F4F6] hover:text-[#111214]'
                    }`}
                  >
                    <span className="truncate">{entry.label}</span>
                    <ChevronRight className="h-4 w-4 shrink-0 opacity-70" />
                  </button>
                );
              })}
            </div>

            {/* Right 5-Column Panel */}
            <div
              role="tabpanel"
              aria-label={activeModelEntry.label}
              data-tl-mega-panel={activeModelEntry.id}
              className="flex-1 min-w-0"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#F1F2F4] pb-3">
                <div className="flex items-baseline gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectModel(activeModelEntry.filterModel);
                      onClose();
                    }}
                    className="font-display text-lg font-bold tracking-tight text-[#111214] hover:text-[#DC2626]"
                  >
                    {activeModelEntry.label}
                  </button>
                  <span className="font-mono text-xs text-[#71717A]">
                    {activeModelEntry.years}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onOpenProductByHandle(activeModelEntry.featuredHandle);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#111214] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#27272A]"
                  >
                    <span>New Arrivals</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectModel(activeModelEntry.filterModel);
                      onClose();
                    }}
                    className="inline-flex items-center rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3.5 py-1.5 text-xs font-semibold text-[#111214] transition-colors hover:border-[#111214]"
                  >
                    View All
                  </button>
                </div>
              </div>

              <div
                className="grid max-h-[60vh] grid-cols-3 gap-x-5 gap-y-6 overflow-y-auto pr-2 xl:grid-cols-5"
                data-tl-class="tl-mega-mdl__cats"
              >
                {activeModelEntry.categories.map((group) => (
                  <div key={group.title} data-tl-class="tl-mega-mdl__cat">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectCategory(group.mappedCategory);
                        onClose();
                      }}
                      className="group flex w-full items-center gap-2 text-left"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[#E5E7EB] bg-[#F9FAFB] transition-colors group-hover:border-[#111214]">
                        <CategoryMicroThumb kind={group.thumbnailKind} />
                      </span>
                      <span className="text-xs font-bold leading-snug text-[#111214] group-hover:text-[#DC2626]">
                        {group.title}
                      </span>
                    </button>

                    <ul className="mt-2.5 space-y-1.5 pl-8">
                      {group.links.map((link) => (
                        <li key={link.label}>
                          <button
                            type="button"
                            onClick={() => {
                              if (link.productHandle) {
                                onOpenProductByHandle(link.productHandle);
                              } else if (link.mappedCategory) {
                                onSelectCategory(link.mappedCategory);
                              } else {
                                onSelectModel(activeModelEntry.filterModel);
                              }
                              onClose();
                            }}
                            className="text-left text-xs leading-snug text-[#52525B] transition-colors hover:text-[#DC2626]"
                          >
                            {link.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. COLLECTIONS MEGA MENU (tl-collections-mega — 13 tabs + 5-column visual card grid) */}
        {activeMenu === 'collections' && (
          <div className="flex gap-7" data-tl-collections-mega="tl-mega-col">
            <div
              role="tablist"
              aria-label="Collections"
              data-tl-class="tl-mega-col__nav"
              className="flex max-h-[62vh] w-64 shrink-0 flex-col gap-0.5 overflow-y-auto border-r border-[#E5E7EB] pr-4"
            >
              {MEGA_MENU_COLLECTIONS.map((col) => {
                const isSelected = col.id === activeCollectionEntry.id;
                return (
                  <button
                    key={col.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    data-tl-mega-tab={col.id}
                    onMouseEnter={() => setSelectedCollectionTabId(col.id)}
                    onClick={() => setSelectedCollectionTabId(col.id)}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors ${
                      isSelected
                        ? 'bg-[#111214] text-white'
                        : 'text-[#3F3F46] hover:bg-[#F3F4F6] hover:text-[#111214]'
                    }`}
                  >
                    <span className="truncate">{col.label}</span>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-70" />
                  </button>
                );
              })}
            </div>

            <div
              role="tabpanel"
              aria-label={activeCollectionEntry.label}
              data-tl-mega-panel={activeCollectionEntry.id}
              className="flex-1 min-w-0"
            >
              <div className="mb-4 flex items-center justify-between border-b border-[#F1F2F4] pb-3">
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory(activeCollectionEntry.mappedCategory);
                    onClose();
                  }}
                  className="font-display text-lg font-bold tracking-tight text-[#111214] hover:text-[#DC2626]"
                >
                  {activeCollectionEntry.label}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory(activeCollectionEntry.mappedCategory);
                    onClose();
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111214] hover:text-[#DC2626]"
                >
                  <span>Browse category ({activeCollectionEntry.cards.length})</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div
                className="grid max-h-[58vh] grid-cols-3 gap-4 overflow-y-auto pr-2 xl:grid-cols-5"
                data-tl-class="tl-mega-col__grid"
              >
                {activeCollectionEntry.cards.map((card) => (
                  <button
                    key={card.title}
                    type="button"
                    data-tl-class="tl-mega-col__card"
                    onClick={() => {
                      if (card.productHandle) {
                        onOpenProductByHandle(card.productHandle);
                      } else {
                        onSelectCategory(card.mappedCategory);
                      }
                      onClose();
                    }}
                    className="group flex flex-col overflow-hidden rounded-xl border border-[#E5E7EB] bg-white text-left transition-all duration-150 hover:border-[#111214] hover:shadow-sm"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4F5F7]">
                      {card.localThumb ? (
                        <img
                          src={card.localThumb}
                          alt={card.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-[#F9FAFB] to-[#ECEEF2] p-3">
                          <Wrench className="h-5 w-5 text-[#71717A]" strokeWidth={1.5} />
                          <span className="font-mono text-[10px] font-semibold tracking-wider text-[#52525B]">
                            {card.badgeCode}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                      <span className="truncate text-xs font-semibold text-[#111214] group-hover:text-[#DC2626]">
                        {card.title}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#A1A1AA] transition-transform group-hover:translate-x-0.5 group-hover:text-[#DC2626]" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. SUPPORTS MEGA MENU (tl-mega-supp — 4-column link matrix) */}
        {activeMenu === 'supports' && (
          <div
            className="grid grid-cols-4 gap-8 py-2"
            data-tl-supports-mega="tl-mega-supp"
          >
            {MEGA_MENU_SUPPORTS.map((col) => (
              <div key={col.title} data-tl-class="tl-mega-supp__col">
                <p className="border-b border-[#E5E7EB] pb-2.5 text-xs font-bold uppercase tracking-wider text-[#111214]">
                  {col.title}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {col.links.map((item) => (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={() => {
                          if (item.productHandle) {
                            onOpenProductByHandle(item.productHandle);
                          } else if (item.action) {
                            onTriggerAction(item.action, item.label);
                          } else if (item.anchor) {
                            onScrollToSection(item.anchor);
                          }
                          onClose();
                        }}
                        className="group flex w-full items-center justify-between text-left text-sm text-[#52525B] transition-colors hover:text-[#DC2626]"
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};
