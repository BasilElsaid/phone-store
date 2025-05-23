import { Component } from '@angular/core';
import { Product } from '../../models/product-model';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product-service.service';
import { ProductCardComponent } from '../../components/products-components/product-card/product-card.component';
import { ProductDetailsComponent } from '../../components/products-components/product-details/product-details.component';
import { DarkModeBackgroundDirective } from '../../directives/dark-mode-background.directive';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart-service.service';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, CommonModule, ProductDetailsComponent, DarkModeBackgroundDirective, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  products: Product[] = [];
  selectedId: string | null = null;
  filter: 'All' | 'Apple' | 'Android' = 'All';
  cartItemsCount: number = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) 
  {}

  ngOnInit(): void {
    this.productService.getProductsArray().subscribe((products) => {
      this.products = products;
    });

    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemsCount = count;
    });   
  }

  onToggle(id: string) {
    this.selectedId = this.selectedId === id ? null : id;
  }

  get selectedProduct(): Product | undefined {
    return this.products.find(p => p.id === this.selectedId);
  }

  setFilter(type: 'All' | 'Apple' | 'Android') {
    this.filter = type;
  }

  get filteredProducts(): Product[] {
    if (this.filter === 'Apple') {
      return this.getApplePhones();
    } else if (this.filter === 'Android') {
      return this.getAndroidPhones();
    }
    return this.products;
  }

  getAndroidPhones(): Product[] {
    return this.products.filter(phone => phone.brand !== 'Apple');
  }


  getApplePhones(): Product[] {
    return this.products.filter(phone => phone.brand === 'Apple');
  }

  closeAlert(): void {
    this.selectedId = null;
  }

}
