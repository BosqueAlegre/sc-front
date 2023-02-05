import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  menuItem = [
    {
      title: 'Buscar',
      url: 'search',
      icon: 'search-outline',
      exact: true,
      click: null,
    },
  ];
}
