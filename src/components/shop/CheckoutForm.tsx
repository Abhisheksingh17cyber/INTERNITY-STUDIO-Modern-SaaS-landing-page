'use client';

import { useState } from 'react';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/lib/utils';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextReveal from '@/components/animations/TextReveal';
import { CreditCard, Lock } from 'lucide-react';

export default function CheckoutForm() {
  const { items, getTotal, clearCart } = useCartStore();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
  });

  const update = (field: string, value: string) =>
    setFormData((p) => ({ ...p, [field]: value }));

  const inputClass =
    'w-full h-11 bg-charcoal border border-silver/10 rounded-sm px-4 font-body text-sm text-silver placeholder:text-silver/20 focus:outline-none focus:border-gold/50 transition-colors';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: POST to /api/orders
    alert('Order placed! (Demo mode)');
    clearCart();
  };

  const subtotal = getTotal();
  const shipping = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <section className="section-padding bg-obsidian min-h-screen">
      <div className="container-luxury">
        <TextReveal as="h1" className="font-display text-3xl md:text-4xl text-gold uppercase tracking-wider text-center mb-12">
          Checkout
        </TextReveal>

        {/* Step indicator */}
        <ScrollReveal>
          <div className="flex items-center justify-center gap-4 mb-16">
            {['Shipping', 'Payment', 'Review'].map((label, i) => (
              <div key={label} className="flex items-center gap-4">
                <button
                  onClick={() => setStep((i + 1) as 1 | 2 | 3)}
                  className={`flex items-center gap-2 ${
                    step >= i + 1 ? 'text-gold' : 'text-silver/30'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-body ${
                    step >= i + 1 ? 'border-gold bg-gold/10' : 'border-silver/20'
                  }`}>
                    {i + 1}
                  </span>
                  <span className="font-body text-xs tracking-[0.2em] uppercase hidden sm:inline">{label}</span>
                </button>
                {i < 2 && <div className={`w-12 h-px ${step > i + 1 ? 'bg-gold' : 'bg-silver/10'}`} />}
              </div>
            ))}
          </div>
        </ScrollReveal>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form Section */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <ScrollReveal>
                  <h2 className="font-display text-xl text-silver uppercase tracking-wider mb-8">Shipping Information</h2>
                  <div className="space-y-4">
                    <input type="email" placeholder="Email" value={formData.email} onChange={(e) => update('email', e.target.value)} className={inputClass} required />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="First Name" value={formData.firstName} onChange={(e) => update('firstName', e.target.value)} className={inputClass} required />
                      <input type="text" placeholder="Last Name" value={formData.lastName} onChange={(e) => update('lastName', e.target.value)} className={inputClass} required />
                    </div>
                    <input type="text" placeholder="Address" value={formData.address} onChange={(e) => update('address', e.target.value)} className={inputClass} required />
                    <div className="grid grid-cols-3 gap-4">
                      <input type="text" placeholder="City" value={formData.city} onChange={(e) => update('city', e.target.value)} className={inputClass} required />
                      <input type="text" placeholder="State" value={formData.state} onChange={(e) => update('state', e.target.value)} className={inputClass} required />
                      <input type="text" placeholder="ZIP" value={formData.zip} onChange={(e) => update('zip', e.target.value)} className={inputClass} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Country" value={formData.country} onChange={(e) => update('country', e.target.value)} className={inputClass} required />
                      <input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass} />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="mt-8 h-12 px-12 bg-gold text-obsidian font-body text-sm font-semibold tracking-widest uppercase hover:bg-gold/90 transition-colors"
                  >
                    Continue to Payment
                  </button>
                </ScrollReveal>
              )}

              {step === 2 && (
                <ScrollReveal>
                  <h2 className="font-display text-xl text-silver uppercase tracking-wider mb-8">Payment Details</h2>
                  <div className="space-y-4">
                    <div className="relative">
                      <input type="text" placeholder="Card Number" value={formData.cardNumber} onChange={(e) => update('cardNumber', e.target.value)} className={inputClass} required />
                      <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-silver/20" />
                    </div>
                    <input type="text" placeholder="Name on Card" value={formData.nameOnCard} onChange={(e) => update('nameOnCard', e.target.value)} className={inputClass} required />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="MM/YY" value={formData.expiry} onChange={(e) => update('expiry', e.target.value)} className={inputClass} required />
                      <input type="text" placeholder="CVV" value={formData.cvv} onChange={(e) => update('cvv', e.target.value)} className={inputClass} required />
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button type="button" onClick={() => setStep(1)} className="h-12 px-8 border border-silver/10 text-silver/40 font-body text-sm tracking-widest uppercase hover:border-gold/30 hover:text-gold transition-colors">
                      Back
                    </button>
                    <button type="button" onClick={() => setStep(3)} className="h-12 px-12 bg-gold text-obsidian font-body text-sm font-semibold tracking-widest uppercase hover:bg-gold/90 transition-colors">
                      Review Order
                    </button>
                  </div>
                </ScrollReveal>
              )}

              {step === 3 && (
                <ScrollReveal>
                  <h2 className="font-display text-xl text-silver uppercase tracking-wider mb-8">Review Order</h2>
                  <div className="space-y-4 mb-8">
                    {items.map((item) => (
                      <div key={item.productId} className="flex justify-between items-center py-3 border-b border-silver/5">
                        <div>
                          <span className="font-body text-sm text-silver">{item.name}</span>
                          <span className="text-silver/30 text-xs ml-2">x{item.quantity}</span>
                        </div>
                        <span className="font-body text-sm text-silver/60">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-6 bg-charcoal rounded-sm mb-8">
                    <h3 className="font-body text-xs tracking-[0.3em] uppercase text-silver/40 mb-3">Shipping to</h3>
                    <p className="font-body text-sm text-silver/60">
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.state} {formData.zip}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setStep(2)} className="h-12 px-8 border border-silver/10 text-silver/40 font-body text-sm tracking-widest uppercase hover:border-gold/30 hover:text-gold transition-colors">
                      Back
                    </button>
                    <button type="submit" className="h-12 px-12 bg-gold text-obsidian font-body text-sm font-semibold tracking-widest uppercase hover:bg-gold/90 transition-colors flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Place Order — {formatPrice(total)}
                    </button>
                  </div>
                </ScrollReveal>
              )}
            </div>

            {/* Order Summary */}
            <div>
              <ScrollReveal delay={0.2}>
                <div className="bg-charcoal-dark p-6 rounded-sm sticky top-24">
                  <h3 className="font-display text-lg text-silver uppercase tracking-wider mb-6">Order Summary</h3>
                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div key={item.productId} className="flex justify-between text-sm">
                        <span className="font-body text-silver/50">{item.name} x{item.quantity}</span>
                        <span className="font-body text-silver/60">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-silver/10 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-body text-silver/40">Subtotal</span>
                      <span className="font-body text-silver/60">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-body text-silver/40">Shipping</span>
                      <span className="font-body text-gold/60">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-body text-silver/40">Tax</span>
                      <span className="font-body text-silver/60">{formatPrice(tax)}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-silver/10">
                      <span className="font-display text-silver uppercase tracking-wider">Total</span>
                      <span className="font-display text-lg text-gold">{formatPrice(total)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-6 pt-4 border-t border-silver/10">
                    <Lock className="w-3 h-3 text-silver/20" />
                    <span className="font-body text-[10px] text-silver/20">Secure 256-bit SSL encryption</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
