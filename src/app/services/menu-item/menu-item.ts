import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from '../../interfaces/menu-item';
import { Observable } from 'rxjs';
import { Environment } from '../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {
  constructor(private http: HttpClient) {}
  getAll(){
    return this.http.get<MenuItem[]>(Environment.base+"MenuItem");
  }
  getById(id: number){
    return this.http.get<MenuItem>(`${Environment.base+"MenuItem"}/${id}`);
  }
  getByRestaurant(restaurantId: number){
    return this.http.get<MenuItem[]>(`${Environment.base+"MenuItem"}/ByRestaurant/${restaurantId}`);
  }
  create(menuItem: MenuItem) {
    return this.http.post<MenuItem>(Environment.base+"MenuItem", menuItem);
  }
  update(id: number, menuItem: MenuItem){
    return this.http.put<void>(`${Environment.base+"MenuItem"}/${id}`, menuItem);
  }
  delete(id: number) {
    return this.http.delete<void>(`${Environment.base+"MenuItem"}/${id}`);
  }
}
