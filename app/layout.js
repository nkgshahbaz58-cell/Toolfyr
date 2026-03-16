import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "TOOLFYR — Fashion Forward",
  description: "Where fashion meets the future. Shop curated collections of trending clothing, outerwear, shoes, and accessories.",
  keywords: "fashion, clothing, e-commerce, trendy, streetwear, luxury, outerwear",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1 pt-16 sm:pt-20">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
