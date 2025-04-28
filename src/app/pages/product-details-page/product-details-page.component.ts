import { Component } from '@angular/core';
import { Product } from '../../models/product-model';
import { ProductService } from '../../services/product-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductCarouselComponent } from "../../components/product-carousel/product-carousel.component";

@Component({
  selector: 'app-product-details-page',
  imports: [CommonModule, RouterLink, ProductCarouselComponent],
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.css'
})
export class ProductDetailsPageComponent {

   product: Product | undefined;
    //  TAKEN FROM THE PRODUCT CARD
    selectedId: number | null = null;
  
    constructor(
      private productService: ProductService, 
      private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if(id){
        this.productService.getProductById(id).subscribe((prodotto) => {
          this.product = prodotto;
        });
      }
    }

}
