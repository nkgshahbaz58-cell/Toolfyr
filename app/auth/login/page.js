"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (!email || !password) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }
      login(email, password);
      router.push("/");
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md animate-fade-in-up">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center font-black text-white text-2xl mx-auto mb-4">
              T
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-sm text-gray-400">Sign in to your Toolfyr account</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-6 text-sm text-red-400 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-field"
                required
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-400">Password</label>
                <a href="#" className="text-xs text-purple-400 hover:text-purple-300">Forgot password?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" style={{ animation: "spin-slow 1s linear infinite" }} />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                Sign Up
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-white/5">
            <p className="text-xs text-gray-500 text-center mb-4">Or continue with</p>
            <div className="grid grid-cols-2 gap-3">
              <button className="glass-light rounded-xl py-3 text-sm font-medium text-gray-300 hover:text-white hover:border-white/10 transition-colors">
                Google
              </button>
              <button className="glass-light rounded-xl py-3 text-sm font-medium text-gray-300 hover:text-white hover:border-white/10 transition-colors">
                Apple
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-600 text-center mt-6">
            Use <span className="text-purple-400">admin@toolfyr.com</span> to access admin dashboard
          </p>
        </div>
      </div>
    </div>
  );
}
