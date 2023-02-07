import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalController } from '@ionic/angular';
import { filter } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { RegistrerMemberComponent } from '../../user-register/components/registrer-member/registrer-member.component';
import { IUser } from '../../user-register/user-registrer/user-registrer.component';

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
    public accountService: AccountService,
    private modalCtrl: ModalController
  ) {}
  displayedColumns: string[] = [
    'name',
    'patherLastName',
    'gender',
    'ci',
    'dateOfBirth',
  ];
  dataSource: MatTableDataSource<any>;
  usersAll: IUser[] = [];
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
    this.setData(this.usersAll);

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
    this.mens = this.usersAll.filter((data) => {
      return data.gender == 'M';
    });
    this.womens = this.usersAll.filter((data) => {
      return data.gender == 'F';
    });
    this.a = this.usersAll.filter((data: any) => {
      return data.apartment[0] == 'A';
    });
    this.b = this.usersAll.filter((data: any) => {
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
      filter = this.usersAll.filter((data: any) => {
        return data.apartment[0] == 'A';
      });
      // this.dataSource = new MatTableDataSource(filter);
      this.setData(filter);
    } else if (this.tower == 'B') {
      filter = this.usersAll.filter((data: any) => {
        return data.apartment[0] == 'B';
      });
      // this.dataSource = new MatTableDataSource(filter);
      this.setData(filter);
    } else {
      // this.dataSource = new MatTableDataSource(this.usersAll);
      this.setData(this.usersAll);
    }
  }
  limpiarTorre() {
    this.tower = '';
    let filter = [];

    if (this.gender == 'M') {
      filter = this.usersAll.filter((data: any) => {
        return data.gender == 'M';
      });
      // this.dataSource = new MatTableDataSource(filter);
      this.setData(filter);
    } else if (this.gender == 'F') {
      filter = this.usersAll.filter((data: any) => {
        return data.gender == 'F';
      });
      // this.dataSource = new MatTableDataSource(filter);
      this.setData(filter);
    } else {
      // this.dataSource = new MatTableDataSource(this.usersAll);
      this.setData(this.usersAll);
    }
  }

  setData(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }
  export() {
    this.exportExcel.exportExcel(this.dataSource.filteredData);
  }

  async agregar() {
    const modal = await this.modalCtrl.create({
      component: RegistrerMemberComponent,
      componentProps: { datos: { dato: null, edit: false } },
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    data.dateOfBirth = +data.dateOfBirth;
    if (data) {
      data.apartment = this.user.apartment;
      data.role = 'JEFE DE FAMILIA';
      console.log(data);

      // this.borrarTabla.unshift(data);
      this.setData(this.usersAll);
    }
  }
}
