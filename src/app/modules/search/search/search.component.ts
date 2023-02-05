import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs';
import { IUser } from '../../user-register/user-registrer/user-registrer.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public fb: FormBuilder) {}
  displayedColumns: string[] = [
    'name',
    'patherLastName',
    'gender',
    'ci',
    'dateOfBirth',
  ];
  dataSource: MatTableDataSource<any>;
  ELEMENT_DATA: IUser[] = [
    {
      _id: 'sdasdasd',
      name: 'Victor',
      patherLastName: 'grillo',
      motherLastName: 'grillo',
      gender: 'M',
      ci: 111,
      dateOfBirth: 914198400000,
      // enfermedad: false,
      // desEnfermedad: '',
    },
    {
      _id: 'sdasdasd',
      name: 'Maria',
      patherLastName: 'garcia',
      motherLastName: 'patricia',
      gender: 'F',
      ci: 111,
      dateOfBirth: 75772800000,
      // enfermedad: false,
      // desEnfermedad: '',
    },
    {
      _id: 'sdasdasd',
      name: 'Orlando',
      patherLastName: 'aguiñe',
      motherLastName: 'grillo',
      gender: 'F',
      ci: 111,
      dateOfBirth: 800841600000,
      // enfermedad: false,
      // desEnfermedad: '',
    },
  ];
  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      let ageRange = filter.split('-');
      let minAge = +ageRange[0];
      let maxAge = +ageRange[1];
      let age; //= new Date().getFullYear() - new Date('1998-12-21').getFullYear();
      // if (new Date().getMonth() > new Date('1998-12-21').getMonth()) {
      //   age = new Date().getFullYear() - new Date('1998-12-21').getFullYear();
      // } else if (
      //   new Date().getMonth() == new Date('1998-12-21').getMonth() &&
      //   new Date().getDate() >= new Date('1998-12-21').getDate()
      // ) {
      //   age = new Date().getFullYear() - new Date('1998-12-21').getFullYear();
      // } else {
      //   age =
      //     new Date().getFullYear() - new Date('1998-12-21').getFullYear() - 1;
      // }
      age =
        new Date().getMonth() > new Date(data.dateOfBirth).getMonth() ||
        (new Date().getMonth() == new Date(data.dateOfBirth).getMonth() &&
          new Date().getDate() >= new Date(data.dateOfBirth).getDate())
          ? new Date().getFullYear() - new Date(data.dateOfBirth).getFullYear()
          : new Date().getFullYear() -
            new Date(data.dateOfBirth).getFullYear() -
            1;
      return minAge <= age && age <= maxAge;
    };
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  formatDate(date: any) {
    let d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} `;
  }

  desde: number;
  hasta: number;
  filterByEge() {
    console.log('Estoy');
  }
}
