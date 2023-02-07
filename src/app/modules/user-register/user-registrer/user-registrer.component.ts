import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MatPaginator } from '@angular/material/paginator';
import { RegistrerMemberComponent } from '../components/registrer-member/registrer-member.component';
import { MatTableDataSource } from '@angular/material/table';
import { Platform } from '@ionic/angular';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { AccountService } from 'src/app/services/account.service';
import { FamilyService } from 'src/app/services/family.service';
import { FormBuilder, Validators } from '@angular/forms';
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
  role?: string;
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
    public exportExcel: ExportExcelService,
    public accountService: AccountService,
    public familyService: FamilyService,
    public fb: FormBuilder
  ) {}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  user: any;
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
    this.accountService.me().subscribe((res) => {
      this.user = res;
    });
  }
  form = this.fb.group({
    newPassword: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  change: boolean;
  changePasswordOk() {
    this.accountService
      .changePassword(
        String(this.form.value.password),
        String(this.form.value.newPassword)
      )
      .subscribe((res) => {
        alert(res);
        this.cancelChange();
      });
  }
  cancelChange() {
    this.form.reset();
    this.change = false;
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: RegistrerMemberComponent,
      componentProps: { data: { edit: false } },
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
    }
  }

  setData(users: IUser[]) {
    this.borrarTabla = users;
    this.dataSource = new MatTableDataSource(users);
    this.dataSource.paginator = this.paginator;
  }
  borrarTabla: IUser[] = [];
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
      let family = await this.exportExcel.importFamilyCharge(file, this.user);
      this.familyService.addMembers(this.user.id, family).subscribe((res) => {
        console.log(res);
      });
    };
  }

  downloadModel() {
    this.exportExcel.downloadModel();
  }
}
