import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/common/header/header.component';
import { FooterComponent } from './component/common/footer/footer.component';
import { MenuComponent } from './component/common/menu/menu.component';
import { MainLayoutComponent } from './component/common/main-layout/main-layout.component';
import { SharedModule } from 'src/app/shared/modules/share.module';
import { AuthGuard } from './gaurd/auth.guard';
import { PBCPMAdminGuard } from './gaurd/admin.guard';
import { DevExtremeModule } from './shared/modules/devExtreme.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExcelExportService } from './services/ExcelExport/ExcelExport.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {
  BsDatepickerModule,
  BsDatepickerConfig,
} from 'ngx-bootstrap/datepicker';
import bootstrap from 'bootstrap';
import { TokenInterceptor } from './shared/interceptor/token/token.interceptor';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { PreparerGuard } from './gaurd/preparer.guard';
 
@NgModule({
  declarations: [	
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    MainLayoutComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // JwtModule,
    SharedModule,
    DevExtremeModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter,
    //     allowedDomains: [
    //       'localhost:7136',
    //       '192.168.103.14:4560',
    //       'hrissub.bsrm.com',
    //     ],
    //     disallowedRoutes: [],
    //   },
    // },
    // ),
    TabsModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    PBCPMAdminGuard,
    PreparerGuard,
    ExcelExportService,
    BsDatepickerConfig,
     {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
