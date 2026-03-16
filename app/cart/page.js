"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { cart, removeFromCart, updateQty, cartTotal, cartCount } = useCart();

  if (cartCount === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-3xl font-bold text-white mb-3">Your Cart is Empty</h1>
        <p className="text-gray-400 mb-8">Looks like you haven&apos;t added anything yet</p>
        <Link href="/products" className="btn-primary inline-flex items-center gap-2">
          Start Shopping
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    );
  }

  const shipping = cartTotal >= 100 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.size}-${item.color}`}
              className="glass-light rounded-2xl p-4 sm:p-6 flex gap-4 animate-fade-in"
            >
              <div className="w-24 h-32 sm:w-28 sm:h-36 rounded-xl overflow-hidden flex-shrink-0 bg-gray-800">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link href={`/products/${item.id}`} className="text-base font-semibold text-white hover:text-purple-300 transition-colors line-clamp-1">
                      {item.name}
                    </Link>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500">Size: <span className="text-gray-300">{item.size}</span></span>
                      <span className="text-xs text-gray-500">Color: <span className="text-gray-300">{item.color}</span></span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id, item.size, item.color)}
                    className="text-gray-500 hover:text-red-400 transition-colors p-1"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-end justify-between mt-4">
                  {/* Quantity */}
                  <div className="flex items-center glass rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQty(item.id, item.size, item.color, item.qty - 1)}
                      className="px-3 py-1.5 text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      −
                    </button>
                    <span className="px-3 py-1.5 text-white font-semibold text-sm min-w-[32px] text-center">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.size, item.color, item.qty + 1)}
                      className="px-3 py-1.5 text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-lg font-bold text-white">{formatPrice(item.price * item.qty)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="glass-light rounded-2xl p-6 sticky top-28">
            <h2 className="text-lg font-bold text-white mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal ({cartCount} items)</span>
                <span className="text-white">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Shipping</span>
                <span className={shipping === 0 ? "text-green-400" : "text-white"}>
                  {shipping === 0 ? "FREE" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tax (8%)</span>
                <span className="text-white">{formatPrice(tax)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-purple-400">Add {formatPrice(100 - cartTotal)} more for free shipping</p>
              )}
            </div>

            <div className="border-t border-white/5 pt-4 mb-6">
              <div className="flex justify-between">
                <span className="text-base font-bold text-white">Total</span>
                <span className="text-xl font-bold gradient-text">{formatPrice(total)}</span>
              </div>
            </div>

            <Link href="/checkout" className="btn-primary w-full text-center block py-4 text-base">
              Proceed to Checkout
            </Link>

            <Link href="/products" className="block text-center text-sm text-purple-400 hover:text-purple-300 mt-4 transition-colors">
              Continue Shopping
            </Link>

            {/* Promo Code */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="flex gap-2">
                <input type="text" placeholder="Promo code" className="input-field !py-2.5 text-sm flex-1" />
                <button className="btn-secondary !py-2.5 !px-4 text-sm">Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
