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
      this.productService.getProdotti().subscribe((data: any) => {
        this.products = Object.keys(data).map((key) => { 
          data[key]['id'] = key
          return data[key] 
        }).slice(0, 3);
      })    
    }

    isDarkMode(){
      return this.darkModeService.isDarkMode();
    }
}
