import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../../models/product-model';
import { ProductService } from '../../../services/product-service.service';
import { ProductCardComponent } from '../../../components/products-components/product-card/product-card.component';
import { DarkModeBackgroundDirective } from '../../../directives/dark-mode-background.directive';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterLink, ProductCardComponent, DarkModeBackgroundDirective],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  products: Product[] = [];
  selectedId: string | null = null;
  showProducts: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.productService.getProductsArray().subscribe((products) => {
      this.products = products;
    });    
  }

  showProductsButton(){
    this.showProducts = !this.showProducts;
  }

  navigateToUpdate(id: string) {
    this.router.navigate(['admin/update', id]);
  }

  onDelete(productId: string) {
    const confirmDelete = confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      this.productService.deleteProdotto(productId).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== productId);
          alert('Product deleted successfully.');
        },
        error: (err) => {
          console.error('Failed to delete product:', err);
          alert('An error occurred while deleting the product.');
        }
      });
    }
  }

  logOut(){
    localStorage.removeItem('isAdmin');
    this.authService.signOut?.();
    this.router.navigate(['/home']);
  }

}
