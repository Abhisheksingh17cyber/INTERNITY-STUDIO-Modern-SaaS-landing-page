'use client';

import { useState } from 'react';
import { WATCH_CATEGORIES } from '@/lib/constants';
import { Save, X, Plus, Trash2, Upload } from 'lucide-react';

interface ProductFormProps {
  initialData?: {
    name: string;
    slug: string;
    price: number;
    description: string;
    category: string;
    stock: number;
    featured: boolean;
    images: string[];
    specs: Record<string, string>;
  };
  onSubmit?: (data: Record<string, unknown>) => void;
}

export default function ProductForm({ initialData, onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    price: initialData?.price || 0,
    description: initialData?.description || '',
    category: initialData?.category || 'dive',
    stock: initialData?.stock || 0,
    featured: initialData?.featured || false,
    images: initialData?.images || [],
    specs: initialData?.specs || {},
  });

  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecVal, setNewSpecVal] = useState('');

  const inputClass =
    'w-full h-11 bg-charcoal border border-silver/10 rounded-sm px-4 font-body text-sm text-silver placeholder:text-silver/20 focus:outline-none focus:border-gold/50 transition-colors';
  const labelClass = 'font-body text-xs tracking-[0.2em] uppercase text-silver/40 block mb-2';

  const update = (field: string, value: unknown) =>
    setFormData((p) => ({ ...p, [field]: value }));

  const addSpec = () => {
    if (newSpecKey && newSpecVal) {
      update('specs', { ...formData.specs, [newSpecKey]: newSpecVal });
      setNewSpecKey('');
      setNewSpecVal('');
    }
  };

  const removeSpec = (key: string) => {
    const s = { ...formData.specs };
    delete s[key];
    update('specs', s);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-charcoal-dark border border-silver/5 rounded-sm p-6 space-y-4">
            <h3 className="font-display text-lg text-silver uppercase tracking-wider mb-2">General</h3>

            <div>
              <label className={labelClass}>Product Name</label>
              <input type="text" value={formData.name} onChange={(e) => update('name', e.target.value)} className={inputClass} placeholder="e.g. Chronos Elite" required />
            </div>

            <div>
              <label className={labelClass}>Slug</label>
              <input type="text" value={formData.slug} onChange={(e) => update('slug', e.target.value)} className={inputClass} placeholder="chronos-elite" />
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => update('description', e.target.value)}
                rows={5}
                className={`${inputClass} h-auto py-3 resize-none`}
                placeholder="Product description..."
              />
            </div>
          </div>

          {/* Images */}
          <div className="bg-charcoal-dark border border-silver/5 rounded-sm p-6">
            <h3 className="font-display text-lg text-silver uppercase tracking-wider mb-4">Images</h3>
            <div className="border-2 border-dashed border-silver/10 rounded-sm p-8 text-center hover:border-gold/30 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-silver/20 mx-auto mb-3" />
              <p className="font-body text-sm text-silver/30">Drop images here or click to upload</p>
              <p className="font-body text-[10px] text-silver/20 mt-1">PNG, JPG up to 5MB</p>
            </div>
            {formData.images.length > 0 && (
              <div className="flex gap-3 mt-4 flex-wrap">
                {formData.images.map((img, i) => (
                  <div key={i} className="w-20 h-20 bg-charcoal rounded-sm relative group">
                    <button
                      type="button"
                      onClick={() => update('images', formData.images.filter((_, j) => j !== i))}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Specifications */}
          <div className="bg-charcoal-dark border border-silver/5 rounded-sm p-6">
            <h3 className="font-display text-lg text-silver uppercase tracking-wider mb-4">Specifications</h3>
            <div className="space-y-3 mb-4">
              {Object.entries(formData.specs).map(([key, val]) => (
                <div key={key} className="flex items-center gap-3">
                  <span className="font-body text-xs text-silver/40 w-32 truncate">{key}</span>
                  <span className="font-body text-sm text-silver/60 flex-1">{val}</span>
                  <button type="button" onClick={() => removeSpec(key)} className="text-silver/20 hover:text-red-400">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <input type="text" placeholder="Key" value={newSpecKey} onChange={(e) => setNewSpecKey(e.target.value)} className={`${inputClass} flex-1`} />
              <input type="text" placeholder="Value" value={newSpecVal} onChange={(e) => setNewSpecVal(e.target.value)} className={`${inputClass} flex-1`} />
              <button type="button" onClick={addSpec} className="w-11 h-11 bg-gold/10 border border-gold/20 flex items-center justify-center text-gold hover:bg-gold/20 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-charcoal-dark border border-silver/5 rounded-sm p-6 space-y-4">
            <h3 className="font-display text-lg text-silver uppercase tracking-wider mb-2">Pricing & Stock</h3>

            <div>
              <label className={labelClass}>Price ($)</label>
              <input type="number" value={formData.price} onChange={(e) => update('price', Number(e.target.value))} className={inputClass} min={0} step={0.01} required />
            </div>

            <div>
              <label className={labelClass}>Stock</label>
              <input type="number" value={formData.stock} onChange={(e) => update('stock', Number(e.target.value))} className={inputClass} min={0} required />
            </div>
          </div>

          <div className="bg-charcoal-dark border border-silver/5 rounded-sm p-6 space-y-4">
            <h3 className="font-display text-lg text-silver uppercase tracking-wider mb-2">Organization</h3>

            <div>
              <label className={labelClass}>Category</label>
              <select value={formData.category} onChange={(e) => update('category', e.target.value)} className={inputClass}>
                {WATCH_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-charcoal capitalize">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => update('featured', e.target.checked)}
                className="w-4 h-4 accent-gold"
              />
              <span className="font-body text-sm text-silver/40 group-hover:text-silver/60 transition-colors">
                Featured Product
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              type="submit"
              className="w-full h-12 bg-gold text-obsidian font-body text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-gold/90 transition-colors"
            >
              <Save className="w-4 h-4" />
              {initialData ? 'Update Product' : 'Create Product'}
            </button>
            <button
              type="button"
              className="w-full h-12 border border-silver/10 text-silver/40 font-body text-sm tracking-widest uppercase flex items-center justify-center hover:border-gold/30 hover:text-gold transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
