import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly STORAGE_KEY = 'cartProductIds';
  private cartProductIds: string[] = [];
  private cartItemsCountSubject = new BehaviorSubject<number>(0);
  public cartItemCount$ = this.cartItemsCountSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  addProduct(id: string) {
    this.cartProductIds.push(id);
    this.saveToLocalStorage();
    this.refreshCount();
  }

  getProducts(): string[] {
    return [...this.cartProductIds];
  }

  clearCart() {
    this.cartProductIds = [];
    this.saveToLocalStorage();
    this.refreshCount();
  }

  deleteProduct(id: string) {
    const index = this.cartProductIds.indexOf(id);
    if (index > -1) {
      this.cartProductIds.splice(index, 1);
      this.saveToLocalStorage();
      this.refreshCount();
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cartProductIds));
  }

  private loadFromLocalStorage() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    this.cartProductIds = stored ? JSON.parse(stored) : [];
  }

  private refreshCount() {
    this.cartItemsCountSubject.next(this.cartProductIds.length);
  }

  get cartItemCount(): number {
    return this.cartProductIds.length;
  }
  
}
