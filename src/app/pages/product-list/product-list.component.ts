import { Component } from '@angular/core';
import { Product } from '../../models/product-model';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product-service.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductDetailsComponent } from '../../components/product-details/product-details.component';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, CommonModule, ProductDetailsComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  products: Product[] = [];
  //  TAKEN FROM THE PRODUCT CARD
  selectedId: string | null = null;

  constructor(private productService: ProductService) 
  {}

  ngOnInit(): void {
    this.aggiorna()
  }
  
  aggiorna(): void {
    this.productService.getProdotti().subscribe((data: any) => {
      this.products = Object.keys(data).map((key) => { 
        data[key]['id'] = key
        return data[key] 
      })
    })
  }

  onToggle(id: string) {
    this.selectedId = this.selectedId === id ? null : id;
  }

  get selectedProduct(): Product | undefined {
    return this.products.find(p => p.id === this.selectedId);
  }
}
