"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { sampleOrders } from "@/lib/mockData";
import { formatPrice } from "@/lib/utils";

export default function AdminOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState(sampleOrders);
  const [filter, setFilter] = useState("all");

  if (!user || !user.isAdmin) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Admin Access Required</h1>
        <Link href="/auth/login" className="btn-primary">Sign In as Admin</Link>
      </div>
    );
  }

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const updateStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const statusStyles = {
    delivered: "text-green-400 bg-green-400/10 border-green-400/20",
    shipped: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    processing: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    pending: "text-gray-400 bg-gray-400/10 border-gray-400/20",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-white">Manage Orders</h1>
          </div>
          <p className="text-sm text-gray-400">{orders.length} orders total</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "pending", "processing", "shipped", "delivered"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
              filter === status ? "bg-purple-600 text-white" : "glass-light text-gray-400 hover:text-white"
            }`}
          >
            {status}
            <span className="ml-1.5 text-xs opacity-60">
              ({status === "all" ? orders.length : orders.filter((o) => o.status === status).length})
            </span>
          </button>
        ))}
      </div>

      {/* Orders */}
      <div className="space-y-4">
        {filtered.map((order) => (
          <div key={order.id} className="glass-light rounded-2xl p-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-white">{order.id}</span>
                  <span className={`badge border ${statusStyles[order.status]} capitalize`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-xs text-gray-500">Date: {order.date}</span>
                  <span className="text-xs text-gray-500">User: {order.userId}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="input-field !py-2 !px-3 text-sm !w-auto"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm glass rounded-xl p-3">
                  <span className="text-gray-300">
                    Product #{item.productId} — {item.size} / {item.color} × {item.qty}
                  </span>
                  <span className="text-white font-medium">{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <span className="text-xs text-gray-500">📍 {order.address}</span>
              <span className="text-lg font-bold gradient-text">{formatPrice(order.total)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
