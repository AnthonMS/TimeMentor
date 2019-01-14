import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';
import { DetailsComponent } from './details/details.component';
import { FeaturesComponent } from './features/features.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './signin/signin.component';

import { registerLocaleData } from '@angular/common';
import localeDa from '@angular/common/locales/da';
import { UserComponent } from './user/user.component';
import { RegisterTimeComponent } from './register-time/register-time.component';
import { SupportComponent } from './support/support.component';
import { SuperuserPanelComponent } from './superuser-panel/superuser-panel.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { CreateUserComponent } from './create-user/create-user.component';

registerLocaleData(localeDa, 'da');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PostsComponent,
    UsersComponent,
    DetailsComponent,
    FeaturesComponent,
    AboutComponent,
    HomeComponent,
    SigninComponent,
    UserComponent,
    RegisterTimeComponent,
    SupportComponent,
    SuperuserPanelComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    FilterPipeModule,
    BsDatepickerModule.forRoot(),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    }),
    DlDateTimePickerDateModule
  ],
  providers: [ CookieService, { provide: LOCALE_ID, useValue: 'da' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
