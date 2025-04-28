import { Component, Input } from '@angular/core';
import { Product } from '../../models/product-model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  @Input() product!: Product | undefined;
  
}
