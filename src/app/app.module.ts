import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './modules/menu/menu/menu.component';
import { MenuService } from './modules/menu/service/menu.service';
import { MaterialModule } from 'src/app/material.module';
import { AuthGuard } from './guard/auth.guard';
import { CoreModule } from './core/core.module';
import { LoginGuard } from './guard/login.guard';
import { UserService } from './core/service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, MenuComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    MaterialModule,
    CoreModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthGuard,
    LoginGuard,
    MenuService,
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
