"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      signup(name, email, password);
      router.push("/");
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md animate-fade-in-up">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center font-black text-white text-2xl mx-auto mb-4">
              T
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-sm text-gray-400">Join Toolfyr and start shopping</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-6 text-sm text-red-400 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 6 characters" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Confirm Password</label>
              <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="input-field" />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" style={{ animation: "spin-slow 1s linear infinite" }} />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
