import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { AdminsService } from 'src/app/services/admins.service';
import { FamilyService } from 'src/app/services/family.service';

@Component({
  selector: 'registrer-member',
  templateUrl: './registrer-member.component.html',
  styleUrls: ['./registrer-member.component.scss'],
})
export class RegistrerMemberComponent implements OnInit {
  form: FormGroup;
  @Input('data') data: any;

  constructor(
    private _fb: FormBuilder,
    private modalCtrl: ModalController,
    private _familyService: FamilyService,
    private _alertController: AlertController,
    private _adminsService: AdminsService
  ) {}

  ngOnInit() {
    this.form = this._fb.group({
      ci: [
        this.data.edit ? this.data.ci : '',
        [Validators.required, Validators.pattern(/^[V|E|J|P][0-9]{5,9}$/)],
      ],
      name: [
        this.data.edit ? this.data.name : '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?)*$/
          ),
        ],
      ],
      patherLastName: [
        this.data.edit ? this.data.patherLastName : '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?)*$/
          ),
        ],
      ],
      motherLastName: [
        this.data.edit ? this.data.motherLastName : '',
        [
          Validators.pattern(
            /^[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?)*$/
          ),
        ],
      ],
      email: [
        this.data.edit ? this.data.email : '',
        [Validators.required, Validators.email],
      ],
      phone: [
        this.data.edit ? this.data.phone : '',
        [
          Validators.required,
          Validators.pattern(/^(0212|0414|0424|0412|0416|0426)[-][0-9]{7}$/g),
        ],
      ],
      gender: [this.data.edit ? this.data.gender : '', [Validators.required]],
      dateOfBirth: [
        this.data.edit
          ? new Date(this.data.dateOfBirth).toISOString().substr(0, 10)
          : '',
        [Validators.required],
      ],
      apartment: [
        this.data.edit ? this.data.apartment : '',
        [Validators.required],
      ],
      // password: [{ value: '', disabled: this.data.edit }, [Validators.required]]
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.data.edit
    ? this.updateMember()
    : this.addMember();
  }

  private addMember() {
    const sendData = JSON.parse(JSON.stringify(this.form.value))
    sendData.dateOfBirth = Date.parse(sendData.dateOfBirth.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$2/$3/$1'));
    this._familyService.addMember(this.data.boss, sendData).subscribe(async response => {
      const alert = await this._alertController.create({
        header: 'Miembro agregado',
        message: response.message,
        buttons: ['Ok']
      });

      await alert.present();
      return this.modalCtrl.dismiss(response.person);
    })
  }

  private updateMember() {
    const sendData = JSON.parse(JSON.stringify(this.form.value))
    sendData.dateOfBirth = Date.parse(sendData.dateOfBirth.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$2/$3/$1'));
    this._familyService.updateMember(this.data.boss, this.data.id, sendData).subscribe(async response => {
      const alert = await this._alertController.create({
        header: 'Miembro actualizado',
        message: response.message,
        buttons: ['Ok']
      });

      await alert.present();
      return this.modalCtrl.dismiss(response.person);
    })
  }
}
