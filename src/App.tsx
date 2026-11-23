import { useEffect, useMemo, useState } from 'react';
import { CartDrawer } from './components/CartDrawer';
import { CatalogSection } from './components/CatalogSection';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductDetailView } from './components/ProductDetailView';
import { STOREFRONT_PRODUCTS } from './data/catalog';
import {
  CartLineItem,
  ProductCategory,
  ProductVariant,
  ShopifyProduct,
  VehicleModel,
} from './types/shopify';

const CART_STORAGE_KEY = 'teslaunch_headless_cart_v1';

export default function App() {
  const [selectedModel, setSelectedModel] = useState<VehicleModel>('All');
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>(
    'featured'
  );
  const [activeProduct, setActiveProduct] = useState<ShopifyProduct | null>(
    null
  );
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState<CartLineItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartLineItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage quota issues in restricted environments
    }
  }, [cartItems]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = STOREFRONT_PRODUCTS.filter((product) => {
      const matchesModel =
        selectedModel === 'All' ||
        product.metafields.compatibleModels.includes(selectedModel);

      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      const matchesQuery =
        !query ||
        product.title.toLowerCase().includes(query) ||
        product.tagline.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.variants.some((v) => v.sku.toLowerCase().includes(query));

      return matchesModel && matchesCategory && matchesQuery;
    });

    if (sortBy === 'price-asc') {
      return [...filtered].sort(
        (a, b) => a.variants[0].price - b.variants[0].price
      );
    }
    if (sortBy === 'price-desc') {
      return [...filtered].sort(
        (a, b) => b.variants[0].price - b.variants[0].price
      );
    }
    return filtered;
  }, [selectedModel, selectedCategory, searchQuery, sortBy]);

  const relatedProducts = useMemo(() => {
    if (!activeProduct) return [];
    return STOREFRONT_PRODUCTS.filter((p) => p.id !== activeProduct.id).slice(
      0,
      3
    );
  }, [activeProduct]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const handleOpenProduct = (product: ShopifyProduct) => {
    setActiveProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProductByHandle = (handle: string) => {
    const found = STOREFRONT_PRODUCTS.find((p) => p.handle === handle);
    if (found) {
      handleOpenProduct(found);
    }
  };

  const handleNavigateHome = () => {
    setActiveProduct(null);
    setSelectedModel('All');
    setSelectedCategory('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSection = (anchor: string) => {
    setActiveProduct(null);
    const id = anchor.replace(/^#/, '');
    window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleSelectModelNav = (model: VehicleModel) => {
    setActiveProduct(null);
    setSelectedModel(model);
    setSelectedCategory('All');
    window.setTimeout(() => {
      const el = document.getElementById('catalog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 40);
  };

  const handleSelectCategoryNav = (category: ProductCategory) => {
    setActiveProduct(null);
    setSelectedCategory(category);
    setSelectedModel('All');
    window.setTimeout(() => {
      const el = document.getElementById('catalog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 40);
  };

  const handleSearchCatalog = (query: string) => {
    setActiveProduct(null);
    setSelectedModel('All');
    setSelectedCategory('All');
    setSearchQuery(query);
    window.setTimeout(() => {
      const el = document.getElementById('catalog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 40);
  };

  const handleTriggerAction = (
    action: 'track' | 'architecture' | 'catalog' | 'deals',
    _label: string
  ) => {
    if (action === 'deals') {
      setActiveProduct(null);
      setSelectedModel('All');
      setSelectedCategory('All');
      setSearchQuery('');
      setSortBy('price-asc');
      window.setTimeout(() => {
        document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
      }, 40);
      return;
    }

    if (action === 'catalog') {
      handleSelectModelNav('All');
      return;
    }

    if (action === 'track') {
      setIsCartOpen(true);
      return;
    }

    handleScrollToSection('#architecture');
  };

  const handleAddToCart = (
    product: ShopifyProduct,
    variant: ProductVariant,
    quantity: number,
    fitmentLabel: string,
    openDrawer = true
  ) => {
    const lineId = `${variant.id}::${fitmentLabel}`;
    const imageObj = product.images[variant.imageIndex] || product.images[0];

    setCartItems((prev) => {
      const existing = prev.find((item) => item.lineId === lineId);
      if (existing) {
        return prev.map((item) =>
          item.lineId === lineId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          lineId,
          productId: product.id,
          handle: product.handle,
          title: product.title,
          variantId: variant.id,
          variantTitle: variant.title,
          sku: variant.sku,
          unitPrice: variant.price,
          compareAtPrice: variant.compareAtPrice,
          imageUrl: imageObj.url,
          imageAlt: imageObj.alt,
          quantity,
          vehicleFitment: fitmentLabel,
        },
      ];
    });

    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const handleQuickAdd = (product: ShopifyProduct) => {
    handleAddToCart(
      product,
      product.variants[0],
      1,
      product.metafields.fitmentYears[0] || 'Universal EV Fitment',
      true
    );
  };

  const handleUpdateQuantity = (lineId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.lineId === lineId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (lineId: string) => {
    setCartItems((prev) => prev.filter((item) => item.lineId !== lineId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111214]">
      <Header
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateHome={handleNavigateHome}
        onSelectModelNav={handleSelectModelNav}
        onSelectCategoryNav={handleSelectCategoryNav}
        onOpenProductByHandle={handleOpenProductByHandle}
        onScrollToSection={handleScrollToSection}
        onSearchCatalog={handleSearchCatalog}
        onTriggerAction={handleTriggerAction}
      />

      <main>
        {activeProduct ? (
          <ProductDetailView
            product={activeProduct}
            relatedProducts={relatedProducts}
            onBackToCatalog={() => setActiveProduct(null)}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleOpenProduct}
          />
        ) : (
          <>
            <HeroSection
              onBrowseCatalog={() => handleSelectModelNav('All')}
              onInspectFlagshipPdp={() =>
                handleOpenProduct(STOREFRONT_PRODUCTS[0])
              }
            />

            <CatalogSection
              products={filteredProducts}
              selectedModel={selectedModel}
              onSelectModel={setSelectedModel}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onOpenProduct={handleOpenProduct}
              onQuickAdd={handleQuickAdd}
            />

            <CraftsmanshipSection />
          </>
        )}
      </main>

      <Footer
        onSelectModel={handleSelectModelNav}
        onNavigateHome={handleNavigateHome}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
