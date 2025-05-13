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

  selectedId: string | null = null;
  cartItems: { product: Product, quantity: number }[] = [];

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.updateCartState();
  }

  updateCartState() {
    const rawItems = this.cartService.getProducts();
    this.cartItems = [];

    rawItems.forEach(item => {
      this.productService.getProductById(item.id).subscribe(product => {
        if (product) {
          this.cartItems.push({ product, quantity: item.quantity });
        }
      });
    });
  }

  increaseProduct(id: string) {
    this.cartService.addProduct(id);
    this.updateCartState();
  }

  decreaseProduct(id: string) {
    this.cartService.deleteProduct(id);
    this.updateCartState();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price! * item.quantity, 0);
  }

}
