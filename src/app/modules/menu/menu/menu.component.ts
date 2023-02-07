import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth.service';
import { JwtDecodeService } from 'src/app/services/jwt-decode.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menuItem = [
    {
      title: 'Administradores',
      url: 'admins',
      icon: 'people',
      exact: true,
      click: null,
      role: ['SUPER ADMINISTRADOR']
    },
    {
      title: 'Registros',
      url: 'search',
      icon: 'search-outline',
      exact: true,
      click: null,
      role: ['SUPER ADMINISTRADOR', 'ADMINISTRADOR']
    },
    {
      title: 'Agregar Carga',
      url: 'register',
      icon: 'document-outline',
      exact: true,
      click: null,
      role: ['SUPER ADMINISTRADOR', 'ADMINISTRADOR', 'JEFE DE FAMILIA']
    },
  ];
  user: any;
  
  constructor(
    private _authService: AuthService,
    private _jwtDecodeService: JwtDecodeService,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.loadUser();
  }
  
  async loadUser() {
    const token = await this.storage.get(environment.token_key);
    this.user = this._jwtDecodeService.decodeToken(token);
    this.menuItem = this.menuItem.filter(value => value.role.includes(this.user.role));
  }

  logout() {
    this._authService.logout();
  }
}
