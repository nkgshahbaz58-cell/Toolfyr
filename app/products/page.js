"use client";
import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/mockData";

const categories = ["all", "tops", "bottoms", "dresses", "outerwear", "shoes", "accessories"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colorOptions = [
  { name: "Black", hex: "#1a1a2e" },
  { name: "White", hex: "#fdfefe" },
  { name: "Red", hex: "#e74c3c" },
  { name: "Blue", hex: "#2980b9" },
  { name: "Purple", hex: "#6c3483" },
  { name: "Gold", hex: "#f0b27a" },
  { name: "Grey", hex: "#8e8e8e" },
  { name: "Pink", hex: "#d4a5a5" },
];
const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Most Popular", value: "popular" },
  { label: "Top Rated", value: "rating" },
];

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center"><div className="text-xl text-gray-400">Loading products...</div></div>}>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [category, setCategory] = useState(initialCategory);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sort, setSort] = useState("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleSize = (s) => setSelectedSizes((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  const toggleColor = (c) => setSelectedColors((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (category !== "all") result = result.filter((p) => p.category === category);
    if (selectedSizes.length > 0) result = result.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    if (selectedColors.length > 0) result = result.filter((p) => p.colorNames.some((c) => selectedColors.includes(c)));
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "popular": result.sort((a, b) => b.reviewCount - a.reviewCount); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }

    return result;
  }, [category, selectedSizes, selectedColors, priceRange, sort]);

  const clearFilters = () => {
    setCategory("all");
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 500]);
  };

  const activeFilterCount = (category !== "all" ? 1 : 0) + selectedSizes.length + selectedColors.length + (priceRange[0] > 0 || priceRange[1] < 500 ? 1 : 0);

  const FilterPanel = () => (
    <div className="space-y-8">
      {/* Category */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                category === cat
                  ? "bg-purple-600 text-white"
                  : "glass-light text-gray-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => toggleSize(s)}
              className={`w-10 h-10 rounded-xl text-xs font-semibold transition-all flex items-center justify-center ${
                selectedSizes.includes(s)
                  ? "bg-purple-600 text-white"
                  : "glass-light text-gray-400 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Color</h3>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((c) => (
            <button
              key={c.name}
              onClick={() => toggleColor(c.name)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                selectedColors.includes(c.name) ? "border-purple-500 scale-110" : "border-transparent hover:border-white/30"
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Price Range</h3>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="500"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full accent-purple-500"
          />
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {activeFilterCount > 0 && (
        <button onClick={clearFilters} className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
          Clear all filters ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Shop All</h1>
        <p className="text-gray-400">{filtered.length} products found</p>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-28 glass-light rounded-2xl p-6">
            <FilterPanel />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 gap-4">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="lg:hidden btn-secondary !py-2 !px-4 text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-purple-600 text-[10px] font-bold flex items-center justify-center">{activeFilterCount}</span>
              )}
            </button>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input-field !w-auto !py-2 !px-4 text-sm"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Mobile filter panel */}
          {filtersOpen && (
            <div className="lg:hidden glass-light rounded-2xl p-6 mb-6 animate-fade-in">
              <FilterPanel />
            </div>
          )}

          {/* Product Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your filters</p>
              <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
