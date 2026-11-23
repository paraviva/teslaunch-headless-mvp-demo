import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from 'lucide-react';
import { STOREFRONT_PRODUCTS } from '../data/catalog';
import {
  BLOG_SUBMENU_LINKS,
  MEGA_MENU_COLLECTIONS,
  MEGA_MENU_MODELS,
  MEGA_MENU_SUPPORTS,
  TRENDING_SEARCH_TERMS,
} from '../data/megaMenuData';
import { ProductCategory, VehicleModel } from '../types/shopify';
import { MegaMenu, MegaMenuKey } from './MegaMenu';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigateHome: () => void;
  onSelectModelNav: (model: VehicleModel) => void;
  onSelectCategoryNav: (category: ProductCategory) => void;
  onOpenProductByHandle: (handle: string) => void;
  onScrollToSection: (anchor: string) => void;
  onSearchCatalog: (query: string) => void;
  onTriggerAction: (
    action: 'track' | 'architecture' | 'catalog' | 'deals',
    label: string
  ) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onNavigateHome,
  onSelectModelNav,
  onSelectCategoryNav,
  onOpenProductByHandle,
  onScrollToSection,
  onSearchCatalog,
  onTriggerAction,
}) => {
  const [showPromo, setShowPromo] = useState(true);
  const [activeMenu, setActiveMenu] = useState<MegaMenuKey>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<
    'models' | 'collections' | 'supports' | 'blogs' | null
  >('models');
  const [expandedMobileModelId, setExpandedMobileModelId] = useState<
    string | null
  >(MEGA_MENU_MODELS[0].id);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchDraft, setSearchDraft] = useState('');
  const [accountOpen, setAccountOpen] = useState(false);

  const hoverCloseTimerRef = useRef<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const clearHoverTimer = () => {
    if (hoverCloseTimerRef.current !== null) {
      window.clearTimeout(hoverCloseTimerRef.current);
      hoverCloseTimerRef.current = null;
    }
  };

  const openMenuOnHover = (key: Exclude<MegaMenuKey, null>) => {
    clearHoverTimer();
    setAccountOpen(false);
    setSearchOpen(false);
    setActiveMenu(key);
  };

  const scheduleCloseMenu = () => {
    clearHoverTimer();
    hoverCloseTimerRef.current = window.setTimeout(() => {
      setActiveMenu(null);
    }, 140);
  };

  useEffect(() => {
    return () => clearHoverTimer();
  }, []);

  useEffect(() => {
    if (searchOpen) {
      window.setTimeout(() => searchInputRef.current?.focus(), 40);
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!mobileMenuOpen && !searchOpen && !accountOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setSearchOpen(false);
        setAccountOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen, searchOpen, accountOpen]);

  const liveSearchMatches = searchDraft.trim()
    ? STOREFRONT_PRODUCTS.filter((p) => {
        const q = searchDraft.trim().toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.metafields.fitmentYears.some((y) => y.toLowerCase().includes(q))
        );
      }).slice(0, 4)
    : [];

  return (
    <>
      {showPromo && (
        <div className="relative flex h-9 items-center justify-center bg-[#111214] px-10 text-xs font-medium text-[#E4E4E7]">
          <p className="truncate text-center">
            Complimentary Express Shipping Over $199
            <span className="mx-2 text-[#71717A]" aria-hidden="true">
              ·
            </span>
            Early BFCM Code:{' '}
            <span className="font-mono font-semibold text-white">BFCM15</span>
          </p>
          <button
            type="button"
            onClick={() => setShowPromo(false)}
            aria-label="Dismiss announcement"
            className="absolute right-3 flex h-7 w-7 items-center justify-center rounded text-[#A1A1AA] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <header
        className="sticky top-0 z-40 border-b border-[#E5E7EB] bg-white/95 backdrop-blur-sm"
        data-tl-section="header-navigation-compact"
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Brand + Mobile Menu Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setActiveMenu(null);
                setSearchOpen(false);
                setMobileMenuOpen((v) => !v);
              }}
              aria-label="Open mobile navigation drawer"
              aria-expanded={mobileMenuOpen}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[#111214] hover:bg-[#F3F4F6] lg:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveMenu(null);
                setMobileMenuOpen(false);
                setSearchOpen(false);
                onNavigateHome();
              }}
              className="font-display text-lg font-bold tracking-tight text-[#111214] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#DC2626]"
            >
              TESLAUNCH
            </button>
          </div>

          {/* Zone 2: Exact 5 Top-Level Links (>=1024px) */}
          <nav
            aria-label="Primary Storefront Navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#52525B]"
            onMouseLeave={scheduleCloseMenu}
          >
            <button
              type="button"
              onMouseEnter={() => openMenuOnHover('models')}
              onClick={() =>
                setActiveMenu((prev) => (prev === 'models' ? null : 'models'))
              }
              aria-expanded={activeMenu === 'models'}
              className={`inline-flex items-center gap-1 py-5 whitespace-nowrap shrink-0 transition-colors hover:text-[#111214] ${
                activeMenu === 'models' ? 'text-[#111214]' : ''
              }`}
            >
              <span>Shop by Models</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-150 ${
                  activeMenu === 'models' ? 'rotate-180' : ''
                }`}
              />
            </button>

            <button
              type="button"
              onMouseEnter={() => openMenuOnHover('collections')}
              onClick={() =>
                setActiveMenu((prev) =>
                  prev === 'collections' ? null : 'collections'
                )
              }
              aria-expanded={activeMenu === 'collections'}
              className={`inline-flex items-center gap-1 py-5 whitespace-nowrap shrink-0 transition-colors hover:text-[#111214] ${
                activeMenu === 'collections' ? 'text-[#111214]' : ''
              }`}
            >
              <span>Collections</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-150 ${
                  activeMenu === 'collections' ? 'rotate-180' : ''
                }`}
              />
            </button>

            <button
              type="button"
              onMouseEnter={() => {
                clearHoverTimer();
                setActiveMenu(null);
              }}
              onClick={() => {
                setActiveMenu(null);
                onTriggerAction('deals', 'Early BFCM Deals');
              }}
              className="py-5 whitespace-nowrap shrink-0 transition-colors hover:text-[#DC2626]"
            >
              Deals
            </button>

            <button
              type="button"
              onMouseEnter={() => openMenuOnHover('supports')}
              onClick={() =>
                setActiveMenu((prev) =>
                  prev === 'supports' ? null : 'supports'
                )
              }
              aria-expanded={activeMenu === 'supports'}
              className={`inline-flex items-center gap-1 py-5 whitespace-nowrap shrink-0 transition-colors hover:text-[#111214] ${
                activeMenu === 'supports' ? 'text-[#111214]' : ''
              }`}
            >
              <span>Supports</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-150 ${
                  activeMenu === 'supports' ? 'rotate-180' : ''
                }`}
              />
            </button>

            <button
              type="button"
              onMouseEnter={() => openMenuOnHover('blogs')}
              onClick={() =>
                setActiveMenu((prev) => (prev === 'blogs' ? null : 'blogs'))
              }
              aria-expanded={activeMenu === 'blogs'}
              className={`inline-flex items-center gap-1 py-5 whitespace-nowrap shrink-0 transition-colors hover:text-[#111214] ${
                activeMenu === 'blogs' ? 'text-[#111214]' : ''
              }`}
            >
              <span>Blogs</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-150 ${
                  activeMenu === 'blogs' ? 'rotate-180' : ''
                }`}
              />
            </button>
          </nav>

          {/* Zone 3: Search / Account / Bag Actions */}
          <div className="relative flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setActiveMenu(null);
                setAccountOpen(false);
                setSearchOpen((v) => !v);
              }}
              aria-label="Search storefront catalog"
              aria-expanded={searchOpen}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[#3F3F46] transition-colors hover:bg-[#F3F4F6] hover:text-[#111214]"
            >
              {searchOpen ? (
                <X className="h-4 w-4" strokeWidth={1.75} />
              ) : (
                <Search className="h-4 w-4" strokeWidth={1.75} />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveMenu(null);
                setSearchOpen(false);
                setAccountOpen((v) => !v);
              }}
              aria-label="Account and order lookup"
              aria-expanded={accountOpen}
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg text-[#3F3F46] transition-colors hover:bg-[#F3F4F6] hover:text-[#111214]"
            >
              <User className="h-4 w-4" strokeWidth={1.75} />
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveMenu(null);
                setSearchOpen(false);
                setAccountOpen(false);
                onOpenCart();
              }}
              aria-label={`Open shopping bag, ${cartCount} items`}
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#111214] px-3.5 text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#27272A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DC2626]"
            >
              <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.75} />
              <span>Bag</span>
              <span className="font-mono text-xs tabular-nums text-[#E4E4E7]">
                ({cartCount})
              </span>
            </button>

            {/* Compact Account Popover (Lazy-mounted) */}
            {accountOpen && (
              <div className="absolute right-0 top-12 z-50 w-72 rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-[#F1F2F4] pb-2.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#111214]">
                    Customer Account
                  </p>
                  <button
                    type="button"
                    onClick={() => setAccountOpen(false)}
                    aria-label="Close account popover"
                    className="text-[#71717A] hover:text-[#111214]"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#52525B]">
                  Headless Storefront API session preview. Customer OAuth &
                  Shopify Order Status routes connect here.
                </p>
                <div className="mt-3 flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setAccountOpen(false);
                      onTriggerAction('track', 'Track Your Order');
                    }}
                    className="flex w-full items-center justify-between rounded-lg border border-[#E5E7EB] px-3 py-2 text-xs font-semibold text-[#111214] hover:border-[#111214]"
                  >
                    <span>Track Shipment Status</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAccountOpen(false);
                      onOpenCart();
                    }}
                    className="flex w-full items-center justify-between rounded-lg bg-[#111214] px-3 py-2 text-xs font-semibold text-white hover:bg-[#27272A]"
                  >
                    <span>View Saved Bag ({cartCount})</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Predictive Search Modal Overlay (Lazy-mounted) */}
        {searchOpen && (
          <div className="border-t border-[#E5E7EB] bg-white shadow-lg">
            <div className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSearchCatalog(searchDraft);
                  setSearchOpen(false);
                }}
                className="flex items-center gap-3 border-b border-[#111214] pb-3"
              >
                <Search className="h-5 w-5 text-[#52525B]" />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchDraft}
                  onChange={(e) => setSearchDraft(e.target.value)}
                  placeholder="Search Model Y Juniper PPF, 8.6-inch rear screen, spoilers..."
                  className="w-full bg-transparent text-base text-[#111214] placeholder:text-[#A1A1AA] focus:outline-none"
                />
                {searchDraft && (
                  <button
                    type="button"
                    onClick={() => setSearchDraft('')}
                    className="text-xs font-medium text-[#71717A] hover:text-[#111214]"
                  >
                    Clear
                  </button>
                )}
              </form>

              <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-12">
                <div className="md:col-span-5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#71717A]">
                    Search Trending
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {TRENDING_SEARCH_TERMS.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          setSearchDraft(term);
                          onSearchCatalog(term);
                          setSearchOpen(false);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-1.5 text-xs font-medium text-[#111214] transition-colors hover:border-[#111214]"
                      >
                        <Search className="h-3 w-3 text-[#71717A]" />
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-7">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#71717A]">
                    {searchDraft.trim()
                      ? `Instant Matches (${liveSearchMatches.length})`
                      : 'Flagship Hardware'}
                  </p>
                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {(searchDraft.trim()
                      ? liveSearchMatches
                      : STOREFRONT_PRODUCTS.slice(0, 4)
                    ).map((prod) => (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => {
                          onOpenProductByHandle(prod.handle);
                          setSearchOpen(false);
                        }}
                        className="flex items-center gap-3 rounded-lg border border-[#E5E7EB] p-2 text-left transition-colors hover:border-[#111214]"
                      >
                        <img
                          src={prod.images[0].url}
                          alt={prod.title}
                          className="h-12 w-16 shrink-0 rounded object-cover bg-[#F4F5F7]"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-[#111214]">
                            {prod.title}
                          </p>
                          <p className="mt-0.5 font-mono text-xs text-[#52525B]">
                            ${prod.variants[0].price.toFixed(2)}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Desktop Lazy-Mounted Mega Menu (>=1024px) anchored at header bottom */}
        <MegaMenu
          activeMenu={activeMenu}
          onClose={() => setActiveMenu(null)}
          onMouseEnterMenu={clearHoverTimer}
          onMouseLeaveMenu={scheduleCloseMenu}
          onSelectModel={onSelectModelNav}
          onSelectCategory={onSelectCategoryNav}
          onOpenProductByHandle={onOpenProductByHandle}
          onScrollToSection={onScrollToSection}
          onTriggerAction={onTriggerAction}
        />
      </header>

      {/* Mobile Slide-In Off-Canvas Drawer with Accordions (<1024px) */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
        >
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative z-10 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex h-16 items-center justify-between border-b border-[#E5E7EB] px-5">
              <span className="font-display text-base font-bold tracking-tight text-[#111214]">
                TESLAUNCH MENU
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close mobile drawer"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#52525B] hover:bg-[#F3F4F6] hover:text-[#111214]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
              {/* Accordion 1: Shop by Models */}
              <div className="rounded-xl border border-[#E5E7EB]">
                <button
                  type="button"
                  onClick={() =>
                    setMobileAccordion((prev) =>
                      prev === 'models' ? null : 'models'
                    )
                  }
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-[#111214]"
                >
                  <span>Shop by Models</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      mobileAccordion === 'models' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {mobileAccordion === 'models' && (
                  <div className="border-t border-[#E5E7EB] bg-[#FAFAFA] px-3 py-2 space-y-1.5">
                    {MEGA_MENU_MODELS.map((model) => {
                      const isExpanded = expandedMobileModelId === model.id;
                      return (
                        <div
                          key={model.id}
                          className="rounded-lg bg-white border border-[#E5E7EB]"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedMobileModelId((prev) =>
                                prev === model.id ? null : model.id
                              )
                            }
                            className="flex w-full items-center justify-between px-3 py-2.5 text-left text-xs font-semibold text-[#111214]"
                          >
                            <span>{model.label}</span>
                            <ChevronDown
                              className={`h-3.5 w-3.5 text-[#71717A] transition-transform ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          {isExpanded && (
                            <div className="border-t border-[#F1F2F4] px-3 py-2 space-y-2">
                              <button
                                type="button"
                                onClick={() => {
                                  onSelectModelNav(model.filterModel);
                                  setMobileMenuOpen(false);
                                }}
                                className="inline-flex items-center gap-1 text-xs font-semibold text-[#DC2626]"
                              >
                                <span>View All {model.label}</span>
                                <ArrowRight className="h-3 w-3" />
                              </button>
                              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                                {model.categories.slice(0, 6).map((cat) => (
                                  <button
                                    key={cat.title}
                                    type="button"
                                    onClick={() => {
                                      onSelectCategoryNav(cat.mappedCategory);
                                      setMobileMenuOpen(false);
                                    }}
                                    className="truncate text-left text-xs text-[#52525B] hover:text-[#111214]"
                                  >
                                    {cat.title}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Accordion 2: Collections */}
              <div className="rounded-xl border border-[#E5E7EB]">
                <button
                  type="button"
                  onClick={() =>
                    setMobileAccordion((prev) =>
                      prev === 'collections' ? null : 'collections'
                    )
                  }
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-[#111214]"
                >
                  <span>Collections</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      mobileAccordion === 'collections' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {mobileAccordion === 'collections' && (
                  <div className="border-t border-[#E5E7EB] bg-[#FAFAFA] px-4 py-2.5 grid grid-cols-1 gap-1.5">
                    {MEGA_MENU_COLLECTIONS.map((col) => (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => {
                          onSelectCategoryNav(col.mappedCategory);
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-left text-xs font-medium text-[#3F3F46] border border-[#E5E7EB]"
                      >
                        <span>{col.label}</span>
                        <span className="font-mono text-[10px] text-[#71717A]">
                          {col.cards.length}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Direct Link: Deals */}
              <button
                type="button"
                onClick={() => {
                  onTriggerAction('deals', 'Early BFCM Deals');
                  setMobileMenuOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-xl border border-[#E5E7EB] px-4 py-3 text-left text-sm font-semibold text-[#DC2626]"
              >
                <span>Deals</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              {/* Accordion 3: Supports */}
              <div className="rounded-xl border border-[#E5E7EB]">
                <button
                  type="button"
                  onClick={() =>
                    setMobileAccordion((prev) =>
                      prev === 'supports' ? null : 'supports'
                    )
                  }
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-[#111214]"
                >
                  <span>Supports</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      mobileAccordion === 'supports' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {mobileAccordion === 'supports' && (
                  <div className="border-t border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3 space-y-3">
                    {MEGA_MENU_SUPPORTS.map((col) => (
                      <div key={col.title}>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-[#71717A]">
                          {col.title}
                        </p>
                        <ul className="mt-1.5 space-y-1.5">
                          {col.links.map((link) => (
                            <li key={link.label}>
                              <button
                                type="button"
                                onClick={() => {
                                  if (link.productHandle) {
                                    onOpenProductByHandle(link.productHandle);
                                  } else if (link.action) {
                                    onTriggerAction(link.action, link.label);
                                  } else if (link.anchor) {
                                    onScrollToSection(link.anchor);
                                  }
                                  setMobileMenuOpen(false);
                                }}
                                className="text-xs text-[#3F3F46] hover:text-[#111214]"
                              >
                                {link.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion 4: Blogs */}
              <div className="rounded-xl border border-[#E5E7EB]">
                <button
                  type="button"
                  onClick={() =>
                    setMobileAccordion((prev) =>
                      prev === 'blogs' ? null : 'blogs'
                    )
                  }
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-[#111214]"
                >
                  <span>Blogs</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      mobileAccordion === 'blogs' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {mobileAccordion === 'blogs' && (
                  <div className="border-t border-[#E5E7EB] bg-[#FAFAFA] px-4 py-2 space-y-1.5">
                    {BLOG_SUBMENU_LINKS.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => {
                          if (item.productHandle) {
                            onOpenProductByHandle(item.productHandle);
                          } else {
                            onSelectCategoryNav(item.mappedCategory);
                          }
                          setMobileMenuOpen(false);
                        }}
                        className="block w-full py-1.5 text-left text-xs text-[#3F3F46] hover:text-[#111214]"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
