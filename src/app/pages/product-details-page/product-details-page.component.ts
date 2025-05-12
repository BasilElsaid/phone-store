import { Component } from '@angular/core';
import { Product } from '../../models/product-model';
import { ProductService } from '../../services/product-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductCarouselComponent } from "../../components/products-components/product-carousel/product-carousel.component";
import { DarkModeBackgroundDirective } from '../../directives/dark-mode-background.directive';
import { CartService } from '../../services/cart-service.service';

@Component({
  selector: 'app-product-details-page',
  imports: [CommonModule, RouterLink, ProductCarouselComponent, DarkModeBackgroundDirective],
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.css'
})
export class ProductDetailsPageComponent {

  product!: Product;
  //  TAKEN FROM THE PRODUCT CARD
  selectedId: number | null = null;

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.productService.getProductById(id).subscribe((prodotto) => {
        this.product = prodotto;
      });
    }
  }

  addToCart() {
    this.cartService.addProduct(this.product.id!);
  }

}
