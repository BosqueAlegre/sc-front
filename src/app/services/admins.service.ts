import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pluck } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewUser, User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminsService {
  private url = environment.url_api;

  constructor(private http: HttpClient) {}

  deleteAdmin(idAdmin: string) {
    return this.http.delete<{ message: string; user: User }>(
      `${this.url}/super-admin/admin/${idAdmin}`
    );
  }

  getAdmins() {
    return this.http.get<{ message: string; users: User[]; config: any }>(
      `${this.url}/super-admin/admin`
    );
  }

  getConfig() {
    return this.http
      .get<{ message: string; config: any }>(`${this.url}/super-admin/config`)
      .pipe(pluck('config'));
  }

  createAdmin(data: NewUser) {
    return this.http.post<{ message: string; user: User }>(
      `${this.url}/super-admin/admin`,
      data
    );
  }

  updateAdmin(idAdmin: string, data: any) {
    return this.http.put<{ message: string; user: User }>(
      `${this.url}/super-admin/admin/${idAdmin}`,
      data
    );
  }

  updateConfig(data: any) {
    return this.http.put<{ message: string }>(
      `${this.url}/super-admin/config`,
      data
    );
  }

  /////////////////////////////////////////////ADMIN
  createFamilyBoss(data: NewUser) {
    return this.http.post<{ message: string; user: User }>(
      `${this.url}/admin/family-boss`,
      data
    );
  }
}
