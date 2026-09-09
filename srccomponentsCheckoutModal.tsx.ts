'use client';

import { useState } from 'react';
import { processOrderAndSyncWhatsApp } from '@/lib/whatsapp';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface CheckoutProps {
  cart: { id: string; title: string; price: number; qty: number }[];
  onClose: () => void;
  onClearCart: () => void;
}

export default function CheckoutModal({ cart, onClose, onClearCart }: CheckoutProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'Online Payment'>('COD');
  const [loading, setLoading] = useState(false);

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert('Please fill in all delivery details.');
      return;
    }

    setLoading(true);
    const result = await processOrderAndSyncWhatsApp(cart, {
      name,
      phone,
      address,
      paymentMethod
    });

    setLoading(false);
    if (result.success) {
      alert('Order placed successfully! Real-time database synced & WhatsApp opened.');
      onClearCart();
      onClose();
    } else {
      alert('Failed to place order. Please try again.');
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-extrabold text-gray-900">Complete Your Order (SJ Online)</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-lg">✕</button>
        </div>

        <form onSubmit={handleCheckoutSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Full Name</label>
            <input 
              type="text" 
              placeholder="e.g. Salman Jan" 
              value={name} 
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Phone Number (WhatsApp)</label>
            <input 
              type="text" 
              placeholder="03XXXXXXXXX" 
              value={phone} 
              onChange={e => setPhone(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Delivery Address (Swat / Mingora / Kanju)</label>
            <textarea 
              placeholder="Street, Area, Landmark..." 
              value={address} 
              onChange={e => setAddress(e.target.value)}
              required
              rows={2}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Payment Method</label>
            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button" 
                onClick={() => setPaymentMethod('COD')}
                className={`py-3 px-4 rounded-xl text-sm font-bold border transition ${paymentMethod === 'COD' ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-gray-200 text-gray-600'}`}
              >
                Cash on Delivery
              </button>
              <button 
                type="button" 
                onClick={() => setPaymentMethod('Online Payment')}
                className={`py-3 px-4 rounded-xl text-sm font-bold border transition ${paymentMethod === 'Online Payment' ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-gray-200 text-gray-600'}`}
              >
                Online Transfer
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Payable Amount</p>
              <p className="text-lg font-black text-emerald-700">Rs. {total}</p>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              <span>Confirm & Sync Order</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}