import { AuthGuard } from '../../../gaurd/auth.guard';
import { UploaderFromExcelComponent } from './../../../shared/component/uploader-from-excel/uploader-from-excel.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'uploader',
    component: UploaderFromExcelComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
