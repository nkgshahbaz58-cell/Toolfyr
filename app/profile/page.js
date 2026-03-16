"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { sampleOrders } from "@/lib/mockData";
import { formatPrice } from "@/lib/utils";

export default function ProfilePage() {
  const { user, updateProfile, logout } = useAuth();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [activeTab, setActiveTab] = useState("orders");

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Please sign in</h1>
        <Link href="/auth/login" className="btn-primary">Sign In</Link>
      </div>
    );
  }

  const handleSave = () => {
    updateProfile({ name });
    setEditing(false);
  };

  const statusColor = {
    delivered: "text-green-400 bg-green-400/10",
    shipped: "text-blue-400 bg-blue-400/10",
    processing: "text-yellow-400 bg-yellow-400/10",
    pending: "text-gray-400 bg-gray-400/10",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Profile Header */}
      <div className="glass-light rounded-3xl p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-3xl font-bold text-white flex-shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            {editing ? (
              <div className="flex items-center gap-3">
                <input value={name} onChange={(e) => setName(e.target.value)} className="input-field !py-2 text-lg font-bold max-w-xs" />
                <button onClick={handleSave} className="btn-primary !py-2 !px-4 text-sm">Save</button>
                <button onClick={() => setEditing(false)} className="btn-secondary !py-2 !px-4 text-sm">Cancel</button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                <button onClick={() => setEditing(true)} className="text-purple-400 hover:text-purple-300 text-sm">Edit</button>
              </div>
            )}
            <p className="text-gray-400 text-sm mt-1">{user.email}</p>
            <p className="text-gray-500 text-xs mt-1">Member since {new Date(user.joinDate).toLocaleDateString()}</p>
          </div>
          <div className="flex gap-3">
            {user.isAdmin && (
              <Link href="/admin" className="btn-secondary !py-2 !px-4 text-sm">Admin Dashboard</Link>
            )}
            <button onClick={() => { logout(); router.push("/"); }} className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 mb-8 border-b border-white/5">
        {["orders", "settings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-semibold capitalize border-b-2 transition-colors ${
              activeTab === tab ? "text-white border-purple-500" : "text-gray-500 border-transparent hover:text-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "orders" && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">Order History</h2>
          {sampleOrders.map((order) => (
            <div key={order.id} className="glass-light rounded-2xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <span className="text-sm font-semibold text-purple-400">{order.id}</span>
                  <span className="text-xs text-gray-500 ml-3">{order.date}</span>
                </div>
                <span className={`badge ${statusColor[order.status]} capitalize`}>{order.status}</span>
              </div>
              <div className="space-y-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-300">
                      Product #{item.productId} — {item.size} / {item.color} × {item.qty}
                    </span>
                    <span className="text-white font-medium">{formatPrice(item.price)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/5">
                <span className="text-xs text-gray-500">{order.address}</span>
                <span className="text-base font-bold text-white">{formatPrice(order.total)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "settings" && (
        <div className="max-w-lg space-y-6">
          <h2 className="text-xl font-bold text-white mb-4">Account Settings</h2>
          <div className="glass-light rounded-2xl p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email Notifications</label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-purple-500" />
                <span className="text-sm text-gray-300">Order updates</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer mt-2">
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-purple-500" />
                <span className="text-sm text-gray-300">Promotions and deals</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer mt-2">
                <input type="checkbox" className="w-5 h-5 rounded accent-purple-500" />
                <span className="text-sm text-gray-300">New arrivals</span>
              </label>
            </div>
          </div>
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-sm font-bold text-red-400 mb-3">Danger Zone</h3>
            <button className="text-sm text-red-400 hover:text-red-300 transition-colors">Delete Account</button>
          </div>
        </div>
      )}
    </div>
  );
}
