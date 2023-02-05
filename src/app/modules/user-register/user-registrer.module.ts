import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { MaterialModule } from 'src/app/material.module';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegistrerMemberComponent } from './components/registrer-member/registrer-member.component';

import { UserRegistrerComponent } from './user-registrer/user-registrer.component';

const routes: Routes = [
  {
    path: '',
    component: UserRegistrerComponent,
  },
];

@NgModule({
  declarations: [UserRegistrerComponent, RegistrerMemberComponent],
  imports: [
    IonicModule.forRoot(),
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
  providers: [ExportExcelService],
})
export class UserRegistrerModule {}
