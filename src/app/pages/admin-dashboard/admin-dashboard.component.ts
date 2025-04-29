import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product-service.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

productForm!: FormGroup;
isSubmitting: boolean = false;

constructor(
  private fb: FormBuilder,
  private productService: ProductService
){}

ngOnInit(): void {
  this.productForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [null, [Validators.required, Validators.min(0)]],
    imageUrl: ['', Validators.required],
    specs: this.fb.group({
      chipset: [''],
      display: [''],
      camera: [''],
      frontCamera: [''],
      battery: [''],
      charging: [''],
      os: [''],
      build: ['']
    }),
    images: this.fb.array([
      this.fb.control(''),
      this.fb.control('')
    ])
  });
}

onSubmit(): void {

  if (this.productForm.valid && !this.isSubmitting) {
    this.isSubmitting = true;
    const newProduct = this.productForm.value;
    console.log('New product submitted:', newProduct);
    this.productService.insertProdotto(newProduct).subscribe({
      next: (response) => {
        console.log('Product successfully added:', response);
        this.productForm.reset();
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Error adding product:', err);
        this.isSubmitting = false;
      }
    });

  } else {
    console.log('Form is invalid');
  }
}

}
