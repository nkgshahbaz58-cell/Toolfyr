"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
    { href: "/products?category=dresses", label: "Dresses" },
    { href: "/products?category=outerwear", label: "Outerwear" },
    { href: "/products?category=accessories", label: "Accessories" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass" style={{ borderBottom: "1px solid rgba(124,58,237,0.1)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center font-black text-white text-lg group-hover:scale-110 transition-transform">
              T
            </div>
            <span className="text-xl font-extrabold tracking-tight gradient-text hidden sm:block">TOOLFYR</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <Link href="/products" className="p-2 rounded-xl hover:bg-white/5 transition-colors">
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>

            {/* User */}
            {user ? (
              <div className="relative group">
                <button className="p-2 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 glass rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-2xl">
                  <div className="p-3 border-b border-white/5">
                    <p className="text-sm font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                  <Link href="/profile" className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                    Profile
                  </Link>
                  {user.isAdmin && (
                    <Link href="/admin" className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-white/5 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/auth/login" className="p-2 rounded-xl hover:bg-white/5 transition-colors">
                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            )}

            {/* Cart */}
            <Link href="/cart" className="p-2 rounded-xl hover:bg-white/5 transition-colors relative">
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center animate-pulse-glow">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-white/5 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="md:hidden glass-light animate-fade-in" style={{ borderTop: "1px solid rgba(124,58,237,0.1)" }}>
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {!user && (
              <Link
                href="/auth/login"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-semibold text-purple-400 hover:text-purple-300 hover:bg-white/5 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
