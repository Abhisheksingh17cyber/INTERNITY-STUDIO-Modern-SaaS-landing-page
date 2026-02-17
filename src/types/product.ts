export interface Product {
  _id?: string;
  id?: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
  specs: Record<string, string>;
  category: string;
  stock: number;
  featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: 'price-asc' | 'price-desc' | 'newest' | 'name';
  page?: number;
  limit?: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}
