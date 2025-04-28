import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product } from '../../models/product-model';
import { ProductService } from '../../services/product-service.service';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

    products: Product[] = [];

    constructor(private productService: ProductService) {
      this.products = this.productService.getProducts().slice(0,3);
    }

}
