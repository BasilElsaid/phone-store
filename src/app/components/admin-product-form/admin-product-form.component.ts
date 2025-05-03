import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-product-form',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './admin-product-form.component.html',
  styleUrl: './admin-product-form.component.css'
})
export class AdminProductFormComponent {
  @Input() form!: FormGroup;
  @Input() isSubmitting: boolean = false;
  @Input() submitLabel: string = 'Submit';
  @Input() title: string = 'Product Form';
  @Input() onSubmitFn!: () => void;
  @Input() isDarkMode: boolean = false;
  @Input() images: any;
}
