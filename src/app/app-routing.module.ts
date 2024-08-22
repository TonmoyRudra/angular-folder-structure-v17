import { MainLayoutComponent } from './component/common/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./component/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./component/main/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'roster',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./component/main/roster/roster.module').then(
        (m) => m.RosterModule,
      ),
  }, 
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
