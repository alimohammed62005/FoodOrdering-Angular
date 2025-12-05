import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MenuItem } from '../../interfaces/menu-item';
import { Customer } from '../../interfaces/customer';

@Component({
  selector: 'app-order-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order-info.html',
  styleUrl: './order-info.scss'
})
export class OrderInfo implements OnInit {

  customerForm!: FormGroup;
  selectedItems: MenuItem[] = [];
  totalPrice: number = 0;
  restaurantId!: number;

  constructor(private router: Router, private fb: FormBuilder) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as {
      selectedItems: MenuItem[],
      totalPrice: number,
      restaurantId: number
    };

    if (state) {
      this.selectedItems = state.selectedItems;
      this.totalPrice = state.totalPrice;
      this.restaurantId = state.restaurantId;
    }

    this.customerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^(010|011|012|015)[0-9]{8}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  confirm(): void {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    const customer: Customer = this.customerForm.value;

    this.router.navigate(['/checkout'], {
      state: {
        customer: customer,
        selectedItems: this.selectedItems,
        totalPrice: this.totalPrice,
        restaurantId: this.restaurantId
      }
    });
  }

  back(): void {
    this.router.navigate(['/menu', this.restaurantId]);
  }
}
