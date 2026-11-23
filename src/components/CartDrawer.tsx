import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { CartLineItem, OrderConfirmation } from '../types/shopify';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartLineItem[];
  onUpdateQuantity: (lineId: string, delta: number) => void;
  onRemoveItem: (lineId: string) => void;
  onClearCart: () => void;
}

const FREE_SHIPPING_THRESHOLD = 199;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [promoInput, setPromoInput] = useState('');
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(
    null
  );

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const discountRate = promoCode === 'BFCM15' ? 0.15 : 0;
  const discountAmount = subtotal * discountRate;
  const discountedSubtotal = subtotal - discountAmount;
  const qualifiesFreeShipping = discountedSubtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost =
    items.length === 0 || qualifiesFreeShipping ? 0 : 18;
  const total = discountedSubtotal + shippingCost;
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - discountedSubtotal
  );
  const shippingProgress = Math.min(
    100,
    (discountedSubtotal / FREE_SHIPPING_THRESHOLD) * 100
  );

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = promoInput.trim().toUpperCase();
    if (!cleaned) return;
    if (cleaned === 'BFCM15') {
      setPromoCode('BFCM15');
      setPromoMessage('BFCM15 applied: 15% off hardware subtotal.');
    } else {
      setPromoMessage('Invalid code. Try BFCM15 for 15% early access savings.');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !customerName.trim() ||
      !email.trim() ||
      !address.trim() ||
      !postalCode.trim()
    ) {
      setFormError('Please complete all delivery fields to confirm your order.');
      return;
    }
    setFormError(null);
    const order: OrderConfirmation = {
      orderNumber: `TL-${Math.floor(8100 + Math.random() * 1800)}`,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      customerName: customerName.trim(),
      email: email.trim(),
      shippingAddress: address.trim(),
      postalCode: postalCode.trim(),
      items: [...items],
      subtotal,
      discountAmount,
      shippingCost,
      total,
      promoCodeApplied: promoCode || undefined,
    };
    setConfirmation(order);
    onClearCart();
    setStep('confirmed');
  };

  const handleResetAndClose = () => {
    setStep('cart');
    setConfirmation(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag and Express Checkout"
    >
      <div className="absolute inset-0" onClick={handleResetAndClose} />

      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4">
          <div className="flex items-center gap-2.5">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('cart')}
                aria-label="Back to bag"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#52525B] hover:bg-[#F3F4F6] hover:text-[#111214]"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <h2 className="font-display text-base font-semibold text-[#111214]">
              {step === 'cart' && `Your Bag (${items.reduce((s, i) => s + i.quantity, 0)})`}
              {step === 'checkout' && 'Express Checkout'}
              {step === 'confirmed' && 'Order Confirmed'}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Close drawer"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#52525B] transition-colors hover:bg-[#F3F4F6] hover:text-[#111214]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Step 1: Cart Items */}
        {step === 'cart' && (
          <>
            {items.length > 0 && (
              <div className="border-b border-[#E5E7EB] bg-[#FAFAFA] px-5 py-3">
                <p className="text-xs font-medium text-[#111214]">
                  {qualifiesFreeShipping
                    ? 'Complimentary Express Shipping unlocked.'
                    : `Add $${remainingForFreeShipping.toFixed(2)} more for Complimentary Express Shipping.`}
                </p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#E5E7EB]">
                  <div
                    className="h-full bg-[#111214] transition-all duration-300"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag
                    className="h-10 w-10 text-[#A1A1AA]"
                    strokeWidth={1.5}
                  />
                  <p className="font-display mt-3 text-base font-semibold text-[#111214]">
                    Your hardware bag is empty
                  </p>
                  <p className="mt-1 max-w-[28ch] text-xs text-[#52525B]">
                    Browse Model 3 Highland, Model Y, or Cybertruck upgrades to
                    begin your build.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-5 h-10 rounded-lg bg-[#111214] px-5 text-xs font-semibold text-white hover:bg-[#27272A]"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-[#E5E7EB]">
                  {items.map((item) => (
                    <li key={item.lineId} className="flex gap-4 py-4 first:pt-0">
                      <div className="w-24 shrink-0 overflow-hidden rounded-lg border border-[#E5E7EB]">
                        <ResilientImage
                          src={item.imageUrl}
                          alt={item.imageAlt}
                          aspectClass="aspect-[4/3]"
                        />
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-xs font-semibold leading-snug text-[#111214]">
                              {item.title}
                            </p>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.lineId)}
                              aria-label={`Remove ${item.title}`}
                              className="text-[#71717A] hover:text-[#DC2626]"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="mt-0.5 truncate text-[11px] text-[#52525B]">
                            {item.variantTitle}
                          </p>
                          <p className="mt-0.5 truncate text-[11px] text-[#71717A]">
                            Fitment: {item.vehicleFitment}
                          </p>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex h-7 items-center rounded border border-[#D4D4D8]">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.lineId, -1)}
                              aria-label="Decrease item quantity"
                              className="flex h-full w-7 items-center justify-center text-[#111214] hover:bg-[#F3F4F6]"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-7 text-center font-mono text-xs font-medium tabular-nums text-[#111214]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.lineId, 1)}
                              aria-label="Increase item quantity"
                              className="flex h-full w-7 items-center justify-center text-[#111214] hover:bg-[#F3F4F6]"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <span className="font-mono text-xs font-semibold tabular-nums text-[#111214]">
                            ${(item.unitPrice * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-[#E5E7EB] bg-white px-5 py-4">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code (e.g. BFCM15)"
                    aria-label="Discount code"
                    className="h-9 flex-1 rounded-lg border border-[#D4D4D8] px-3 text-xs text-[#111214] placeholder:text-[#71717A] focus:border-[#111214] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="h-9 rounded-lg border border-[#D4D4D8] bg-[#FAFAFA] px-3 text-xs font-semibold text-[#111214] hover:border-[#111214]"
                  >
                    Apply
                  </button>
                </form>
                {promoMessage && (
                  <p className="mt-1.5 text-[11px] font-medium text-[#52525B]">
                    {promoMessage}
                  </p>
                )}

                <dl className="mt-4 space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#52525B]">
                    <dt>Subtotal</dt>
                    <dd className="font-mono tabular-nums">
                      ${subtotal.toFixed(2)}
                    </dd>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#15803D]">
                      <dt>Discount ({promoCode})</dt>
                      <dd className="font-mono tabular-nums">
                        -${discountAmount.toFixed(2)}
                      </dd>
                    </div>
                  )}
                  <div className="flex justify-between text-[#52525B]">
                    <dt>Express Shipping</dt>
                    <dd className="font-mono tabular-nums">
                      {shippingCost === 0
                        ? 'Complimentary'
                        : `$${shippingCost.toFixed(2)}`}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t border-[#E5E7EB] pt-2 text-sm font-semibold text-[#111214]">
                    <dt>Estimated Total</dt>
                    <dd className="font-mono tabular-nums">
                      ${total.toFixed(2)}
                    </dd>
                  </div>
                </dl>

                <button
                  type="button"
                  onClick={() => setStep('checkout')}
                  className="mt-4 h-11 w-full rounded-lg bg-[#DC2626] text-sm font-semibold text-white transition-colors hover:bg-[#B91C1C]"
                >
                  Proceed to Express Checkout
                </button>
              </div>
            )}
          </>
        )}

        {/* Step 2: Verification & Express Checkout Form */}
        {step === 'checkout' && (
          <form
            onSubmit={handlePlaceOrder}
            className="flex flex-1 flex-col justify-between overflow-y-auto px-5 py-5"
          >
            <div className="space-y-4">
              <div className="rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] p-3.5">
                <div className="flex items-center justify-between text-xs font-semibold text-[#111214]">
                  <span>Order Total ({items.length} items)</span>
                  <span className="font-mono tabular-nums">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-[#52525B]">
                  Dispatched within 24 hours with tracking and 2-year hardware
                  warranty.
                </p>
              </div>

              <div>
                <label
                  htmlFor="co-name"
                  className="block text-xs font-medium text-[#111214]"
                >
                  Full Name
                </label>
                <input
                  id="co-name"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Alex Mercer"
                  className="mt-1 h-10 w-full rounded-lg border border-[#D4D4D8] px-3 text-sm text-[#111214] focus:border-[#111214] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="co-email"
                  className="block text-xs font-medium text-[#111214]"
                >
                  Email for Tracking &amp; Install Guide
                </label>
                <input
                  id="co-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="mt-1 h-10 w-full rounded-lg border border-[#D4D4D8] px-3 text-sm text-[#111214] focus:border-[#111214] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="co-address"
                  className="block text-xs font-medium text-[#111214]"
                >
                  Street Address
                </label>
                <input
                  id="co-address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="742 Fremont Blvd, Suite 4B"
                  className="mt-1 h-10 w-full rounded-lg border border-[#D4D4D8] px-3 text-sm text-[#111214] focus:border-[#111214] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="co-postal"
                  className="block text-xs font-medium text-[#111214]"
                >
                  Postal Code
                </label>
                <input
                  id="co-postal"
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="94538"
                  className="mt-1 h-10 w-full rounded-lg border border-[#D4D4D8] px-3 text-sm text-[#111214] focus:border-[#111214] focus:outline-none"
                />
              </div>

              {formError && (
                <p className="text-xs font-medium text-[#DC2626]">
                  {formError}
                </p>
              )}
            </div>

            <div className="mt-6 border-t border-[#E5E7EB] pt-4">
              <button
                type="submit"
                className="h-11 w-full rounded-lg bg-[#DC2626] text-sm font-semibold text-white transition-colors hover:bg-[#B91C1C]"
              >
                Confirm Order · ${total.toFixed(2)}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Post-Order Confirmation Receipt */}
        {step === 'confirmed' && confirmation && (
          <div className="flex flex-1 flex-col justify-between overflow-y-auto px-5 py-6">
            <div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#15803D]" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-[#111214]">
                    Order #{confirmation.orderNumber} Confirmed — Preparing
                    Shipment
                  </h3>
                  <p className="mt-1 text-xs text-[#52525B]">
                    Receipt &amp; installation PDF dispatched to{' '}
                    <span className="font-medium text-[#111214]">
                      {confirmation.email}
                    </span>
                    .
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] p-4 text-xs">
                <p className="font-semibold text-[#111214]">Delivery Details</p>
                <p className="mt-1 text-[#52525B]">
                  {confirmation.customerName}
                </p>
                <p className="text-[#52525B]">
                  {confirmation.shippingAddress}, {confirmation.postalCode}
                </p>
              </div>

              <div className="mt-4 divide-y divide-[#E5E7EB] rounded-xl border border-[#E5E7EB] bg-white px-4">
                {confirmation.items.map((item) => (
                  <div
                    key={item.lineId}
                    className="flex items-center justify-between gap-3 py-3 text-xs"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-[#111214]">
                        {item.title} × {item.quantity}
                      </p>
                      <p className="truncate text-[11px] text-[#52525B]">
                        {item.variantTitle}
                      </p>
                    </div>
                    <span className="font-mono font-semibold tabular-nums text-[#111214]">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between py-3 text-sm font-semibold text-[#111214]">
                  <span>Total Paid</span>
                  <span className="font-mono tabular-nums">
                    ${confirmation.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="mt-6 h-11 w-full rounded-lg bg-[#111214] text-sm font-semibold text-white hover:bg-[#27272A]"
            >
              Return to Storefront
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
