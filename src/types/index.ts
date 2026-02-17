export type { Product, ProductFilters, ProductsResponse } from './product';
export type { Order, OrderItem, OrderStatus, ShippingAddress } from './order';
export type { Customer } from './customer';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
}

export interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  revenueByMonth: { month: string; revenue: number }[];
  ordersByStatus: { status: string; count: number }[];
  topProducts: { name: string; sales: number; revenue: number }[];
}
