import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';
import { LoginGuard } from './guard/login.guard';
import { LoginModule } from './modules/login/login.module';
import { UserRegistrerModule } from '../app/modules/user-register/user-registrer.module';
import { SearchModule } from './modules/search/search.module';
import { HomePageModule } from './home/home.module';
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
    // canActivate: [LoginGuard],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
