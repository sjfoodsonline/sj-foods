"use client";

import React, { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // محصولات اور کیٹگریز (جو آپ نے سوات اور منگورہ کے لیے سیٹ کی ہیں)
  const categories = ["All", "Fruits & Veg", "Grocery & Oils", "Shama Ghee", "Local Honey"];

  const products = [
    { id: 1, name: "Fresh Swat Apple (1kg)", price: "Rs. 250", category: "Fruits & Veg", image: "🍎" },
    { id: 2, name: "Organic Local Honey (500g)", price: "Rs. 1,200", category: "Local Honey", image: "🍯" },
    { id: 3, name: "Pure Shama Ghee (1kg)", price: "Rs. 650", category: "Shama Ghee", image: "🧈" },
    { id: 4, name: "Fresh Local Tomatoes (1kg)", price: "Rs. 150", category: "Fruits & Veg", image: "🍅" },
    { id: 5, name: "Cooking Oil (1 Liter)", price: "Rs. 550", category: "Grocery & Oils", image: "🍾" },
    { id: 6, name: "Fresh Swat Walnuts (1kg)", price: "Rs. 900", category: "Grocery & Oils", image: "🌰" },
  ];

  // فلٹرنگ کا نظام
  const filteredProducts = products.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // واٹس ایپ آرڈر فنکشن
  const handleWhatsAppOrder = (productName: string, price: string) => {
    const phone = "923000000000"; // یہاں اپنا واٹس ایپ نمبر لکھ لیں
    const message = `Hello SJ Online, I want to order: *${productName}* (${price}). Please confirm my order for Mingora Swat delivery.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Top Header / Announcement Bar */}
      <div className="bg-emerald-800 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium">
        🚀 Fast Home Delivery Across Mingora & Swat Region | Order via WhatsApp!
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛒</span>
            <h1 className="text-2xl font-black text-emerald-700 tracking-tight">
              SJ Online <span className="text-xs font-normal bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full ml-1">ایس جے آن لائن</span>
            </h1>
          </div>
          
          {/* Search Bar */}
          <div className="w-full sm:w-96">
            <input
              type="text"
              placeholder="Search products (e.g., Apple, Honey)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">Freshness Delivered to Your Doorstep</h2>
          <p className="text-emerald-100 text-sm sm:text-base mb-6">
            Get the best quality groceries, local Swat fruits, and daily essentials instantly.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all shadow-sm ${
                selectedCategory === cat
                  ? "bg-emerald-600 text-white shadow-emerald-200 shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Featured Products</h3>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-200">
            <p className="text-gray-500 text-lg">No products found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-200 border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl bg-gray-50 p-3 rounded-2xl">{item.image}</span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h4>
                  <p className="text-emerald-600 font-extrabold text-xl mb-4">{item.price}</p>
                </div>

                <button
                  onClick={() => handleWhatsAppOrder(item.name, item.price)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-sm text-sm"
                >
                  Order on WhatsApp 💬
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 text-center text-gray-500 text-sm">
        <p className="font-semibold text-gray-700 mb-1">SJ Online (ایس جے آن لائن) — Mingora, Swat</p>
        <p>© 2026 All rights reserved. Powered by Next.js & Vercel.</p>
      </footer>
    </div>
  );
}
