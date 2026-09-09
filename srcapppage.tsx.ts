'use client';

import { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  Zap, 
  Truck, 
  ShieldCheck, 
  PhoneCall, 
  Search 
} from 'lucide-react';

export default function Home() {
  // Sample state representing live products synced from Firebase
  const [products, setProducts] = useState([
    { id: '1', title: 'Fresh Swat Apples (1kg)', price: 320, vendor: 'Zubair Mega Mart', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6' },
    { id: '2', title: 'Organic Shama Ghee (1kg)', price: 650, vendor: 'Mingora General Store', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d' },
    { id: '3', title: 'Local Honey Pure (500g)', price: 1200, vendor: 'Swat Organic hub', image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38' },
    { id: '4', title: 'Fresh Farm Milk (1L)', price: 210, vendor: 'Kanju Dairy Farm', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150' },
  ]);

  const [cart, setCart] = useState<{ id: string; title: string; price: number; qty: number }[]>([]);

  const addToCart = (product: typeof products[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { id: product.id, title: product.title, price: product.price, qty: 1 }];
    });
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Top Announcement Bar */}
      <div className="bg-emerald-600 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300 animate-pulse" />
        <span>Express Delivery in Swat (Mingora & Kanju) within Hours! Cash on Delivery Available.</span>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black tracking-tight text-emerald-700">SJ ONLINE</h1>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
              <MapPin className="w-3 h-3" /> Swat, Pakistan
            </span>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search groceries, vendors, essentials..." 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative flex items-center gap-2 bg-emerald-700 text-white px-5 py-2.5 rounded-full font-semibold shadow-md hover:bg-emerald-800 transition">
              <ShoppingBag className="w-4 h-4" />
              <span>Cart ({cart.reduce((a, c) => a + c.qty, 0)})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="bg-gradient-to-r from-emerald-900 to-teal-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="bg-emerald-500/30 text-emerald-200 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-400/30">
              Multi-Vendor Live Hub
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold mt-4 leading-tight">
              Aapki Doorstep Tak, <span className="text-emerald-300">Chand Ghanto Main.</span>
            </h2>
            <p className="mt-4 text-gray-200 text-sm sm:text-base">
              Order directly from top verified vendors in Swat. Real-time database sync ensures live stock tracking and instant WhatsApp confirmation.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center gap-4">
              <Truck className="w-8 h-8 text-emerald-400" />
              <div>
                <p className="text-xs text-gray-300 font-medium">Fast Local Dispatch</p>
                <p className="font-bold text-sm">Mingora & Kanju Hub</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              <div>
                <p className="text-xs text-gray-300 font-medium">Secure Transactions</p>
                <p className="font-bold text-sm">COD & Online Payment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Featured Multi-Vendor Products</h3>
          <span className="text-sm text-emerald-700 font-semibold cursor-pointer hover:underline">View All Vendors →</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition group">
              <div className="h-48 overflow-hidden bg-gray-100 relative">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">
                  {product.vendor}
                </span>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-base text-gray-800">{product.title}</h4>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-black text-emerald-700">Rs. {product.price}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-gray-900 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2026 SJ Online (ایس جے آن لائن). Powered by Real-Time Database Architecture.</p>
        </div>
      </footer>
    </div>
  );
}