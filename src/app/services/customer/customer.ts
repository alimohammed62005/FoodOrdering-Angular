// src/app/core/services/customer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../../interfaces/customer';
import { Observable } from 'rxjs';
import { Environment } from '../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) {}
  create(customer: Customer) {
    return this.http.post<Customer>(Environment.base+"Customer", customer,{responseType:'text' as 'json'});
  }
}
