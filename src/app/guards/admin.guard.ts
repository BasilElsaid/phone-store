import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Replace with real check if needed

  if (isAdmin) {
    return true;
  } else {
    router.navigate(['/home']); // Redirect if not allowed
    return false;
  }
};