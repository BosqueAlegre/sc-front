import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { environment } from '../../environments/environment';
import { pluck, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.url_api;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router
  ) {}
  currentUser: any;
  // INICIAR SESION
  login(data: any) {
    return this.http
      .post<{ message: string; token: string }>(`${this.url}/auth/login`, data)
      .pipe(
        tap((response) => {
          this.storage.set(environment.token_key, response.token);
          this.router.navigate(['/']);
        })
      );
  }

  // RECUPERAR CONTRASEÑA
  recoverPassword(data: any) {
    return this.http
      .post<{ message: string }>(`${this.url}/auth/recover`, data)
      .pipe(pluck('message'));
  }

  // CAMBIAR CONTRASEÑA ACTUAL
  // DEBE TENER UNA SESION ACTIVA
  changePassword(password: string, newPassword: string) {
    return this.http
      .post<{ message: string }>(`${this.url}/auth/change-password`, {
        password,
        newPassword,
      })
      .pipe(pluck('message'));
  }

  // CERRAR SESION
  logout() {
    this.storage.remove(environment.token_key);
    this.router.navigate(['/login']);
  }
}
