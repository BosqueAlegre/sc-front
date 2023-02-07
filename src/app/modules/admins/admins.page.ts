import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { AdminsService } from 'src/app/services/admins.service';
import { User } from 'src/app/interfaces/user.interface';
import { MatTableDataSource } from '@angular/material/table';
import { AdminComponent } from './admin/admin.component';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.page.html',
  styleUrls: ['./admins.page.scss'],
})
export class AdminsPage implements OnInit {

  formConfig: FormGroup;
  users: User[] = [];
  config: any = {};
  isLoading = true;
  isError = false;
  displayedColumns: string[] = [
    'name',
    'lastName',
    'email',
    'options'
  ];
  dataSource: MatTableDataSource<any>;

  constructor(
    private _adminsService: AdminsService,
    private _fb: FormBuilder,
    private _modalController: ModalController,
    private _alertController: AlertController
  ) { }

  ngOnInit() {
    this.formConfig = this._fb.group({
      familyBurden: [false, [Validators.required]]
    });

    this.load();
  }

  load() {
    this.isLoading = true;
    this.isError = false;
    this._adminsService.getAdmins().subscribe(response => {
      this.dataSource = new MatTableDataSource(response.users);
      this.users = response.users;
      this.config = response.config;
      this.isLoading = false;
    }, error => {
      this.isError = true;
      this.isLoading = false;
    });
  }

  async openModal(edit = false, values = {}) {
    const modal = await this._modalController.create({
      component: AdminComponent,
      componentProps: { data: { ...values, edit } },
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) this.load();
  }

  async deleteAdmin(user: User) {
    const alert = await this._alertController.create({
      header: 'Eliminar administrador',
      message: '¿Estás seguro de realizar esta acción?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Confirmar',
          handler: () => {
            this._adminsService.deleteAdmin(user.id).subscribe(async response => {
              const alert = await this._alertController.create({
                header: 'Eliminar registro',
                message: response.message,
                buttons: ['Ok']
              });

              await alert.present();
              this.load();
            })
          }
        }
      ]
    });
    
    await alert.present();
  }

}
