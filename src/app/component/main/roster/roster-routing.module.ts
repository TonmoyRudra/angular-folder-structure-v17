import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from '../home/welcome/welcome.component';
import { AuthGuard } from 'src/app/gaurd/auth.guard';
import { RosterAddComponent } from './roster-add/roster-add.component';
 import { PreparerGuard } from 'src/app/gaurd/preparer.guard'; 
 
const routes: Routes = [
  {
    path: '',
    redirectTo:"rosterView",
    pathMatch: 'full'
  },
  {
    path: 'rosterAdd',
    component: RosterAddComponent,
    canActivate: [AuthGuard, PreparerGuard],
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RosterRoutingModule {}
