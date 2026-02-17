'use client';

import { use } from 'react';
import { MOCK_PRODUCTS } from '@/lib/constants';
import ProductForm from '@/components/admin/ProductForm';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = MOCK_PRODUCTS.find((p) => p.slug === id);

  if (!product) {
    return (
      <div className="text-center py-24">
        <h1 className="font-display text-2xl text-silver uppercase tracking-wider mb-2">Product Not Found</h1>
        <p className="font-body text-silver/40 text-sm">The product you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-silver uppercase tracking-wider mb-1">Edit Product</h1>
        <p className="font-body text-xs text-silver/30">{product.name}</p>
      </div>
      <ProductForm
        initialData={{
          name: product.name,
          slug: product.slug,
          price: product.price,
          description: product.description || '',
          category: product.category,
          stock: product.stock,
          featured: product.featured,
          images: product.images || [],
          specs: product.specs ? Object.fromEntries(product.specs instanceof Map ? product.specs : Object.entries(product.specs)) : {},
        }}
      />
    </div>
  );
}
