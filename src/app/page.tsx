import React from "react";

export default function Home() {
  const products = [
    { id: 1, name: "Fresh Swat Apple (1kg)", price: "Rs. 250", category: "Fruits" },
    { id: 2, name: "Organic Local Honey (500g)", price: "Rs. 1,200", category: "Grocery" },
    { id: 3, name: "Pure Shama Ghee (1kg)", price: "Rs. 650", category: "Cooking Essentials" },
    { id: 4, name: "Fresh Local Tomatoes (1kg)", price: "Rs. 150", category: "Vegetables" },
  ];

  const handleWhatsAppOrder = (productName: string, price: string) => {
    const phone = "923000000000"; // یہاں اپنا واٹس ایپ نمبر لکھ لیں
    const message = `Hello SJ Online, I want to order: *${productName}* (${price}). Please confirm my order.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="bg-emerald-600 text-white p-6 rounded-2xl shadow-md mb-8 text-center">
          <h1 className="text-3xl font-bold">SJ Online — ایس جے آن لائن</h1>
          <p className="text-emerald-100 mt-2">Mingora, Swat Local Delivery Service</p>
        </header>

        {/* Product Grid */}
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Available Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {products.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold mt-3 text-gray-800">{item.name}</h3>
                <p className="text-emerald-700 font-bold text-xl mt-1">{item.price}</p>
              </div>
              <button
                onClick={() => handleWhatsAppOrder(item.name, item.price)}
                className="mt-5 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-sm"
              >
                Order on WhatsApp 💬
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-400 text-sm mt-12">
          © 2026 SJ Online Mingora Swat. Powered by Vercel & Next.js.
        </footer>
      </div>
    </main>
  );
}
