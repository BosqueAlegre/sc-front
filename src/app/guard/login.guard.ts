import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private storage: Storage,
    private router: Router,
  ) {}

  async canActivate(): Promise<boolean>  {
    const token = await this.storage.get(environment.token_key);
    if (!!token) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
