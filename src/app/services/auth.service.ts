import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { environment } from '../../environments/environment';
import { pluck, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  url = environment.url_api;
  user = null;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router,
  ) {}

  login(data: any) {
    return this.http.post<{ message: string, token: string }>(`${this.url}/auth/login`, data)
      .pipe(
        tap(response => {
          this.storage.set(environment.token_key, response.token);
          this.router.navigate(['/']);
        })
      );
  }

  recoverPassword(data: any) {
    return this.http.post<{ message: string }>(`${this.url}/auth/recover`, data)
    .pipe(pluck('message'));
  }

  logout() {
    this.storage.remove(environment.token_key);
    this.router.navigate(['/login']);
  }
}
