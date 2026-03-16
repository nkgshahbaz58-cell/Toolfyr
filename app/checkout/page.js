"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice, generateOrderId } from "@/lib/utils";

export default function CheckoutPage() {
  const { cart, cartTotal, cartCount, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [shipping, setShipping] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });

  const [payment, setPayment] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const shippingCost = cartTotal >= 100 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shippingCost + tax;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setStep(3);
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);

    setTimeout(() => {
      setOrderComplete(true);
      clearCart();
    }, 2000);
  };

  if (cartCount === 0 && !orderComplete) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Nothing to checkout</h1>
        <Link href="/products" className="btn-primary">Shop Now</Link>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center animate-fade-in-up">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Order Confirmed! 🎉</h1>
        <p className="text-gray-400 mb-2">Your order <span className="text-purple-400 font-semibold">{orderId}</span> has been placed</p>
        <p className="text-gray-500 text-sm mb-8">A confirmation email has been sent to {shipping.email}</p>

        <div className="glass-light rounded-2xl p-6 mb-8 text-left">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Order Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-400">Order Total</span><span className="text-white font-semibold">{formatPrice(total)}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Shipping To</span><span className="text-white">{shipping.city}, {shipping.state}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Est. Delivery</span><span className="text-green-400">3-5 business days</span></div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/products" className="btn-primary">Continue Shopping</Link>
          <Link href="/profile" className="btn-secondary">View Orders</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Progress */}
      <div className="flex items-center justify-center gap-4 mb-12">
        {[
          { num: 1, label: "Shipping" },
          { num: 2, label: "Payment" },
          { num: 3, label: "Confirm" },
        ].map((s, i) => (
          <div key={s.num} className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step >= s.num ? "bg-purple-600 text-white" : "glass-light text-gray-500"
              }`}>
                {step > s.num ? "✓" : s.num}
              </div>
              <span className={`text-sm font-medium hidden sm:block ${step >= s.num ? "text-white" : "text-gray-500"}`}>
                {s.label}
              </span>
            </div>
            {i < 2 && <div className={`w-12 sm:w-20 h-0.5 ${step > s.num ? "bg-purple-600" : "bg-gray-700"}`} />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 && (
            <form onSubmit={handleShippingSubmit} className="animate-fade-in">
              <h2 className="text-2xl font-bold text-white mb-6">Shipping Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                  <input required value={shipping.firstName} onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                  <input required value={shipping.lastName} onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input type="email" required value={shipping.email} onChange={(e) => setShipping({ ...shipping, email: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                  <input type="tel" required value={shipping.phone} onChange={(e) => setShipping({ ...shipping, phone: e.target.value })} className="input-field" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Address</label>
                  <input required value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">City</label>
                  <input required value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">State</label>
                  <input required value={shipping.state} onChange={(e) => setShipping({ ...shipping, state: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">ZIP Code</label>
                  <input required value={shipping.zip} onChange={(e) => setShipping({ ...shipping, zip: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Country</label>
                  <select value={shipping.country} onChange={(e) => setShipping({ ...shipping, country: e.target.value })} className="input-field">
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn-primary mt-8 w-full sm:w-auto py-4 px-8">Continue to Payment</button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handlePaymentSubmit} className="animate-fade-in">
              <h2 className="text-2xl font-bold text-white mb-6">Payment Details</h2>
              <div className="glass-light rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">💳</span>
                  <span className="text-sm font-semibold text-white">Credit / Debit Card</span>
                  <span className="ml-auto badge badge-premium text-[10px]">Demo Mode</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Card Number</label>
                    <input
                      required
                      placeholder="1234 5678 9012 3456"
                      value={payment.cardNumber}
                      onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Cardholder Name</label>
                    <input
                      required
                      placeholder="John Doe"
                      value={payment.cardName}
                      onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Expiry</label>
                      <input required placeholder="MM/YY" value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">CVV</label>
                      <input required placeholder="123" value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value })} className="input-field" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="btn-secondary py-4 px-8">Back</button>
                <button type="submit" className="btn-primary py-4 px-8 flex-1 sm:flex-none">Place Order — {formatPrice(total)}</button>
              </div>
            </form>
          )}

          {step === 3 && !orderComplete && (
            <div className="text-center py-20 animate-fade-in">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-6" style={{ animation: "spin-slow 1s linear infinite" }} />
              <h2 className="text-2xl font-bold text-white mb-2">Processing your order...</h2>
              <p className="text-gray-400">Please wait while we confirm your payment</p>
            </div>
          )}
        </div>

        {/* Summary sidebar */}
        {step < 3 && (
          <div className="lg:col-span-1">
            <div className="glass-light rounded-2xl p-6 sticky top-28">
              <h3 className="text-lg font-bold text-white mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center gap-3">
                    <div className="w-12 h-14 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.size} / {item.color} × {item.qty}</p>
                    </div>
                    <span className="text-sm font-semibold text-white">{formatPrice(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/5 pt-4 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-gray-400">Subtotal</span><span className="text-white">{formatPrice(cartTotal)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-400">Shipping</span><span className={shippingCost === 0 ? "text-green-400" : "text-white"}>{shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-400">Tax</span><span className="text-white">{formatPrice(tax)}</span></div>
                <div className="flex justify-between pt-2 border-t border-white/5"><span className="font-bold text-white">Total</span><span className="text-xl font-bold gradient-text">{formatPrice(total)}</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
