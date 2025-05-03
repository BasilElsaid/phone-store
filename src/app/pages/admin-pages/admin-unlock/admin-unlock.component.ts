import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-unlock',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-unlock.component.html',
  styleUrl: './admin-unlock.component.css'
})
export class AdminUnlockComponent {
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.authService.isAdmin(this.password)) {
      alert('Correct password!');
      localStorage.setItem('isAdmin', this.password);
      this.router.navigate(['admin/dashboard']);
    } else {
      alert('Incorrect password');
    }
  }
}
