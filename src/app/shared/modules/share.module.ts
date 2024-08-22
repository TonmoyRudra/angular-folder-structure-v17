import { NgModule } from '@angular/core';
import { UploaderFromExcelComponent } from '../component/uploader-from-excel/uploader-from-excel.component';
  
import { DevExtremeModule } from './devExtreme.module';
// import { BrowserModule, CommonModule } from '@angular/platform-browser'
//import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CommonModule } from '@angular/common';
import { DepartmentDropdownComponent } from '../component/department-dropdown/department-dropdown.component';
import { PlaceOfPostingDropdownComponent } from '../component/placeOfPosting-dropdown/placeOfPosting-dropdown.component';
// import { NullWithDefaultPipe } from '../pipe/null-with-default.pipe';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
  import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
@NgModule({
  imports: [
    DevExtremeModule,
    CommonModule,
    //PaginationModule.forRoot(),
    TabsModule,
    FontAwesomeModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  declarations: [
    UploaderFromExcelComponent,
      DepartmentDropdownComponent,
    PlaceOfPostingDropdownComponent,
      // NullWithDefaultPipe
  ],
  exports: [
    UploaderFromExcelComponent,
      DepartmentDropdownComponent,
    PlaceOfPostingDropdownComponent,
      TabsModule,
    FontAwesomeModule,
  ],
})
export class SharedModule {}
