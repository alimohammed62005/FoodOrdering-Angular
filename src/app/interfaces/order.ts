import { OrderItem } from './order-item';

export interface Order {
  orderId: number;
  customerId: number;
  restaurantId: number;
  totalPrice: number;
  items: OrderItem[];
}
