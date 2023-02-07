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
import { HTTP_JWT_INTERCEPTOR } from './shared/services/jwt.interceptor';
import { HTTP_ERROR_INTERCEPTOR } from './shared/services/error.interceptor';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HTTP_LOADING_INTERCEPTOR } from './shared/services/loading.interceptor';
import { SuperAdminGuard } from './guard/superAdmin.guard';

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
    IonicStorageModule.forRoot(),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthGuard,
    LoginGuard,
    SuperAdminGuard,
    MenuService,
    UserService,
    HTTP_JWT_INTERCEPTOR,
    HTTP_ERROR_INTERCEPTOR,
    HTTP_LOADING_INTERCEPTOR
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
