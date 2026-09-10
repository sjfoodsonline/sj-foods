'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, MapPin, Zap, Truck, ShieldCheck, Store, ArrowRight, Search } from 'lucide-react';
import { ref, onValue } from 'firebase/database';
import { db } from '@/lib/firebase';

export default function Home() {
  const [vendors, setVendors] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch real-time data from Firebase Database
  useEffect(() => {
    const vendorsRef = ref(db, 'vendors');
    onValue(vendorsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const vendorList = Object.keys(data)
          .map(key => ({ id: key, ...data[key] }))
          .filter((v: any) => v.status === 'approved' || v.status === 'active'); // Only show active/approved vendors
        setVendors(vendorList);
      } else {
        setVendors([]);
      }
    });

    const productsRef = ref(db, 'site_products');
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setProducts(productList);
      } else {
        setProducts([]);
      }
      setLoading(false);
    });
  }, []);

  const filteredProducts = products.filter(p => 
    p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Top Swat Delivery Announcement Bar */}
      <div className="bg-emerald-700 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300 animate-pulse" />
        <span>SJ Online (ایس جے آن لائن) - Mingora & Kanju Swat Express Delivery (Few Hours)</span>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
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
                placeholder="Search products across Swat vendors..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a href="/admin" className="text-xs font-bold text-gray-700 hover:text-emerald-700 bg-gray-100 px-4 py-2.5 rounded-xl transition">
              Master Admin Control
            </a>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-gray-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="bg-emerald-500/30 text-emerald-200 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-400/30">
              Swat's Premier Multi-Vendor Marketplace
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold mt-4 leading-tight">
              Aapke Sheهر Ke Vendors, <span className="text-emerald-300">Chand Ghanto Main Doorstep.</span>
            </h2>
            <p className="mt-4 text-gray-200 text-sm sm:text-base">
              Order directly from verified local shops in Mingora and Kanju. Real-time WhatsApp order sync and complete cash on delivery or online transfer options.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center gap-4">
              <Store className="w-8 h-8 text-emerald-400" />
              <div>
                <p className="text-xs text-gray-300 font-medium">Multi-Vendor Hub</p>
                <p className="font-bold text-sm">Individual Shop Pages</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center gap-4">
              <Truck className="w-8 h-8 text-emerald-400" />
              <div>
                <p className="text-xs text-gray-300 font-medium">Fast Local Dispatch</p>
                <p className="font-bold text-sm">Swat Express Service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vendors Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Featured Swat Vendors</h3>
          <span className="text-sm text-emerald-700 font-semibold">Live Directory</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-gray-500 text-sm">Loading vendors from database...</p>
          ) : vendors.length === 0 ? (
            <p className="text-gray-500 text-sm">No active vendors found. Add vendors via Admin panel or Firebase.</p>
          ) : (
            vendors.map(vendor => (
              <div key={vendor.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
                <div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">{vendor.area || 'Mingora, Swat'}</span>
                  <h4 className="font-bold text-lg text-gray-900 mt-2">{vendor.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{vendor.category || 'General Store'}</p>
                </div>
                <a href={`/vendor/${vendor.slug || vendor.id}`} className="bg-gray-900 hover:bg-emerald-700 text-white p-3 rounded-xl transition">
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">All Marketplace Products</h3>
          <span className="text-sm text-gray-500">{filteredProducts.length} items available</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product: any) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition group">
              <div className="h-48 overflow-hidden bg-gray-100 relative">
                <img 
                  src={product.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e'} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-base text-gray-800">{product.title}</h4>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-black text-emerald-700">Rs. {product.price}</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg font-semibold">{product.unit || 'Item'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2026 SJ Online (ایس جے آن لائن) - Mingora, Swat. Powered by Real-Time Database.</p>
        </div>
      </footer>
    </div>
  );
}
