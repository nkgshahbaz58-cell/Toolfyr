# 🔥 TOOLFYR — Fashion Forward E-Commerce

> Where fashion meets the future. A modern, full-featured e-commerce clothing store built with Next.js 15 and TailwindCSS.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **🏠 Homepage** — Hero banner, curated collections, trending products
- **🛍️ Product Catalog** — Filterable by category, size, color, price + sorting
- **📦 Product Details** — Image gallery, size/color pickers, reviews, related products
- **🛒 Shopping Cart** — Real-time updates, quantity controls, promo codes
- **💳 Checkout Flow** — Multi-step with shipping form + dummy payment integration
- **🔐 Authentication** — Sign up, login, profile management (localStorage-based)
- **👤 User Profile** — Order history, account settings
- **🔧 Admin Dashboard** — Stats, revenue charts, product & order management
- **📱 Responsive** — Optimized for mobile, tablet, and desktop
- **🎨 Premium Design** — Dark theme, glassmorphism, gradient effects, smooth animations

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ installed
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/nkgshahbaz58-cell/Toolfyr.git
cd Toolfyr

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 🔑 Demo Credentials

| Role  | Email               | Password    |
|-------|---------------------|-------------|
| Admin | admin@toolfyr.com   | any         |
| User  | any valid email     | any         |

> Use `admin@toolfyr.com` to access the Admin Dashboard at `/admin`

## 📁 Project Structure

```
toolfyr/
├── app/
│   ├── layout.js              # Root layout (providers, navbar, footer)
│   ├── page.js                # Homepage
│   ├── globals.css            # Design system + animations
│   ├── products/
│   │   ├── page.js            # Product listing with filters
│   │   └── [id]/page.js       # Product detail page
│   ├── cart/page.js           # Shopping cart
│   ├── checkout/page.js       # Checkout flow
│   ├── auth/
│   │   ├── login/page.js      # Login
│   │   └── signup/page.js     # Sign up
│   ├── profile/page.js        # User profile
│   ├── admin/
│   │   ├── page.js            # Admin dashboard
│   │   ├── products/page.js   # Product management
│   │   └── orders/page.js     # Order management
│   └── api/                   # API routes
│       ├── products/route.js
│       ├── auth/route.js
│       └── orders/route.js
├── components/                # Reusable UI components
│   ├── Navbar.js
│   ├── Footer.js
│   └── ProductCard.js
├── context/                   # React context providers
│   ├── CartContext.js
│   └── AuthContext.js
├── lib/                       # Utilities & mock data
│   ├── mockData.js
│   └── utils.js
└── public/
```

## 🛠️ Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Framework | Next.js 15 (App Router) |
| Styling   | TailwindCSS v4          |
| State     | React Context + Hooks   |
| Storage   | localStorage (mock DB)  |
| API       | Next.js API Routes      |

## 📄 License

MIT © 2026 Toolfyr
