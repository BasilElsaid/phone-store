import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const storedPassword = localStorage.getItem('isAdmin') || '';
  const isAdmin = authService.isAdmin(storedPassword);

  if (isAdmin) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }

};