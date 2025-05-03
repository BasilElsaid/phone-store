import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AdminProductFormComponent } from '../../../components/admin-product-form/admin-product-form.component';
import { Product } from '../../../models/product-model';
import { ProductService } from '../../../services/product-service.service';
import { DarkModeService } from '../../../services/dark-mode-service.service';

@Component({
  selector: 'app-admin-insert',
  imports: [CommonModule, ReactiveFormsModule, AdminProductFormComponent],
  templateUrl: './admin-update.component.html',
  styleUrl: './admin-update.component.css'
})
export class AdminUpdateComponent {
  
  product: Product | undefined;
  //  TAKEN FROM THE PRODUCT CARD
  selectedId: string | null = null;

productForm!: FormGroup;
isUpdating: boolean = false;

constructor(
  private fb: FormBuilder,
  private productService: ProductService,
  private darkModeService: DarkModeService,
  private route: ActivatedRoute,
){}

ngOnInit(): void {
  // GET THE PRODUCT
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.selectedId = id; // Store ID for the update call
    this.productService.getProductById(id).subscribe((prodotto) => {
      this.product = prodotto;
      this.productForm.patchValue({
        name: prodotto.name,
        description: prodotto.description,
        price: prodotto.price,
        imageUrl: prodotto.imageUrl,
        specs: {
          chipset: prodotto.specs?.chipset || '',
          display: prodotto.specs?.display || '',
          camera: prodotto.specs?.camera || '',
          frontCamera: prodotto.specs?.frontCamera || '',
          battery: prodotto.specs?.battery || '',
          charging: prodotto.specs?.charging || '',
          os: prodotto.specs?.os || '',
          build: prodotto.specs?.build || ''
        },
      });

      // Patch the images FormArray
      const imageControls = prodotto.images.map((img: string) => this.fb.control(img));
      this.productForm.setControl('images', this.fb.array(imageControls));
    });
  }
  

  // Form init (keep as is)
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

get images(): FormArray {
  return this.productForm.get('images') as FormArray;
}

onUpdate(): void {

  if (this.productForm.valid && !this.isUpdating) {
    this.isUpdating = true;
    const newProduct = this.productForm.value;
    console.log('New product submitted:', newProduct);
    this.productService.updateProdotto(this.selectedId!, newProduct).subscribe({
      next: (response) => {
        console.log('Product successfully added:', response);
        this.productForm.reset();
        this.isUpdating = false;
      },
      error: (err) => {
        console.error('Error adding product:', err);
        this.isUpdating = false;
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
