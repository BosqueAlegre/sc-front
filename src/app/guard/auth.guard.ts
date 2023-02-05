import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../core/service/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private readonly userService: UserService,
    public router: Router
  ) {}
  async canActivate() {
    let user = await this.userService.isUserAvailable();
    console.log('ok', user);

    if (user) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
