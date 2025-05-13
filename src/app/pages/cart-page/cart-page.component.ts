import { Component, Input } from '@angular/core';
import { DarkModeBackgroundDirective } from '../../directives/dark-mode-background.directive';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product-service.service';
import { Product } from '../../models/product-model';
import { ProductCardComponent } from '../../components/products-components/product-card/product-card.component';
import { CartService } from '../../services/cart-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  imports: [DarkModeBackgroundDirective, ProductCardComponent, CommonModule, RouterLink],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {

products: Product[] = [];
selectedId: string | null = null;
cartItems: { id: string, quantity: number }[] = [];


constructor(
  private cartService: CartService,
  private productService: ProductService
) {}

ngOnInit() {
  this.cartItems = this.cartService.getProducts();
  this.refreshCart();
}

prepareProducts() {
  this.cartItems = this.cartService.getProducts();
  this.products = []; // Clear before reloading

  this.cartItems.forEach(item => {
    this.productService.getProductById(item.id).subscribe(product => {
      if (product) {
        this.products.push(product);
      }
    });
  });
  
}

addProduct(id: string) {
  this.cartService.addProduct(id);
  this.cartItems = this.cartService.getProducts();
  this.refreshCart();
}

deleteProduct(id: string) {
  this.cartService.deleteProduct(id);
  this.cartItems = this.cartService.getProducts();
  this.refreshCart();
}

refreshCart() {
  this.products = []; // clear before re-adding

  this.cartItems.forEach(item => {
    this.productService.getProductById(item.id).subscribe(product => {
        this.products.push(product);
    });
  });
}

getQuantity(id: string): number {
  const item = this.cartItems.find(i => i.id === id);
  return item ? item.quantity : 0;
}

}
