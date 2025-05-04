import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product-model';
import { DarkModeService } from '../../../services/dark-mode-service.service';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  @Input() product!: Product | undefined;

  constructor(
    private darkModeService: DarkModeService
  ){}


  isDarkMode(){
    return this.darkModeService.isDarkMode();
  }

  
}
