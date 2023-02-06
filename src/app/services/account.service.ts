import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.url_api;
  currentUser: any;

  // constructor(private http: HttpClient) {}
  private http: HttpClient;

  constructor(private handler: HttpBackend) {
    this.http = new HttpClient(this.handler);
  }
  // INFORMACION DEL USUARIO
  me() {
    return this.http
      .get<{ message: string; me: any }>(`${this.url}/account/me`)
      .pipe(pluck('me'));
  }

  // CAMBIAR CONTRASEÑA ACTUAL
  // DEBE TENER UNA SESION ACTIVA
  changePassword(password: string, newPassword: string) {
    return this.http
      .post<{ message: string }>(`${this.url}/ccount/change-password`, {
        password,
        newPassword,
      })
      .pipe(pluck('message'));
  }
}
