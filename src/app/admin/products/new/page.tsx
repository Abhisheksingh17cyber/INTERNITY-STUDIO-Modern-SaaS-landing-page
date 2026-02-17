import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-silver uppercase tracking-wider mb-1">New Product</h1>
        <p className="font-body text-xs text-silver/30">Add a new watch to your collection</p>
      </div>
      <ProductForm />
    </div>
  );
}
