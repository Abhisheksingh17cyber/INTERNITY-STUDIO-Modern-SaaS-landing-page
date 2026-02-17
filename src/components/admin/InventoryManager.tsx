'use client';

import { Package, AlertTriangle, Edit } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

export default function InventoryManager() {
  return (
    <div className="bg-charcoal-dark border border-silver/5 rounded-sm overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-silver/5">
        <h3 className="font-display text-lg text-silver uppercase tracking-wider">Inventory</h3>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-400/10 text-yellow-400 text-[10px] font-body tracking-wider uppercase rounded-sm">
            <AlertTriangle className="w-3 h-3" />
            2 Low Stock
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-silver/5">
              {['Product', 'SKU', 'Category', 'Price', 'Stock', 'Status', ''].map((h) => (
                <th key={h} className="text-left px-6 py-3 font-body text-[10px] tracking-[0.3em] uppercase text-silver/30">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_PRODUCTS.map((product) => {
              const stockStatus =
                product.stock === 0
                  ? { label: 'Out of Stock', cls: 'text-red-400 bg-red-400/10' }
                  : product.stock <= 5
                  ? { label: 'Low Stock', cls: 'text-yellow-400 bg-yellow-400/10' }
                  : { label: 'In Stock', cls: 'text-emerald-400 bg-emerald-400/10' };

              return (
                <tr key={product.slug} className="border-b border-silver/5 hover:bg-silver/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-charcoal rounded-sm flex items-center justify-center">
                        <Package className="w-4 h-4 text-gold/30" />
                      </div>
                      <span className="font-body text-sm text-silver">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-body text-xs text-silver/30 uppercase">{product.slug.slice(0, 8)}</td>
                  <td className="px-6 py-4 font-body text-xs text-silver/40 capitalize">{product.category}</td>
                  <td className="px-6 py-4 font-body text-sm text-silver/60">{formatPrice(product.price)}</td>
                  <td className="px-6 py-4 font-body text-sm text-silver">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-1 text-[10px] font-body tracking-wider uppercase rounded-sm ${stockStatus.cls}`}>
                      {stockStatus.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-silver/20 hover:text-gold transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
