import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly STORAGE_KEY = 'cartProductIds';
  private cartProductIds: string[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  addProduct(id: string) {
    this.cartProductIds.push(id);
    this.saveToLocalStorage();
  }

  getProducts(): string[] {
    return this.cartProductIds;
  }

  clearCart() {
    this.cartProductIds = [];
    this.saveToLocalStorage();
  }

  deleteProduct(id: string) {
    const index = this.cartProductIds.indexOf(id);
    if (index > -1) {
      this.cartProductIds.splice(index, 1);
      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cartProductIds));
  }

  private loadFromLocalStorage() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    this.cartProductIds = stored ? JSON.parse(stored) : [];
  }
  
}
