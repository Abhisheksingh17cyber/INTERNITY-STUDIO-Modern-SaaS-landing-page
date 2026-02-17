'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Ready to connect to newsletter API (Mailchimp, ConvertKit, etc.)
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="flex-1 bg-charcoal border border-charcoal-light px-4 py-3 text-silver text-sm 
                   placeholder:text-silver/30 focus:outline-none focus:border-gold/50 transition-colors"
        required
      />
      <button
        type="submit"
        className="bg-gold text-obsidian px-6 py-3 font-display text-sm tracking-wider uppercase 
                   hover:bg-gold-light transition-colors flex items-center gap-2"
        disabled={submitted}
      >
        {submitted ? (
          <span className="text-xs">Subscribed ✓</span>
        ) : (
          <>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
