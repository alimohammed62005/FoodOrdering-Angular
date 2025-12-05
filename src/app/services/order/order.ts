// src/app/services/order/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Customer } from '../../interfaces/customer';
import { MenuItem } from '../../interfaces/menu-item';
import { Environment } from '../../Environment/environment';

export interface OrderItem {
  menuItemId: number;
  quantity: number;
}
export interface CreateOrderDto {
  customerId?: number;
  customer?: Customer;
  restaurantId: number;
  items: OrderItem[];
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}
  AddOrder(order:CreateOrderDto){
    return this.http.post(Environment.base+"Order", order,{responseType:'text'});
  }
}
