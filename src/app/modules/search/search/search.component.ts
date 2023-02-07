import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from 'src/app/services/account.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    public fb: FormBuilder,
    public exportExcel: ExportExcelService,
    public accountService: AccountService
  ) {}
  displayedColumns: string[] = [
    'name',
    'patherLastName',
    'gender',
    'ci',
    'dateOfBirth',
  ];
  dataSource: MatTableDataSource<any>;
  ELEMENT_DATA: any[] = [
    {
      _id: 'sdasdasd',
      name: 'Victor',
      patherLastName: 'Fernandez',
      motherLastName: 'Avendaño',
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
      patherLastName: 'Aguiñe',
      motherLastName: 'Ostos',
      gender: 'M',
      ci: 111,
      dateOfBirth: 800841600000,
      // enfermedad: false,
      // desEnfermedad: '',
      apartment: 'B4',
    },
  ];
  user: any;
  towerUser: any;
  ngOnInit() {
    this.accountService.me().subscribe((res) => {
      this.user = res;
      if (this.user?.role == 'ADMINISTRADOR' && this.user.apartment) {
        this.towerUser = this.user.apartment[0];
        //COLOCAR EL VALOR DE LOS DATOS IGUAL A LA TORRE QUE CORRESPONDA
      }
    });
    this.setData(this.ELEMENT_DATA);
    // this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      let ageRange = filter.split('-');
      let minAge = +ageRange[0];
      let maxAge = +ageRange[1];
      let age;
      age =
        new Date().getMonth() > new Date(data.dateOfBirth).getMonth() ||
        (new Date().getMonth() == new Date(data.dateOfBirth).getMonth() &&
          new Date().getDate() >= new Date(data.dateOfBirth).getDate())
          ? new Date().getFullYear() - new Date(data.dateOfBirth).getFullYear()
          : new Date().getFullYear() -
            new Date(data.dateOfBirth).getFullYear() -
            1;
      console.log(age, minAge, maxAge);
      return minAge <= age && age <= maxAge;
    };
    this.mens = this.ELEMENT_DATA.filter((data) => {
      return data.gender == 'M';
    });
    this.womens = this.ELEMENT_DATA.filter((data) => {
      return data.gender == 'F';
    });
    this.a = this.ELEMENT_DATA.filter((data: any) => {
      return data.apartment[0] == 'A';
    });
    this.b = this.ELEMENT_DATA.filter((data: any) => {
      return data.apartment[0] == 'B';
    });
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
      this.setData(this.mens);
      // this.dataSource = new MatTableDataSource(this.mens);
    } else if (this.gender == 'F') {
      filter = this.womens;
      // this.dataSource = new MatTableDataSource(this.womens);
      this.setData(this.womens);
    }
    if (this.tower == 'A') {
      filter = this.dataSource.filteredData.filter((data) => {
        return data.apartment[0] == 'A';
      });
      // this.dataSource = new MatTableDataSource(filter);
      this.setData(filter);
    } else if (this.tower == 'B') {
      filter = this.dataSource.filteredData.filter((data) => {
        return data.apartment[0] == 'B';
      });
      // this.dataSource = new MatTableDataSource(filter);
      this.setData(filter);
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
      // this.dataSource = new MatTableDataSource(this.a);
      this.setData(this.a);
    } else if (this.tower == 'B') {
      filter = this.b;
      // this.dataSource = new MatTableDataSource(this.b);
      this.setData(this.b);
    }

    if (this.gender == 'M') {
      filter = this.dataSource.filteredData.filter((data) => {
        return data.gender == 'M';
      });
      // this.dataSource = new MatTableDataSource(filter);
      this.setData(filter);
    } else if (this.gender == 'F') {
      filter = this.dataSource.filteredData.filter((data) => {
        return data.gender == 'F';
      });
      // this.dataSource = new MatTableDataSource(filter);
      this.setData(filter);
    }
  }
  limpiarGenero() {
    this.gender = '';
    let filter = [];
    if (this.tower == 'A') {
      filter = this.ELEMENT_DATA.filter((data: any) => {
        return data.apartment[0] == 'A';
      });
      // this.dataSource = new MatTableDataSource(filter);
      this.setData(filter);
    } else if (this.tower == 'B') {
      filter = this.ELEMENT_DATA.filter((data: any) => {
        return data.apartment[0] == 'B';
      });
      // this.dataSource = new MatTableDataSource(filter);
      this.setData(filter);
    } else {
      // this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.setData(this.ELEMENT_DATA);
    }
  }
  limpiarTorre() {
    this.tower = '';
    let filter = [];

    if (this.gender == 'M') {
      filter = this.ELEMENT_DATA.filter((data: any) => {
        return data.gender == 'M';
      });
      // this.dataSource = new MatTableDataSource(filter);
      this.setData(filter);
    } else if (this.gender == 'F') {
      filter = this.ELEMENT_DATA.filter((data: any) => {
        return data.gender == 'F';
      });
      // this.dataSource = new MatTableDataSource(filter);
      this.setData(filter);
    } else {
      // this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.setData(this.ELEMENT_DATA);
    }
  }

  setData(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }
  export() {
    this.exportExcel.exportExcel(this.dataSource.filteredData);
  }
}
