import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RosterRoutingModule } from './roster-routing.module';
import { RosterAddComponent } from './roster-add/roster-add.component';
import { SharedModule } from '../../../shared/modules/share.module';
import { DevExtremeModule } from '../../../shared/modules/devExtreme.module';
import {
  BsDatepickerModule,
  BsDatepickerConfig,
} from 'ngx-bootstrap/datepicker';
 import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [
     RosterAddComponent,
   ],
  imports: [
    CommonModule,
    RosterRoutingModule,
    SharedModule,
    DevExtremeModule,
    BsDatepickerModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
})
export class RosterModule {}
