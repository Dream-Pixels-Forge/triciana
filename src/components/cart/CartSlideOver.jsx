import React from 'react';
import { useCart } from '../../context/CartContext';
import { CloseIcon, ArrowRightIcon } from '../common/Icons';
import { Button } from '../common';

/**
 * CartSlideOver Component
 * Slide-over panel for shopping cart
 */
export function CartSlideOver() {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTax,
    cartShipping,
    cartFinalTotal,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Panel */}
      <div className="relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <h2 className="text-heading-lg font-bold text-neutral-900">
            Shopping Cart ({cartItems.length})
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
            aria-label="Close cart"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 mb-6 rounded-full bg-neutral-100 flex items-center justify-center">
                <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-heading-md font-semibold text-neutral-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-body-sm text-neutral-600 mb-6">
                Looks like you haven't added anything yet.
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => setIsCartOpen(false)}
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={`${item.id}-${JSON.stringify(item.options)}`}
                  item={item}
                  onRemove={() => removeFromCart(item.id)}
                  onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer with totals */}
        {cartItems.length > 0 && (
          <div className="border-t border-neutral-200 px-6 py-4 bg-neutral-50">
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-body-sm">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-medium text-neutral-900">${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-body-sm">
                <span className="text-neutral-600">Shipping</span>
                <span className="font-medium text-neutral-900">
                  {cartShipping === 0 ? 'Free' : `$${cartShipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-body-sm">
                <span className="text-neutral-600">Tax</span>
                <span className="font-medium text-neutral-900">${cartTax.toFixed(2)}</span>
              </div>
              <div className="border-t border-neutral-200 pt-3 flex justify-between">
                <span className="text-body-md font-semibold text-neutral-900">Total</span>
                <span className="text-body-md font-bold text-primary-600">
                  ${cartFinalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => window.location.href = '/checkout'}
            >
              Checkout
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Button>

            <p className="text-center text-body-xs text-neutral-500 mt-4">
              Free shipping on orders over $75
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * CartItem Component
 */
function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm">
      {/* Product image */}
      <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-neutral-100">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Product details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-body-md font-semibold text-neutral-900 truncate">
          {item.name}
        </h3>
        {item.variant && (
          <p className="text-body-sm text-neutral-500 mt-1">{item.variant}</p>
        )}
        <p className="text-body-md font-bold text-primary-600 mt-2">
          ${item.price.toFixed(2)}
        </p>

        {/* Quantity controls */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => onUpdateQuantity(item.quantity - 1)}
            className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-600 hover:border-primary-500 hover:text-primary-500 transition-colors"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="w-8 text-center text-body-sm font-medium">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.quantity + 1)}
            className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-600 hover:border-primary-500 hover:text-primary-500 transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
          <button
            onClick={onRemove}
            className="ml-auto text-body-sm text-red-500 hover:text-red-600 font-medium"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartSlideOver;
