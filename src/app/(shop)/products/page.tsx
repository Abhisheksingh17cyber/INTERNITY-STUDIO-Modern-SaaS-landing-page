'use client';

import { useMemo } from 'react';
import { MOCK_PRODUCTS } from '@/lib/constants';
import { useFilterStore } from '@/stores/filterStore';
import ProductGrid from '@/components/shop/ProductGrid';
import FilterSidebar from '@/components/shop/FilterSidebar';
import QuickView from '@/components/shop/QuickView';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';

export default function ProductsPage() {
  const { category, minPrice, maxPrice, search, sort } = useFilterStore();

  const filtered = useMemo(() => {
    let products = [...MOCK_PRODUCTS];

    if (category) {
      products = products.filter((p) => p.category === category);
    }

    if (minPrice > 0 || maxPrice < 100000) {
      products = products.filter(
        (p) => p.price >= minPrice && p.price <= maxPrice
      );
    }

    if (search) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return products;
  }, [category, minPrice, maxPrice, search, sort]);

  return (
    <section className="section-padding bg-obsidian min-h-screen">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/50 block mb-4">
              Our Collection
            </span>
          </ScrollReveal>
          <TextReveal as="h1" className="font-display text-4xl md:text-5xl lg:text-6xl text-gold uppercase tracking-wider mb-4">
            Timepieces
          </TextReveal>
          <ScrollReveal delay={0.3}>
            <p className="font-body text-silver/40 max-w-lg mx-auto">
              Each watch in our collection is a testament to the art of horology, blending tradition with innovation.
            </p>
          </ScrollReveal>
        </div>

        {/* Search */}
        <ScrollReveal>
          <div className="flex justify-center mb-12">
            <input
              type="text"
              placeholder="Search timepieces..."
              value={search}
              onChange={(e) => useFilterStore.getState().setSearch(e.target.value)}
              className="w-full max-w-md h-11 bg-charcoal border border-silver/10 rounded-sm px-4 font-body text-sm text-silver placeholder:text-silver/20 focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>
        </ScrollReveal>

        {/* Content */}
        <div className="flex gap-12">
          <FilterSidebar />
          <div className="flex-1">
            <ScrollReveal>
              <p className="font-body text-xs text-silver/30 mb-6">
                {filtered.length} timepiece{filtered.length !== 1 ? 's' : ''}
              </p>
            </ScrollReveal>
            <ProductGrid products={filtered} columns={3} />
          </div>
        </div>
      </div>

      <QuickView />
    </section>
  );
}
