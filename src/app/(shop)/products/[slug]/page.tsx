'use client';

import { use } from 'react';
import { MOCK_PRODUCTS } from '@/lib/constants';
import ProductDetail from '@/components/shop/ProductDetail';
import ProductGrid from '@/components/shop/ProductGrid';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return (
      <section className="section-padding bg-obsidian min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl text-gold uppercase tracking-wider mb-4">Product Not Found</h1>
          <p className="font-body text-silver/40">The timepiece you are looking for does not exist.</p>
        </div>
      </section>
    );
  }

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  ).slice(0, 4);

  return (
    <>
      <ProductDetail product={product} />

      {relatedProducts.length > 0 && (
        <section className="section-padding bg-charcoal-dark">
          <div className="container-luxury">
            <TextReveal as="h2" className="font-display text-2xl md:text-3xl text-gold uppercase tracking-wider text-center mb-12">
              You May Also Like
            </TextReveal>
            <ScrollReveal>
              <ProductGrid products={relatedProducts} columns={4} />
            </ScrollReveal>
          </div>
        </section>
      )}
    </>
  );
}
