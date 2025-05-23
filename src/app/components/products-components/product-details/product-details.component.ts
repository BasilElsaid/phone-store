import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product-model';
import { DarkModeService } from '../../../services/dark-mode-service.service';
import { CartService } from '../../../services/cart-service.service';
import { DarkModeBackgroundDirective } from '../../../directives/dark-mode-background.directive';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink, CommonModule, DarkModeBackgroundDirective],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  @Input() product!: Product;

  constructor(
    private darkModeService: DarkModeService,
    private cartService: CartService
  ){}

  addToCart() {
    this.cartService.addProduct(this.product.id!);
  }


}
