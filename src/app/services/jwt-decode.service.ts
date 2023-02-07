import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtDecodeService {
  constructor() {}

  decodeToken(token: string) {
    const decode = token ? jwt_decode(`${token}`) : '';
    return decode;
  }
}