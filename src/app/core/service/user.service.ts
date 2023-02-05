import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser: any = null;
  readonly baseUrl = `${environment.url}`;

  constructor(private readonly http: HttpClient) {}

  async isUserAvailable() {
    return await new Promise((resolve) => {
      const token = sessionStorage.getItem('token');
      this.currentUser = 'user'; //Borrame

      if (!token) {
        resolve(false);
        return;
      }
      if (this.currentUser != null) {
        resolve(true);
        return;
      }
      let url = `${this.baseUrl}/auth/${Date.now()}`;
      this.http
        .get<any>(url, {
          headers: new HttpHeaders({
            'access-token': token,
          }),
        })
        .subscribe({
          next: (res) => {
            this.currentUser = res;
            resolve(true);
          },
          error: (err) => {
            resolve(false);
          },
        });
    });
  }
}
