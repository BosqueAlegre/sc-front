import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { AdminsService } from 'src/app/services/admins.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  formAdmin: FormGroup;
  @Input('data') data: any;

  constructor(
    private _adminsService: AdminsService,
    private _fb: FormBuilder,
    private _alertController: AlertController,
    private _modalController: ModalController
  ) { }

  ngOnInit() {
    this.formAdmin = this._fb.group({
      name: [this.data.edit ? this.data.name : '', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?)*$/)]],
      patherLastName: [this.data.edit ? this.data.patherLastName : '', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?)*$/)]],
      motherLastName: [this.data.edit ? this.data.motherLastName : '', [Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?)*$/)]],
      email: [this.data.edit ? this.data.email : '', [Validators.required, Validators.email]],
      password: [{ value: '', disabled: this.data.edit }, [Validators.required]]
    });
  }

  onSubmit() {
    this.data.edit
    ? this.updatedmin()
    : this.createAdmin();
  }

  private createAdmin() {
    this._adminsService.createAdmin(this.formAdmin.value).subscribe(async response => {
      const alert = await this._alertController.create({
        header: 'Nuevo registro',
        message: response.message,
        buttons: ['Ok']
      });

      await alert.present();
      return this._modalController.dismiss(response.user);
    });
  }

  private updatedmin() {
    this._adminsService.updateAdmin(this.data.id, this.formAdmin.value).subscribe(async response => {
      const alert = await this._alertController.create({
        header: 'Registro actualizado',
        message: response.message,
        buttons: ['Ok']
      });

      await alert.present();
      return this._modalController.dismiss(response.user);
    });
  }

  cancel() {
    return this._modalController.dismiss(null);
  }

}
