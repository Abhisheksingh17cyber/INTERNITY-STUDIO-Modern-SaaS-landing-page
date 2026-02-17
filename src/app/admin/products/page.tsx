'use client';

import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, Package } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-silver uppercase tracking-wider mb-1">Products</h1>
          <p className="font-body text-xs text-silver/30">Manage your watch collection</p>
        </div>
        <Link
          href="/admin/products/new"
          className="h-10 px-6 bg-gold text-obsidian font-body text-xs font-semibold tracking-widest uppercase flex items-center gap-2 hover:bg-gold/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      <div className="bg-charcoal-dark border border-silver/5 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-silver/5">
                {['Product', 'Category', 'Price', 'Stock', 'Featured', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-6 py-3 font-body text-[10px] tracking-[0.3em] uppercase text-silver/30">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_PRODUCTS.map((product) => (
                <tr key={product.slug} className="border-b border-silver/5 hover:bg-silver/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-charcoal rounded-sm flex items-center justify-center">
                        <Package className="w-4 h-4 text-gold/30" />
                      </div>
                      <div>
                        <span className="font-body text-sm text-silver block">{product.name}</span>
                        <span className="font-body text-[10px] text-silver/20">{product.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-body text-xs text-silver/40 capitalize">{product.category}</td>
                  <td className="px-6 py-4 font-body text-sm text-silver">{formatPrice(product.price)}</td>
                  <td className="px-6 py-4 font-body text-sm text-silver/60">{product.stock}</td>
                  <td className="px-6 py-4">
                    {product.featured && (
                      <span className="inline-block px-2 py-1 text-[10px] font-body tracking-wider uppercase text-gold bg-gold/10 rounded-sm">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/products/${product.slug}`} className="text-silver/20 hover:text-gold transition-colors">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link href={`/admin/products/${product.slug}`} className="text-silver/20 hover:text-gold transition-colors">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button className="text-silver/20 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
