"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { products as initialProducts } from "@/lib/mockData";
import { formatPrice } from "@/lib/utils";

export default function AdminProductsPage() {
  const { user } = useAuth();
  const [productList, setProductList] = useState(initialProducts);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  if (!user || !user.isAdmin) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Admin Access Required</h1>
        <Link href="/auth/login" className="btn-primary">Sign In as Admin</Link>
      </div>
    );
  }

  const filtered = productList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const deleteProduct = (id) => {
    setProductList((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-white">Manage Products</h1>
          </div>
          <p className="text-sm text-gray-400">{productList.length} products total</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field !py-2 text-sm flex-1 sm:w-64"
          />
          <button onClick={() => setShowAddModal(true)} className="btn-primary !py-2 !px-4 text-sm whitespace-nowrap flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="glass-light rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-500 uppercase tracking-wider bg-white/[0.02]">
                <th className="text-left p-4">Product</th>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Price</th>
                <th className="text-left p-4">Sizes</th>
                <th className="text-left p-4">Rating</th>
                <th className="text-left p-4">Badge</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-14 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{product.name}</p>
                        <p className="text-xs text-gray-500">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-400 capitalize">{product.category}</td>
                  <td className="p-4">
                    <span className="text-sm font-semibold text-white">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="block text-xs text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                    )}
                  </td>
                  <td className="p-4 text-xs text-gray-400">{product.sizes.join(", ")}</td>
                  <td className="p-4 text-sm text-yellow-400">★ {product.rating}</td>
                  <td className="p-4">
                    {product.badge && (
                      <span className="badge badge-new text-[10px]">{product.badge}</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 transition-colors text-gray-400 hover:text-red-400"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="glass rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Add New Product</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowAddModal(false); }}>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Product Name</label>
                <input className="input-field" placeholder="e.g. Midnight Blazer" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Price ($)</label>
                  <input type="number" className="input-field" placeholder="99.99" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                  <select className="input-field">
                    <option>tops</option>
                    <option>bottoms</option>
                    <option>dresses</option>
                    <option>outerwear</option>
                    <option>shoes</option>
                    <option>accessories</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                <textarea className="input-field" rows={3} placeholder="Product description..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Image URL</label>
                <input className="input-field" placeholder="https://..." />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" className="btn-primary flex-1">Add Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
