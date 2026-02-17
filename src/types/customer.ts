export interface Customer {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  phone?: string;
  totalOrders: number;
  totalSpent: number;
  orders: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
