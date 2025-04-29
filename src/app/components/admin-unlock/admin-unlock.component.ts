import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-unlock',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-unlock.component.html',
  styleUrl: './admin-unlock.component.css'
})
export class AdminUnlockComponent {
  password: string = '';
  errorMessage: string = '';

  constructor() { }

  onSubmit(): void {
    const correctPassword = '77689';  // The hardcoded 5-digit password for admin access

    if (this.password === correctPassword) {
      // If the password matches, store the admin access state in localStorage
      localStorage.setItem('isAdmin', 'true');
      alert('Admin access granted!');
    } else {
      // If the password is incorrect, show an error message
      this.errorMessage = 'Incorrect password. Please try again.';
    }
  }
}
