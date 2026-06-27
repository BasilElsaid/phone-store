import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly STORAGE_KEY = 'cartItems';
  private cartItemsCountSubject = new BehaviorSubject<number>(0);
  public cartItemCount$ = this.cartItemsCountSubject.asObservable();

  private cartItems: { id: string, quantity: number }[] = [];


  constructor() {
    this.loadFromLocalStorage();
  }

  addProduct(id: string) {
    const item = this.cartItems.find(i => i.id === id);
    if (item) {
      item.quantity++;
    } else {
      this.cartItems.push({ id, quantity: 1 });
    }
    this.saveToLocalStorage();
  }

  getProducts(): { id: string, quantity: number }[] {
    return [...this.cartItems];
  }

  clearCart() {
    this.cartItems = [];
    this.saveToLocalStorage();
  }

  deleteProduct(id: string) {
    const item = this.cartItems.find(i => i.id === id);
    if (item) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.cartItems = this.cartItems.filter(i => i.id !== id);
      }
    this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cartItems));
    this.cartItemsCountSubject.next(this.cartItemCount);
  }

  private loadFromLocalStorage() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    this.cartItems = stored ? JSON.parse(stored) : [];
    this.cartItemsCountSubject.next(this.cartItemCount);
  }

  get cartItemCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }
  
}
