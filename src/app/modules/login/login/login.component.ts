import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timeStamp } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(public fb: FormBuilder, public router: Router) {}

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
    if (this.user == 'Administrador') {
      this.formRecupera.controls['email'].setValidators([Validators.required]);
    } else if (this.user == 'calle' || this.user == 'familia') {
      this.formRecupera.controls['ci'].setValidators([Validators.required]);
    }
  }
  ngOnInit() {}

  disabledValid(s: any) {
    if (s == 'Administrador') {
      this.form.controls['email'].setValidators([Validators.required]);
    } else if (s == 'calle' || s == 'familia') {
      this.form.controls['ci'].setValidators([Validators.required]);
    }
  }

  ingresar() {
    sessionStorage.setItem('token', '12345');
    this.router.navigate(['/register']);
  }
}
