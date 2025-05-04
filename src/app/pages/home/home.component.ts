import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product } from '../../models/product-model';
import { ProductService } from '../../services/product-service.service';
import { DarkModeService } from '../../services/dark-mode-service.service';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

    products: Product[] = [];

    constructor(
      private productService: ProductService,
      private darkModeService: DarkModeService
    ) 
    {}

    ngOnInit(): void {
      this.productService.getProductsArray().subscribe((products) => {
        this.products = products;
      });    
    }

    getTrending(): Product[] {
      return this.products.slice(0, 2);
    }


    getAppleHot(): Product[] {
      return this.products.filter(phone => phone.brand === 'Apple').slice(0, 1);
    }


    getAndroidPhones(): Product[] {
      return this.products.filter(phone => phone.brand !== 'Apple').slice(0, 1);
    }

    isDarkMode(){
      return this.darkModeService.isDarkMode();
    }
}
