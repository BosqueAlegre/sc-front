import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pluck } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewMember, Person } from '../interfaces/person.interface';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  url = environment.url_api;

  constructor(
    private http: HttpClient
  ) { }

  getFamily(idBoss: string) {
    return this.http.get<{ message: string, persons: Person[] }>(`${this.url}/family-boss/${idBoss}/family`);
  }

  addMember(idBoss: string, member: NewMember) {
    return this.http.post<{ message: string, person: Person }>(`${this.url}/family-boss/${idBoss}/add-member`, member);
  }

  addMembers(idBoss: string, members: NewMember[]) {
    return this.http.post<{ message: string, persons: Person[] }>(`${this.url}/family-boss/${idBoss}/family`, { family: members });
  }

  deleteMemberFamily(idBoss: string, idMember: string) {
    return this.http.delete<{ message: string }>(`${this.url}/family-boss/${idBoss}/family/${idMember}`)
    .pipe(pluck('message'));
  }

  updateFamilyBoss(idBoss: string, data: any) {
    return this.http.put<{ message: string, person: Person }>(`${this.url}/family-boss/${idBoss}`, data);
  }

  updateMember(idBoss: string, idMember: string, data: any) {
    return this.http.put<{ message: string, person: Person }>(`${this.url}/family-boss/${idBoss}/family/${idMember}`, data);
  }
}
