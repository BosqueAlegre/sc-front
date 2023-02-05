import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MatPaginator } from '@angular/material/paginator';
import { RegistrerMemberComponent } from '../components/registrer-member/registrer-member.component';
import { MatTableDataSource } from '@angular/material/table';
import { Platform } from '@ionic/angular';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
export interface IUser {
  _id: string;
  ci: number;
  name: string;
  patherLastName: string;
  motherLastName: string;
  email?: string;
  phone?: string;
  gender: string;
  dateOfBirth: number;
  familyBoss?: boolean;
  admin?: any;
  boss?: any;
  family?: string;
  apartment?: string;
}
@Component({
  selector: 'app-user-registrer',
  templateUrl: './user-registrer.component.html',
  styleUrls: ['./user-registrer.component.scss'],
})
export class UserRegistrerComponent implements OnInit {
  constructor(
    private modalCtrl: ModalController,
    public platform: Platform,
    public exportExcel: ExportExcelService
  ) {}
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'name',
    'last_name',
    'fn',
    'ci',
    'e',
    'des',
    'options',
  ];
  dataSource: MatTableDataSource<IUser>;
  ngOnInit() {
    this.setData(this.borrarTabla);
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: RegistrerMemberComponent,
      componentProps: { datos: { dato: null, edit: false } },
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    data.dateOfBirth = +data.dateOfBirth;
    if (data) {
      this.borrarTabla.unshift(data);
      this.setData(this.borrarTabla);
    }
  }
  setData(users: IUser[]) {
    this.borrarTabla = users;
    this.dataSource = new MatTableDataSource(users);
    this.dataSource.paginator = this.paginator;
  }
  borrarTabla: IUser[] = [
    {
      _id: 'sdasdasd',
      name: 'pepe',
      patherLastName: 'grillo',
      motherLastName: 'grillo',
      gender: 'M',
      ci: 111,
      dateOfBirth: 1676592000000,
      // enfermedad: false,
      // desEnfermedad: '',
    },
    {
      _id: 'sdasdasd',
      name: 'pepe2',
      patherLastName: 'grillo2',
      motherLastName: 'grillo2',
      gender: 'M',
      ci: 222,
      dateOfBirth: 1676592000000,
      // enfermedad: false,
      // desEnfermedad: '',
    },
    {
      _id: 'sdasdasd',
      name: 'pepe3',
      patherLastName: 'grillo3',
      motherLastName: 'grillo3',
      gender: 'M',
      ci: 333,
      dateOfBirth: 1676592000000,
      // enfermedad: true,
      // desEnfermedad: 'gripe',
    },
  ];
  formatDate(date: any) {
    let d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} `;
  }
  async edit(dat: any) {
    const modal = await this.modalCtrl.create({
      component: RegistrerMemberComponent,
      componentProps: { datos: { dato: dat, edit: true } },
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data);
    if (data) {
      //EDITAR LLAMAR A SERVICIO Y PASAS EL ID
    }
  }
  delete(id: any) {
    console.log('elimino');
  }

  async addFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.click();
    input.onchange = async (ev: any) => {
      const file: File = ev.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      await this.exportExcel.import(file);
    };
  }
}
