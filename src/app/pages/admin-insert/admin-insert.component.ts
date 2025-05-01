import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product-service.service';
import { DarkModeService } from '../../services/dark-mode-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-insert',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-insert.component.html',
  styleUrl: './admin-insert.component.css'
})
export class AdminInsertComponent {

  productForm!: FormGroup;
isSubmitting: boolean = false;

constructor(
  private fb: FormBuilder,
  private productService: ProductService,
  private darkModeService: DarkModeService
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

isDarkMode(){
  return this.darkModeService.isDarkMode();
}

}
