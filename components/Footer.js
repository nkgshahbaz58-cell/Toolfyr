import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-24" style={{ borderTop: "1px solid rgba(124,58,237,0.1)" }}>
      {/* Gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center font-black text-white text-lg">
                T
              </div>
              <span className="text-xl font-extrabold gradient-text">TOOLFYR</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Where fashion meets the future. Curated collections for the bold and the beautiful.
            </p>
            <div className="flex gap-3">
              {["instagram", "twitter", "tiktok"].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-xl glass-light flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/30 transition-all">
                  <span className="text-xs font-semibold uppercase">{social.charAt(0)}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-3">
              {["New Arrivals", "Best Sellers", "Dresses", "Outerwear", "Shoes", "Accessories"].map((item) => (
                <li key={item}>
                  <Link href="/products" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              {["About Us", "Careers", "Press", "Sustainability", "Blog"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Stay in the Loop</h4>
            <p className="text-sm text-gray-400 mb-4">Get 15% off your first order when you subscribe.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="input-field text-sm !py-3 !rounded-l-xl !rounded-r-none flex-1"
              />
              <button className="btn-primary !py-3 !px-5 !rounded-l-none !rounded-r-xl text-sm whitespace-nowrap">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">© 2026 Toolfyr. All rights reserved.</p>
            <div className="flex gap-6">
              {["Privacy", "Terms", "Cookies"].map((item) => (
                <a key={item} href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
