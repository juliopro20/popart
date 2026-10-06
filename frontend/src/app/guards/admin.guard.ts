import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('popart_admin_token');

  if (token) {
    return true;
  }

  // Redirect to admin login if no token is found
  router.navigate(['/admin/login']);
  return false;
};