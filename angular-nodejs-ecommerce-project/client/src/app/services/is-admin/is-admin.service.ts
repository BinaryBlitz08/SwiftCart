import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { UserServiceService } from '../user/user-service.service';
@Injectable({
  providedIn: 'root',
})
export class IsAdminService implements CanActivate {
  constructor(
    private userService: UserServiceService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.userService.isAdmin()) {
      return true;
    }
    this.router.navigate(['/profile']);
    return false;
  }
}
