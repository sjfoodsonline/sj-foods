'use client';

import { useState } from 'react';

export default function Home() {
  // Aapke backup wale items aur prices yahan hain (Inhein aap change kar sakte hain)
  const [products] = useState([
    { id: 1, title: 'Fresh Swat Apples (1kg)', price: 320 },
    { id: 2, title: 'Organic Shama Ghee (1kg)', price: 650 },
    { id: 3, title: 'Pure Swat Honey (500g)', price: 1200 },
  ]);

  const orderOnWhatsApp = (item: { title: string; price: number }) => {
    const phone = "923001234567"; // Yahan apna WhatsApp number dein
    const message = `Salam! Main yeh order karna chahta hoon:%0A*${item.title}* - Rs. ${item.price}`;
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ color: '#047857' }}>SJ Online - Swat Local Market</h1>
      <p>Mingora aur Kanju ke liye fast online delivery & WhatsApp orders.</p>
      
      <hr style={{ margin: '20px 0' }} />

      <h3>Available Items (Backup Data)</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {products.map(p => (
          <div key={p.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: 0 }}>{p.title}</h4>
              <p style={{ margin: '5px 0 0 0', color: '#047857', fontWeight: 'bold' }}>Rs. {p.price}</p>
            </div>
            <button 
              onClick={() => orderOnWhatsApp(p)}
              style={{ background: '#25D366', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Order on WhatsApp
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
