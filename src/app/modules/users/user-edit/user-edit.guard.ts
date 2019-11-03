import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserEditGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUserId = this.authService.user.id;
    const userId = +next.paramMap.get('id');

    if (currentUserId !== userId) {
      this.router.navigate(['/users', userId]);
      return false;
    }
    return true;
  }
}
