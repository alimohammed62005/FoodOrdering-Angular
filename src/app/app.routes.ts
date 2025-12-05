import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Menu } from './pages/menu/menu';
import { Checkout } from './pages/checkout/checkout';
import {OrderInfo } from './pages/order-info/order-info';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'menu/:id', component: Menu},
  { path: 'checkout', component: Checkout },
  { path: 'customer-info', component: OrderInfo },
  { path: '**', redirectTo: 'home' }
];
