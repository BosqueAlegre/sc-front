import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminsPageRoutingModule } from './admins-routing.module';

import { AdminsPage } from './admins.page';
import { MaterialModule } from 'src/app/material.module';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminsPageRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [
    AdminsPage,
    AdminComponent
  ]
})
export class AdminsPageModule {}
