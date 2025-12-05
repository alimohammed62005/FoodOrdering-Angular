export interface CheckoutPayload {
  customer: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
  };
  order: {
    orderDate: string; 
    totalAmount: number;
    orderItems: OrderItemPayload[];
  };
}

export interface OrderItemPayload {
  menuItemId: number;
  quantity: number;
  itemPrice: number;
}
