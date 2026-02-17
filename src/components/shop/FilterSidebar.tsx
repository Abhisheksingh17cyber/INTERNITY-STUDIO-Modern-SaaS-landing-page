'use client';

import { WATCH_CATEGORIES } from '@/lib/constants';
import { useFilterStore } from '@/stores/filterStore';
import { SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';

export default function FilterSidebar() {
  const [open, setOpen] = useState(false);
  const { category, priceRange, sortBy, setCategory, setPriceRange, setSortBy, resetFilters } = useFilterStore();

  const priceRanges = [
    { label: 'All Prices', min: 0, max: 100000 },
    { label: 'Under $5,000', min: 0, max: 5000 },
    { label: '$5,000 - $10,000', min: 5000, max: 10000 },
    { label: '$10,000 - $25,000', min: 10000, max: 25000 },
    { label: '$25,000+', min: 25000, max: 100000 },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A-Z' },
  ];

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="font-display text-sm text-silver uppercase tracking-wider mb-4">Category</h3>
        <div className="space-y-2">
          <button
            onClick={() => setCategory('')}
            className={`block w-full text-left font-body text-sm py-1.5 transition-colors ${
              !category ? 'text-gold' : 'text-silver/40 hover:text-silver/60'
            }`}
          >
            All Collections
          </button>
          {WATCH_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`block w-full text-left font-body text-sm py-1.5 capitalize transition-colors ${
                category === cat ? 'text-gold' : 'text-silver/40 hover:text-silver/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-display text-sm text-silver uppercase tracking-wider mb-4">Price</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => setPriceRange([range.min, range.max])}
              className={`block w-full text-left font-body text-sm py-1.5 transition-colors ${
                priceRange[0] === range.min && priceRange[1] === range.max
                  ? 'text-gold'
                  : 'text-silver/40 hover:text-silver/60'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-display text-sm text-silver uppercase tracking-wider mb-4">Sort By</h3>
        <div className="space-y-2">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSortBy(opt.value)}
              className={`block w-full text-left font-body text-sm py-1.5 transition-colors ${
                sortBy === opt.value ? 'text-gold' : 'text-silver/40 hover:text-silver/60'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={resetFilters}
        className="font-body text-xs tracking-[0.2em] uppercase text-silver/30 hover:text-gold transition-colors"
      >
        Reset All Filters
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-60 flex-shrink-0">
        <FilterContent />
      </aside>

      {/* Mobile filter toggle */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 h-10 border border-silver/10 text-silver/50 font-body text-xs tracking-widest uppercase hover:border-gold/30 hover:text-gold transition-colors mb-6"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
      </button>

      {/* Mobile Sheet */}
      {open && (
        <>
          <div className="fixed inset-0 bg-obsidian/80 z-50 lg:hidden" onClick={() => setOpen(false)} />
          <div className="fixed left-0 top-0 bottom-0 w-72 bg-charcoal-dark z-50 p-6 overflow-y-auto lg:hidden">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-lg text-silver uppercase tracking-wider">Filters</h2>
              <button onClick={() => setOpen(false)} className="text-silver/40 hover:text-gold">
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterContent />
          </div>
        </>
      )}
    </>
  );
}
