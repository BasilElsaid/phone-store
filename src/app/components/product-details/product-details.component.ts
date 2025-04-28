import { Component, Input } from '@angular/core';
import { Product } from '../../models/product-model';
import { RouterLink } from '@angular/router';
import { DarkModeService } from '../../services/dark-mode-service.service';
import { CommonModule } from '@angular/common';

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
