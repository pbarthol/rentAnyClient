import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { routing, appRoutingProviders }  from './app.routing';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { ModalModule } from "ng2-modal";
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageListComponent } from './page-list/page-list.component';
import { PageDetailComponent } from './page-detail/page-detail.component';
import { PageAccommodationEditComponent } from './page-accommodation-edit/page-accommodation-edit.component';
import { AccommodationListComponent } from './accommodation/accommodation-list/accommodation-list.component';
import { AccommodationTeaserComponent } from './accommodation/accommodation-teaser/accommodation-teaser.component';
import { SharedService } from './services/shared.service';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { BookingComponent } from './booking/booking.component';
import { BookingsComponent } from './bookings/bookings.component';
import { FileUploadModule } from 'ng2-file-upload';
import { PasswordchangeComponent } from './passwordchange/passwordchange.component';
import { DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
// Pipes
import { AccommodationPipe } from './accommodation/pipes/accommodation.pipe';
import { AccommodationHomePipe } from './accommodation/pipes/accommodation-home.pipe';
import { AccommodationService } from './accommodation/services/accommodation.service';
// Services
import { LocationService } from './accommodation/services/location.service';
import { AddressService } from './accommodation/services/address.service';
import { BookingService } from './booking/services/booking.service';
import { LoginService } from './login/services/login.service';
import { FooterComponent } from './footer/footer.component';
import { ConfigurationService } from './shared/configuration.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageHomeComponent,
    PageListComponent,
    PageDetailComponent,
    PageAccommodationEditComponent,
    AccommodationListComponent,
    AccommodationTeaserComponent,
    AccommodationPipe,
    AccommodationHomePipe,
    LoginComponent,
    UserComponent,
    BookingComponent,
    BookingsComponent,
    PasswordchangeComponent, FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
    FileUploadModule,
    NKDatetimeModule,
    ModalModule,
    DatepickerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBYtaDq_jR9TpXxXmpzYsVuOx90fwbVPVE',
      libraries: ["places"]
    })
  ],
  providers: [appRoutingProviders,
    AccommodationService,
    SharedService,
    LoginService,
    BookingService,
    LocationService,
    AddressService,
    ConfigurationService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
