import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';
import { LoginGuard } from './guard/login.guard';
import { LoginModule } from './modules/login/login.module';
import { UserRegistrerModule } from '../app/modules/user-register/user-registrer.module';
import { SearchModule } from './modules/search/search.module';
import { HomePageModule } from './home/home.module';
import { AdminsPageModule } from './modules/admins/admins.module';
import { SuperAdminGuard } from './guard/superAdmin.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => HomePageModule,
      },
      {
        path: 'admins',
        loadChildren: () => AdminsPageModule,
        canActivate: [SuperAdminGuard]
      },
      {
        path: 'register',
        loadChildren: () => UserRegistrerModule,
      },
      {
        path: 'search',
        loadChildren: () => SearchModule,
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () => LoginModule,
    canActivate: [LoginGuard],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
  {
    path: 'admins',
    loadChildren: () => import('./modules/admins/admins.module').then( m => m.AdminsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
