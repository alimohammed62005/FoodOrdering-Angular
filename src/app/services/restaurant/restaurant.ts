import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Restaurant } from '../../interfaces/restaurant';
import { Environment } from '../../Environment/environment';
@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  constructor(private http: HttpClient) {}
  getAll(cityId?: number, name?: string){
    let params = new HttpParams();
    if (cityId) {
      params = params.set('cityId', cityId);
    }
    if (name) {
      params = params.set('name', name);
    }
    return this.http.get<Restaurant[]>(Environment.base+"Restaurant", { params });
  }
  getById(id: number){
    return this.http.get<Restaurant>(`${Environment.base+"Restaurant"}/${id}`);
  }
  create(data:Restaurant){
    return this.http.post<Restaurant>(Environment.base+"Restaurant", data);
  }
  update(id: number, data: Restaurant){
    return this.http.put<void>(`${Environment.base+"Restaurant"}/${id}`, data);
  }
  delete(id: number){
    return this.http.delete<void>(`${Environment.base+"Restaurant"}/${id}`);
  }
}