import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(private _authService: AuthService) {}

  ngOnInit() {}
  menuItem = [
    {
      title: 'Registros',
      url: 'search',
      icon: 'search-outline',
      exact: true,
      click: null,
    },
    {
      title: 'Agregar Carga',
      url: 'register',
      icon: 'note_add',
      exact: true,
      click: null,
    },
  ];

  logout() {
    this._authService.logout();
  }
}
