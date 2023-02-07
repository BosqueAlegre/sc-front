import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  url = environment.url_api;

  constructor(private http: HttpClient) {}

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
      .post<{ message: string }>(`${this.url}/account/change-password`, {
        password,
        newPassword,
      })
      .pipe(pluck('message'));
  }
}
