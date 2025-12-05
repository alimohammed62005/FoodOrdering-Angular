import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuItem } from '../../interfaces/menu-item';
import { MenuItemService } from '../../services/menu-item/menu-item';
import { Environment } from '../../Environment/environment';
@Component({
  selector: 'app-menu',
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class Menu implements OnInit { 

  restaurantId!: number;
  menuItems: MenuItem[] = [];
  selectedItems: MenuItem[] = [];
  totalPrice: number = 0;
  ImageURL=Environment.staticfiles  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuItemService: MenuItemService
  ) {}
  
  ngOnInit(): void {
      console.log('MENU PAGE LOADED ✅');
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      console.error('Restaurant ID not found in route');
      this.router.navigate(['/home']);
      return;
    }
    this.restaurantId = Number(idParam);
    console.log('Loaded restaurantId:', this.restaurantId); 
    this.loadMenuItems();
  }
  loadMenuItems(): void {
    this.menuItemService.getByRestaurant(this.restaurantId).subscribe({
      next: (items) => {
        this.menuItems = items;
        console.log('Menu items loaded:', items); 
      },
      error: (err) => {
        console.error('Failed to load menu items:', err);
      }
    });
  }
  toggleSelection(item: MenuItem): void {
    const exists = this.selectedItems.find(i => i.id === item.id);
    if (exists) {
      this.selectedItems = this.selectedItems.filter(i => i.id !== item.id);
    } else {
      this.selectedItems.push(item);
    }
    this.calculateTotal();
  }
  calculateTotal(): void {
    this.totalPrice = this.selectedItems.reduce((sum, item) => sum + item.price, 0);
  }
  goToCustomerInfo(): void {
    if (this.selectedItems.length === 0) {
      alert('Please select at least one item.');
      return;
    }
    console.log('Selected before navigate:', this.selectedItems);
    this.router.navigate(['/customer-info'], {
      state: {
        selectedItems: this.selectedItems,
        totalPrice: this.totalPrice,
        restaurantId: this.restaurantId
      }
    });
  }
}
