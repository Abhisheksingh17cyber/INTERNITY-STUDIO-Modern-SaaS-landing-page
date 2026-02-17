'use client';

import { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
}

export default function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="w-20 h-20 rounded-full border border-gold/20 mx-auto mb-6 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border border-gold/10" />
        </div>
        <h3 className="font-display text-xl text-silver mb-2">No watches found</h3>
        <p className="font-body text-silver/40 text-sm">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-6 lg:gap-8`}>
      {products.map((product, i) => (
        <ProductCard key={product._id || product.slug} product={product} index={i} />
      ))}
    </div>
  );
}
