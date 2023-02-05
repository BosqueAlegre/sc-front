import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { IdleWarningComponent } from './components/idle-warning/idle-warning.component';
// import { TimeoutIdleService } from './services/timeout-idle.service';
import { MaterialModule } from '../material.module';
// import { RoleService } from './services/role.service';
// import { UserService } from './services/user.service';
// import { FilesService } from './services/files.service';
// import { UnitsService } from './services/units.service';
// import { MainLayoutComponent } from './components/main-layout/main-layout.component';
// import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
// import { NotificationHeaderComponent } from './components/notificaciones/notification-header/notification-header.component';
// import { NotificationItemComponent } from './components/notificaciones/notification-item/notification-item.component';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// import { SharedModule } from '../components/shared/shared.module';
// import { CasesService } from './services/cases.service';
// import { LogService } from './services/log.service';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [CommonModule, MaterialModule, RouterModule, IonicModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  exports: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        `${parentModule} has already been loaded. Import Core module in the AppModule only.`
      );
    }
  }
}
