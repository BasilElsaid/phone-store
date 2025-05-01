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

  @Input() showUpdateButton: boolean = false;
  @Output() updateClicked = new EventEmitter<string>();

  @Input() showDeleteButton: boolean = false;
  @Output() deleteClicked = new EventEmitter<string>();


  showDetails() {
    this.toggle.emit(this.productCard.id);
  }

  showUpdate() {
    this.updateClicked.emit(this.productCard.id);
  }

  showDelete() {
    this.deleteClicked.emit(this.productCard.id);
  }
}
