"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { products, sampleOrders } from "@/lib/mockData";
import { formatPrice } from "@/lib/utils";

export default function AdminDashboard() {
  const { user } = useAuth();

  if (!user || !user.isAdmin) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Admin Access Required</h1>
        <p className="text-gray-400 mb-6">Login with admin@toolfyr.com to access this dashboard</p>
        <Link href="/auth/login" className="btn-primary">Sign In as Admin</Link>
      </div>
    );
  }

  const totalRevenue = sampleOrders.reduce((sum, o) => sum + o.total, 0);
  const stats = [
    { label: "Total Products", value: products.length, icon: "📦", color: "from-purple-500 to-violet-600" },
    { label: "Total Orders", value: sampleOrders.length, icon: "🛒", color: "from-pink-500 to-rose-600" },
    { label: "Revenue", value: formatPrice(totalRevenue), icon: "💰", color: "from-amber-500 to-orange-600" },
    { label: "Customers", value: "2,450", icon: "👥", color: "from-emerald-500 to-green-600" },
  ];

  const recentOrders = sampleOrders.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">Welcome back, {user.name}</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/products" className="btn-secondary !py-2 !px-4 text-sm">Manage Products</Link>
          <Link href="/admin/orders" className="btn-primary !py-2 !px-4 text-sm">View Orders</Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-light rounded-2xl p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">{stat.icon}</span>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center opacity-20`} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Revenue Chart (CSS bar chart) */}
        <div className="glass-light rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">Revenue Overview</h2>
          <div className="flex items-end gap-3 h-48">
            {[65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88, 92].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-purple-600 to-pink-500 transition-all duration-500 hover:opacity-80"
                  style={{ height: `${height}%` }}
                />
                <span className="text-[10px] text-gray-500">{["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="glass-light rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm text-purple-400 hover:text-purple-300">View All</Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between glass rounded-xl p-3">
                <div>
                  <span className="text-sm font-semibold text-white">{order.id}</span>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-white">{formatPrice(order.total)}</span>
                  <p className={`text-xs capitalize ${
                    order.status === "delivered" ? "text-green-400" :
                    order.status === "shipped" ? "text-blue-400" :
                    order.status === "processing" ? "text-yellow-400" : "text-gray-400"
                  }`}>{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="glass-light rounded-2xl p-6 mt-8">
        <h2 className="text-lg font-bold text-white mb-6">Top Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-500 uppercase tracking-wider">
                <th className="text-left pb-3">Product</th>
                <th className="text-left pb-3">Category</th>
                <th className="text-left pb-3">Price</th>
                <th className="text-left pb-3">Rating</th>
                <th className="text-left pb-3">Reviews</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.slice(0, 5).map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-12 rounded-lg overflow-hidden bg-gray-800">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-sm font-medium text-white">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-gray-400 capitalize">{p.category}</td>
                  <td className="py-3 text-sm text-white font-medium">{formatPrice(p.price)}</td>
                  <td className="py-3 text-sm text-yellow-400">★ {p.rating}</td>
                  <td className="py-3 text-sm text-gray-400">{p.reviewCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
