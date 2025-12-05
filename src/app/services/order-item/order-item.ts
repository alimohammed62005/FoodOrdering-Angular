import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderItem } from '../../interfaces/order-item';
import { Observable } from 'rxjs';
import { Environment } from '../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {
  private apiUrl = 'https://localhost:7211/api/OrderItem'; 

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<OrderItem[]>(Environment.base+"OrderItem");
  }

  getById(id: number) {
    return this.http.get<OrderItem>(`${Environment.base+"OrderItem"}/${id}`);
  }
  create(orderItem: OrderItem) {
    return this.http.post<OrderItem>(Environment.base+"OrderItem", orderItem);
  }


  update(id: number, item: OrderItem){
    return this.http.put(`${Environment.base+"OrderItem"}/${id}`, item);
  }

  delete(id: number){
    return this.http.delete(`${Environment.base+"OrderItem"}/${id}`);
  }
}
