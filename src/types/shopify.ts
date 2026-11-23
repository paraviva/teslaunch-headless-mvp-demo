export type VehicleModel =
  | 'All'
  | 'Model 3 Highland'
  | 'Model Y'
  | 'Cybertruck'
  | 'Model S / X';

export type ProductCategory =
  | 'All'
  | 'Cockpit Tech'
  | 'Exterior Aero'
  | 'Interior Trim'
  | 'Wheel & Chassis';

export interface ProductOptionGroup {
  name: string;
  values: string[];
}

export interface ProductVariant {
  id: string;
  sku: string;
  title: string;
  selectedOptions: Record<string, string>;
  price: number;
  compareAtPrice?: number;
  availableForSale: boolean;
  inventoryQuantity: number;
  imageIndex: number;
}

export interface ProductMetafields {
  compatibleModels: Exclude<VehicleModel, 'All'>[];
  fitmentYears: string[];
  installTimeMinutes: number;
  difficulty: 'DIY Easy' | 'Intermediate' | 'Pro Recommended';
  material: string;
  harnessType: string;
  warrantyMonths: number;
}

export interface ProductReview {
  id: string;
  author: string;
  vehicle: string;
  date: string;
  rating: number;
  title: string;
  body: string;
  verifiedOwner: boolean;
}

export interface InstallationStep {
  step: number;
  title: string;
  detail: string;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  subtitle: string;
  category: Exclude<ProductCategory, 'All'>;
  tagline: string;
  availabilityNote: string;
  rating: number;
  reviewCount: number;
  images: {
    url: string;
    alt: string;
    caption: string;
  }[];
  options: ProductOptionGroup[];
  variants: ProductVariant[];
  metafields: ProductMetafields;
  highlights: string[];
  specs: { label: string; value: string }[];
  installationSteps: InstallationStep[];
  reviews: ProductReview[];
}

export interface CartLineItem {
  lineId: string;
  productId: string;
  handle: string;
  title: string;
  variantId: string;
  variantTitle: string;
  sku: string;
  unitPrice: number;
  compareAtPrice?: number;
  imageUrl: string;
  imageAlt: string;
  quantity: number;
  vehicleFitment: string;
}

export interface OrderConfirmation {
  orderNumber: string;
  createdAt: string;
  customerName: string;
  email: string;
  shippingAddress: string;
  postalCode: string;
  items: CartLineItem[];
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  total: number;
  promoCodeApplied?: string;
}
