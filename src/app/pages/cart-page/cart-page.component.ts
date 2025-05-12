import { Component, Input } from '@angular/core';
import { DarkModeBackgroundDirective } from '../../directives/dark-mode-background.directive';
import { ActivatedRoute, RouterLink } from '@angular/router';
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

cartProductIds: string[] = [];
products: Product[] = [];
selectedId: string | null = null;


constructor(
  private cartService: CartService,
  private productService: ProductService
) {}

ngOnInit() {
  this.refreshCart();
}

prepareProducts() {
  this.cartProductIds.forEach(id => {
    this.productService.getProductById(id).subscribe(product => {
      this.products.push(product);
    });
  });
}

deleteProduct(id: string) {
  this.cartService.deleteProduct(id);
  this.refreshCart();
}

refreshCart() {
  this.cartProductIds = this.cartService.getProducts();
  this.products = []; // clear before re-adding
  this.cartProductIds.forEach(id => {
    this.productService.getProductById(id).subscribe(product => {
      this.products.push(product);
    });
  });
}

}
