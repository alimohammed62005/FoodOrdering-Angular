import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../../interfaces/city';
import { Observable } from 'rxjs';
import { Environment } from '../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) {}

  getCities(){
    return this.http.get<City[]>(Environment.base+"City");
  }

  getCityById(id: number) {
    return this.http.get<City>(`${(Environment.base+"City")}/${id}`);
  }

  createCity(city:City) {
    return this.http.post<City>(Environment.base+"City",city);
  }

  deleteCity(id: number){
    return this.http.delete<void>(`${Environment.base+"City"}/${id}`);
  }
}
