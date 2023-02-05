import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';
import { LoginGuard } from './guard/login.guard';
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
    canActivate: [LoginGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'register',
        pathMatch: 'full',
      },
      {
        path: 'register',
        loadChildren: () =>
          import('../app/modules/user-register/user-registrer.module').then(
            (m) => m.UserRegistrerModule
          ),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('../app/modules/search/search.module').then(
            (m) => m.SearchModule
          ),
      },
      // {
      //   path: 'home',
      //   loadChildren: () =>
      //     import('./home/home.module').then((m) => m.HomePageModule),
      // },
    ],
  },
  // {
  //   path: 'register',
  //   loadChildren: () =>
  //     import('../app/modules/user-register/user-registrer.module').then(
  //       (m) => m.UserRegistrerModule
  //     ),
  // },
  // {
  //   path: 'home',
  //   loadChildren: () =>
  //     import('./home/home.module').then((m) => m.HomePageModule),
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
