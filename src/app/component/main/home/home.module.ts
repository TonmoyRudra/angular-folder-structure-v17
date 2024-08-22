import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { SharedModule } from '../../../shared/modules/share.module';
import { DevExtremeModule } from 'src/app/shared/modules/devExtreme.module';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule, DevExtremeModule],
})
export class HomeModule {}
