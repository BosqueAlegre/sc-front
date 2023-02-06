import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { timeStamp } from 'console';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    public router: Router,
    private _authService: AuthService,
    private _alertController: AlertController
  ) {}

  form = this.fb.group({
    email: [''],
    ci: [''],
    password: ['', [Validators.required]],
  });
  formRecupera = this.fb.group({
    email: [''],
    ci: [''],
  });
  user: any;
  type: boolean;
  olvido: boolean;
  press() {
    this.user = undefined;
    this.form.controls['email'].setValidators([]);
    this.form.controls['ci'].setValidators([]);
    this.form.reset();
  }
  olvidoF() {
    this.olvido = true;
    if (this.user === 'Administrador' || this.user === 'calle') {
      this.formRecupera.controls['email'].setValidators([Validators.required]);
    } else {
      this.formRecupera.controls['ci'].setValidators([Validators.required]);
    }
  }
  ngOnInit() {}

  disabledValid(s: any) {
    if (s == 'Administrador') {
      this.form.controls['email'].setValidators([Validators.required]);
    } else if (s === 'calle' || s === 'familia') {
      this.form.controls['ci'].setValidators([Validators.required]);
    }
  }

  ingresar() {
    const sendDate = {...this.form.value};
    if (this.user === 'Administrador' || this.user === 'calle') delete sendDate.ci;
    else {
      delete sendDate.email;
      sendDate.ci = `V${sendDate.ci}`;
    }

    this._authService.login(sendDate).subscribe();
  }

  recoverPassword() {
    const sendDate = {...this.formRecupera.value};
    if (this.user === 'Administrador' || this.user === 'calle') delete sendDate.ci;
    else {
      delete sendDate.email;
      sendDate.ci = `V${sendDate.ci}`;
    }

    this._authService.recoverPassword(sendDate).subscribe((message: string) => {
      const alert = this._alertController.create({
        header: 'Recuperación de contraseña',
        message,
        buttons: ['OK'],
      });

      alert.then((alert) => alert.present());
      this.formRecupera.reset();
      this.olvido = false;
    });
  }
}
