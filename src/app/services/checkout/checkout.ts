import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../../interfaces/customer';
import { Order } from '../../interfaces/order';
import { OrderItem } from '../../interfaces/order-item';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Environment } from '../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  constructor(private http: HttpClient) {}

  fullCheckout(customer: Customer, order: Order, items: OrderItem[]){
    return this.http.post<Customer>(Environment.base+"Customer", customer).pipe(
      switchMap((createdCustomer) => {
        order.customerId = createdCustomer.customerId!;
        return this.http.post<Order>(Environment.base+"Order", order);
      }),
      switchMap((createdOrder) => {
        const orderItemsWithOrderId = items.map(item => ({
          ...item,
          orderId: createdOrder.orderId
        }));
        const itemRequests = orderItemsWithOrderId.map(item =>
          this.http.post<OrderItem>(Environment.base+"OrderItem", item)
        );
        return forkJoin(itemRequests);
      })
    );
  }
}
