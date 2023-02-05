import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../core/service/user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard {
  constructor(public userService: UserService, public router: Router) {}
  async canActivate() {
    console.log(this.userService.currentUser);
    if (!this.userService.currentUser) {
      return true;
    } else {
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}
