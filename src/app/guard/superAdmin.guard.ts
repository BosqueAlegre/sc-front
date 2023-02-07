import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { JwtDecodeService } from '../services/jwt-decode.service';

@Injectable({
  providedIn: 'root',
})
export class SuperAdminGuard implements CanActivate {
  constructor(
    public router: Router,
    private storage: Storage,
		private _jwtDecodeService: JwtDecodeService
  ) {}

  async canActivate(): Promise<boolean> {
    const token = await this.storage.get(environment.token_key);
		const user: any = this._jwtDecodeService.decodeToken(token);
    if (user.role === 'SUPER ADMINISTRADOR') return true;
    this.router.navigate(['/']);
    return false;
  }
}
