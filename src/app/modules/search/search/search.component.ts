import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { IUser } from '../../user-register/user-registrer/user-registrer.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public fb: FormBuilder, public exportExcel: ExportExcelService) {}
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
      apartment: 'A4',
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
      apartment: 'A4',
    },
    {
      _id: 'sdasdasd',
      name: 'Orlando',
      patherLastName: 'aguiñe',
      motherLastName: 'grillo',
      gender: 'M',
      ci: 111,
      dateOfBirth: 800841600000,
      // enfermedad: false,
      // desEnfermedad: '',
      apartment: 'B4',
    },
  ];
  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.mens = this.dataSource.filteredData.filter((data) => {
      return data.gender == 'M';
    });
    this.womens = this.dataSource.filteredData.filter((data) => {
      return data.gender == 'F';
    });
    this.a = this.dataSource.filteredData.filter((data) => {
      return data.apartment[0] == 'A';
    });
    this.b = this.dataSource.filteredData.filter((data) => {
      return data.apartment[0] == 'B';
    });
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      let ageRange = filter.split('-');
      let minAge = +ageRange[0];
      let maxAge = +ageRange[1];
      let age; //= new Date().getFullYear() - new Date('1998-12-21').getFullYear();
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

  gender: string;
  mens: any;
  womens: any;
  changeGender(value: any) {
    this.gender = value;
    let filter = [];
    if (this.gender == 'M') {
      filter = this.mens;
      this.dataSource = new MatTableDataSource(this.mens);
    } else if (this.gender == 'F') {
      filter = this.womens;
      this.dataSource = new MatTableDataSource(this.womens);
    }
    if (this.tower == 'A') {
      filter = this.dataSource.filteredData.filter((data) => {
        return data.apartment[0] == 'A';
      });
      this.dataSource = new MatTableDataSource(filter);
    } else if (this.tower == 'B') {
      filter = this.dataSource.filteredData.filter((data) => {
        return data.apartment[0] == 'B';
      });
      this.dataSource = new MatTableDataSource(filter);
    }
  }

  tower: string;
  a: any;
  b: any;
  changeTower(value: any) {
    this.tower = value;
    let filter = [];

    if (this.tower == 'A') {
      filter = this.a;
      this.dataSource = new MatTableDataSource(this.a);
    } else if (this.tower == 'B') {
      filter = this.b;
      this.dataSource = new MatTableDataSource(this.b);
    }

    if (this.gender == 'M') {
      filter = this.dataSource.filteredData.filter((data) => {
        return data.gender == 'M';
      });
      this.dataSource = new MatTableDataSource(filter);
    } else if (this.gender == 'F') {
      filter = this.dataSource.filteredData.filter((data) => {
        return data.gender == 'F';
      });
      this.dataSource = new MatTableDataSource(filter);
    }
  }
  limpiarGenero() {
    this.gender = '';
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }
  limpiarTorre() {
    this.tower = '';
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }
  export() {
    this.exportExcel.exportExcel(this.dataSource.filteredData);
  }
}
