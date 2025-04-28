import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  
  
  @Input() productCard!: Product;
  @Input() selectedProductId: string | null = null;
  @Output() toggle = new EventEmitter<string>();

  @Input() showDetailsButton: boolean = true;

  showButton() {
    this.toggle.emit(this.productCard.id);
  }

}
