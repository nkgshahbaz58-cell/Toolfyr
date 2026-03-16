"use client";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products, collections } from "@/lib/mockData";

export default function HomePage() {
  const trending = products.filter((p) => p.tags.includes("trending")).slice(0, 8);
  const featured = products.filter((p) => p.tags.includes("featured")).slice(0, 4);

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated background gradients */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: "3s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[150px]" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-medium text-gray-300">New Spring Collection 2026</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-6">
                <span className="text-white">Define Your</span>
                <br />
                <span className="gradient-text">Style.</span>
                <br />
                <span className="text-white">Own The</span>
                <br />
                <span className="gradient-text">Moment.</span>
              </h1>

              <p className="text-lg text-gray-400 max-w-lg mb-8 leading-relaxed">
                Discover curated fashion that speaks volumes. From street culture to luxury evening wear — find pieces that make every entrance unforgettable.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products" className="btn-primary text-center text-base px-8 py-4 inline-flex items-center justify-center gap-2">
                  Shop Collection
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a href="#collections" className="btn-secondary text-center text-base px-8 py-4">
                  Explore Lookbook
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-12">
                {[
                  { value: "50K+", label: "Happy Customers" },
                  { value: "200+", label: "Curated Pieces" },
                  { value: "4.9★", label: "Avg Rating" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero images */}
            <div className="relative hidden lg:block">
              <div className="relative w-full h-[600px]">
                <div className="absolute top-0 right-0 w-72 h-96 rounded-3xl overflow-hidden border border-white/5 shadow-2xl animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                  <img src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=550&fit=crop" alt="Fashion" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 w-64 h-80 rounded-3xl overflow-hidden border border-white/5 shadow-2xl animate-fade-in-up" style={{ animationDelay: "400ms" }}>
                  <img src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=400&h=500&fit=crop" alt="Street" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-900/30 to-transparent" />
                </div>
                {/* Floating badge */}
                <div className="absolute top-1/2 left-1/3 glass rounded-2xl p-4 animate-float shadow-xl" style={{ animationDelay: "1s" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Free Shipping</p>
                      <p className="text-xs text-gray-400">On orders $100+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MARQUEE BANNER ===== */}
      <div className="py-4 bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-purple-900/30 overflow-hidden" style={{ borderTop: "1px solid rgba(124,58,237,0.1)", borderBottom: "1px solid rgba(124,58,237,0.1)" }}>
        <div className="flex gap-8 animate-shimmer whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="text-sm font-semibold text-gray-400 flex items-center gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              {["FREE SHIPPING $100+", "NEW ARRIVALS WEEKLY", "EASY RETURNS", "SUSTAINABLE FASHION"][i % 4]}
            </span>
          ))}
        </div>
      </div>

      {/* ===== COLLECTIONS ===== */}
      <section id="collections" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Curated Collections</h2>
          <p className="text-gray-400 max-w-lg mx-auto">Handpicked by our stylists for every mood and occasion</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {collections.map((col, i) => (
            <Link
              key={col.id}
              href={`/products?collection=${col.id}`}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] card-hover animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
            >
              <img src={col.image} alt={col.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-1">{col.name}</h3>
                <p className="text-sm text-gray-300">{col.description}</p>
                <div className="mt-3 flex items-center gap-1 text-purple-400 text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Shop Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== TRENDING PRODUCTS ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Trending Now</h2>
            <p className="text-gray-400">What everyone is wearing right now</p>
          </div>
          <Link href="/products" className="btn-secondary !py-2.5 !px-5 text-sm hidden sm:inline-flex items-center gap-2">
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {trending.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* ===== FEATURED HIGHLIGHT ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative rounded-3xl overflow-hidden glass" style={{ minHeight: "400px" }}>
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&h=600&fit=crop"
              alt="Featured"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
          </div>
          <div className="relative p-8 sm:p-12 lg:p-16 max-w-lg">
            <div className="badge badge-premium mb-4">Limited Edition</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">The Zenith Collection</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Premium Italian-crafted pieces for those who appreciate the finer things. Each piece is numbered and comes with a certificate of authenticity.
            </p>
            <Link href="/products" className="btn-primary inline-flex items-center gap-2 text-base">
              Explore Premium
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "🚚", title: "Free Shipping", desc: "On all orders over $100" },
            { icon: "↩️", title: "Easy Returns", desc: "30-day hassle-free returns" },
            { icon: "🔒", title: "Secure Payment", desc: "256-bit SSL encryption" },
            { icon: "💎", title: "Premium Quality", desc: "Ethically sourced materials" },
          ].map((feature, i) => (
            <div
              key={feature.title}
              className="glass-light rounded-2xl p-6 text-center card-hover animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-sm font-bold text-white mb-1">{feature.title}</h3>
              <p className="text-xs text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative rounded-3xl overflow-hidden glass p-8 sm:p-12 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px]" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Join the Movement</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-8">Be the first to know about drops, exclusive deals, and style tips. Get 15% off your first order.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" className="input-field flex-1" />
              <button className="btn-primary whitespace-nowrap">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
