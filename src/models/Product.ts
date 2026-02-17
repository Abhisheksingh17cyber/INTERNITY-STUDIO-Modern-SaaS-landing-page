import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
  specs: Map<string, string>;
  category: string;
  stock: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true },
    images: [{ type: String }],
    specs: { type: Map, of: String, default: {} },
    category: {
      type: String,
      required: true,
      enum: ['dive', 'dress', 'chronograph', 'skeleton', 'limited-edition'],
    },
    stock: { type: Number, required: true, min: 0, default: 0 },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        if (ret.specs instanceof Map) {
          ret.specs = Object.fromEntries(ret.specs);
        }
        delete ret.__v;
        return ret;
      },
    },
  }
);

ProductSchema.index({ slug: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ featured: 1 });
ProductSchema.index({ name: 'text', description: 'text' });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
