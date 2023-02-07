import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'registrer-member',
  templateUrl: './registrer-member.component.html',
  styleUrls: ['./registrer-member.component.scss'],
})
export class RegistrerMemberComponent implements OnInit {
  @Input('datos') datos: any;

  constructor(
    private readonly fb: FormBuilder,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    if (this.datos.edit) {
      this.datos.dato.dateOfBirth = new Date(this.datos.dato.dateOfBirth)
        .toISOString()
        .split('T')[0];
      this.form.patchValue(this.datos.dato);
    }
  }
  formatDate(date: any) {
    let d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} `;
  }
  form = this.fb.group({
    ci: [
      '',
      [
        Validators.maxLength(11),
        Validators.minLength(3),
        Validators.pattern(/^[V|E|J|P][0-9]{5,9}$/),
      ],
    ],
    name: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?)*$/
        ),
      ],
    ],
    patherLastName: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?)*$/
        ),
      ],
    ],
    motherLastName: [
      '',
      [
        Validators.pattern(
          /^[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?)*$/
        ),
      ],
    ],
    email: ['', []],
    phone: [
      '',
      [Validators.pattern(/^(0212|0414|0424|0412|0416|0426)[-][0-9]{7}$/g)],
    ],
    gender: ['', [Validators.required]],
    dateOfBirth: ['', [Validators.required]],
    familyBoss: ['', []],
    admin: ['', []],
    boss: ['', []],
    family: ['', []],
    apartment: ['', []],
    // enfermedad: [false],
    // desEnfermedad: [''],
    // ci: { type: 'string', required: true, unique: true, regex: sails.config.custom.REG_EXP_CI },
    // password: { type: 'string', required: true },
    // name: { type: 'string', maxLength: 50, minLength: 2, regex: sails.config.custom.REG_EXP_NAME },
    // patherLastName: { type: 'string', maxLength: 50, minLength: 2, regex: sails.config.custom.REG_EXP_NAME },
    // motherLastName: { type: 'string', maxLength: 50, minLength: 2, regex: sails.config.custom.REG_EXP_NAME },
    // email: { type: 'string', isEmail: true },
    // phone: { type: 'string', regex: sails.config.custom.REG_EXP_PHONE },
    // gender: { type: 'string', isIn: sails.config.custom.GENDER_TYPES },
    // dateOfBirth: { type: 'number' },
    // familyBoss: { type: 'boolean', defaultsTo: false },
    // admin: { model: 'User' },
    // boss: { model: 'Person' },
    // family: { collection: 'Person', via: 'boss' },
  });

  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string = '';
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    let d = Date.parse(String(this.form.value.dateOfBirth));
    this.form.controls.dateOfBirth.setValue(String(d));
    return this.modalCtrl.dismiss(this.form.value, 'data');
  }
}
