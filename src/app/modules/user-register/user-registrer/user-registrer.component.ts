import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RegistrerMemberComponent } from '../components/registrer-member/registrer-member.component';
import { MatTableDataSource } from '@angular/material/table';
import { Platform } from '@ionic/angular';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { AccountService } from 'src/app/services/account.service';
import { FamilyService } from 'src/app/services/family.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Person } from 'src/app/interfaces/person.interface';
import { JwtDecodeService } from 'src/app/services/jwt-decode.service';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-user-registrer',
  templateUrl: './user-registrer.component.html',
  styleUrls: ['./user-registrer.component.scss'],
})
export class UserRegistrerComponent implements OnInit {
  persons: Person[] = [];
  change: boolean;
  form = this.fb.group({
    newPassword: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  isLoading = true;
  isError = false;
  user: any;

  constructor(
    private modalCtrl: ModalController,
    public platform: Platform,
    public exportExcel: ExportExcelService,
    public accountService: AccountService,
    public familyService: FamilyService,
    public fb: FormBuilder,
    private _jwtDecodeService: JwtDecodeService,
    private storage: Storage,
    private _alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadUser();
  }

  async loadUser() {
    const token = await this.storage.get(environment.token_key);
    this.user = this._jwtDecodeService.decodeToken(token);
    this.load();
  }

  load() {
    this.isLoading = true;
    this.isError = false;
    this.familyService.getFamily(this.user.id).subscribe(
      (response) => {
        this.persons = response.persons;
        this.isLoading = false;
      },
      (error) => {
        this.isError = true;
        this.isLoading = false;
      }
    );
  }

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
      componentProps: { data: { boss: this.user.id, edit: false } },
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) this.load();
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

  async deleteMember(person: Person) {
    const alert = await this._alertController.create({
      header: 'Eliminar persona',
      message: '¿Estás seguro de realizar esta acción?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.familyService
              .deleteMemberFamily(this.user.id, person.id)
              .subscribe(async (message) => {
                const alert = await this._alertController.create({
                  header: 'Eliminar registro',
                  message,
                  buttons: ['Ok'],
                });

                await alert.present();
                this.load();
              });
          },
        },
      ],
    });

    await alert.present();
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
