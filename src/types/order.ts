export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  _id?: string;
  id?: string;
  orderNumber: string;
  items: OrderItem[];
  customer: {
    name: string;
    email: string;
  };
  shippingAddress: ShippingAddress;
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
