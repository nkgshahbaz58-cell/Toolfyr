"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { products, reviews } from "@/lib/mockData";
import { useCart } from "@/context/CartContext";
import { formatPrice, getDiscountPercent } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Product not found</h1>
        <Link href="/products" className="btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const discount = getDiscountPercent(product.originalPrice, product.price);
  const productReviews = reviews.filter((r) => r.productId === product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize, product.colorNames[selectedColor], qty);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-white transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-gray-300 capitalize">{product.category}</span>
        <span>/</span>
        <span className="text-purple-400">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-900 glass-light">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            {product.badge && (
              <div className={`badge ${
                product.badge === "Sale" ? "badge-sale" :
                product.badge === "New Arrival" ? "badge-new" :
                product.badge === "Best Seller" ? "badge-bestseller" :
                product.badge === "Premium" || product.badge === "Luxury" ? "badge-premium" :
                "badge-popular"
              } absolute top-4 left-4`}>
                {product.badge}
              </div>
            )}
            {discount > 0 && (
              <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-bold px-3 py-1.5 rounded-xl">
                -{discount}%
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? "border-purple-500" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="animate-fade-in-up">
          <div className="mb-6">
            <p className="text-sm text-purple-400 font-semibold uppercase tracking-wider mb-2">{product.category}</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${star <= Math.round(product.rating) ? "text-yellow-400" : "text-gray-600"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-400">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-white">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
              )}
              {discount > 0 && (
                <span className="badge badge-sale">Save {discount}%</span>
              )}
            </div>
          </div>

          {/* Color Picker */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">
              Color: <span className="text-white">{product.colorNames[selectedColor]}</span>
            </h3>
            <div className="flex gap-3">
              {product.colors.map((color, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(i)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    selectedColor === i ? "border-purple-500 scale-110 ring-2 ring-purple-500/30" : "border-white/10 hover:border-white/30"
                  }`}
                  style={{ backgroundColor: color }}
                  title={product.colorNames[i]}
                />
              ))}
            </div>
          </div>

          {/* Size Picker */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-300">Size</h3>
              <button className="text-xs text-purple-400 hover:text-purple-300">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[48px] h-12 px-4 rounded-xl text-sm font-semibold transition-all ${
                    selectedSize === size
                      ? "bg-purple-600 text-white border-purple-600"
                      : "glass-light text-gray-300 hover:border-purple-500/50 hover:text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && (
              <p className="text-xs text-amber-400 mt-2">Please select a size</p>
            )}
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Quantity</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center glass-light rounded-xl overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 text-gray-300 hover:text-white transition-colors">−</button>
                <span className="px-4 py-3 text-white font-semibold min-w-[48px] text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-3 text-gray-300 hover:text-white transition-colors">+</button>
              </div>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`flex-1 py-4 rounded-xl font-semibold text-white text-base transition-all flex items-center justify-center gap-2 ${
                addedToCart
                  ? "bg-green-600"
                  : selectedSize
                  ? "btn-primary"
                  : "bg-gray-700 cursor-not-allowed opacity-50"
              }`}
            >
              {addedToCart ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Added to Cart!
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add to Cart — {formatPrice(product.price * qty)}
                </>
              )}
            </button>
            <button className="p-4 rounded-xl glass-light hover:bg-pink-500/10 transition-colors">
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { icon: "🚚", label: "Free Shipping" },
              { icon: "↩️", label: "Easy Returns" },
              { icon: "🔒", label: "Secure Pay" },
            ].map((f) => (
              <div key={f.label} className="glass-light rounded-xl p-3 text-center">
                <div className="text-lg mb-1">{f.icon}</div>
                <div className="text-[10px] text-gray-400 font-medium">{f.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="border-b border-white/5">
            <div className="flex gap-6">
              {["description", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-semibold capitalize transition-colors border-b-2 ${
                    activeTab === tab ? "text-white border-purple-500" : "text-gray-500 border-transparent hover:text-gray-300"
                  }`}
                >
                  {tab} {tab === "reviews" && `(${productReviews.length})`}
                </button>
              ))}
            </div>
          </div>

          <div className="py-6">
            {activeTab === "description" ? (
              <p className="text-gray-300 leading-relaxed">{product.description}</p>
            ) : (
              <div className="space-y-4">
                {productReviews.length > 0 ? (
                  productReviews.map((review) => (
                    <div key={review.id} className="glass-light rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                            {review.user.charAt(0)}
                          </div>
                          <span className="text-sm font-semibold text-white">{review.user}</span>
                        </div>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className={`w-4 h-4 ${star <= review.rating ? "text-yellow-400" : "text-gray-600"}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm text-gray-300">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No reviews yet for this product.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-white mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
