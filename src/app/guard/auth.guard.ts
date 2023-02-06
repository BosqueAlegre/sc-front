import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    public router: Router,
    private storage: Storage,
  ) {}

  async canActivate(): Promise<boolean> {
    const token = await this.storage.get(environment.token_key);
    if (!!token) return true;
    this.router.navigate(['/login']);
    return false;
  }
}
