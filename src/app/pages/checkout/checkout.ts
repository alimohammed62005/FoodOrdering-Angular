import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService, CreateOrderDto, OrderItem } from '../../services/order/order';
import { Customer } from '../../interfaces/customer';
import { MenuItem } from '../../interfaces/menu-item';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout implements OnInit {
  customer!: Customer;
  selectedItems: MenuItem[] = [];
  totalPrice = 0;
  restaurantId!: number;
  isLoading = false;

  checkoutForm!: FormGroup;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private fb: FormBuilder
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as {
      customer: Customer;
      selectedItems: MenuItem[];
      totalPrice: number;
      restaurantId: number;
    };

    if (state) {
      this.customer = state.customer;
      this.selectedItems = state.selectedItems.map(item => ({
        ...item,
        quantity: item.quantity ?? 1
      }));
      this.totalPrice = state.totalPrice;
      this.restaurantId = state.restaurantId;
    } else {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      restaurantId: [this.restaurantId],
      totalPrice: [this.totalPrice]
    });

    this.recalculateTotal();
  }

  recalculateTotal(): void {
    this.totalPrice = this.selectedItems.reduce((total, item) => {
      const qty = item.quantity ?? 1;
      return total + (item.price * qty);
    }, 0);

    this.checkoutForm.patchValue({
      totalPrice: this.totalPrice
    });
  }

  increaseQuantity(index: number): void {
    this.selectedItems[index].quantity! += 1;
    this.recalculateTotal();
  }

  decreaseQuantity(index: number): void {
    if (this.selectedItems[index].quantity! > 1) {
      this.selectedItems[index].quantity! -= 1;
      this.recalculateTotal();
    }
  }

  removeItem(index: number): void {
    this.selectedItems.splice(index, 1);
    this.recalculateTotal();
  }

  placeOrder(): void {
    if (this.checkoutForm.invalid || this.selectedItems.length === 0) return;

    this.isLoading = true;

 const items: OrderItem[] = this.selectedItems.map(item => ({
  menuItemId: item.id,
  quantity: item.quantity ?? 1,
}));

    const order: CreateOrderDto = {
      restaurantId: this.restaurantId,
      items: items,
      totalPrice: this.totalPrice,
      customer: this.customer
    };

    this.orderService.AddOrder(order).subscribe({
      next: () => {
        alert(`Thank You ${this.customer.fullName}, Your Order Added Successfully!`);
        this.isLoading = false;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert('Failed to place order. Please try again.');
        console.error(err);
        this.isLoading = false;
      }
    });
  }
  back(): void {
    this.router.navigate(['/customer-info'], {
      state: {
        customer: this.customer,
        selectedItems: this.selectedItems,
        totalPrice: this.totalPrice,
        restaurantId: this.restaurantId
      }
    });
  }
}
