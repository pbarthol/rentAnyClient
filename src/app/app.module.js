"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var forms_2 = require('@angular/forms');
var app_routing_1 = require('./app.routing');
var core_2 = require('angular2-google-maps/core');
var ng2_modal_1 = require("ng2-modal");
var ng2_datetime_1 = require('ng2-datetime/ng2-datetime');
var app_component_1 = require('./app.component');
var header_component_1 = require('./header/header.component');
var page_home_component_1 = require('./page-home/page-home.component');
var page_list_component_1 = require('./page-list/page-list.component');
var page_detail_component_1 = require('./page-detail/page-detail.component');
var page_accommodation_edit_component_1 = require('./page-accommodation-edit/page-accommodation-edit.component');
var accommodation_list_component_1 = require('./accommodation/accommodation-list/accommodation-list.component');
var accommodation_teaser_component_1 = require('./accommodation/accommodation-teaser/accommodation-teaser.component');
var shared_service_1 = require('./services/shared.service');
var login_component_1 = require('./login/login.component');
var user_component_1 = require('./user/user.component');
var booking_component_1 = require('./booking/booking.component');
var bookings_component_1 = require('./bookings/bookings.component');
var ng2_file_upload_1 = require('ng2-file-upload');
var passwordchange_component_1 = require('./passwordchange/passwordchange.component');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
// Pipes
var accommodation_pipe_1 = require('./accommodation/pipes/accommodation.pipe');
var accommodation_home_pipe_1 = require('./accommodation/pipes/accommodation-home.pipe');
var accommodation_service_1 = require('./accommodation/services/accommodation.service');
// Services
var location_service_1 = require('./accommodation/services/location.service');
var address_service_1 = require('./accommodation/services/address.service');
var booking_service_1 = require('./booking/services/booking.service');
var login_service_1 = require('./login/services/login.service');
var footer_component_1 = require('./footer/footer.component');
var configuration_service_1 = require('./shared/configuration.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                page_home_component_1.PageHomeComponent,
                page_list_component_1.PageListComponent,
                page_detail_component_1.PageDetailComponent,
                page_accommodation_edit_component_1.PageAccommodationEditComponent,
                accommodation_list_component_1.AccommodationListComponent,
                accommodation_teaser_component_1.AccommodationTeaserComponent,
                accommodation_pipe_1.AccommodationPipe,
                accommodation_home_pipe_1.AccommodationHomePipe,
                login_component_1.LoginComponent,
                user_component_1.UserComponent,
                booking_component_1.BookingComponent,
                bookings_component_1.BookingsComponent,
                passwordchange_component_1.PasswordchangeComponent, footer_component_1.FooterComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_1.routing,
                forms_2.ReactiveFormsModule,
                ng2_file_upload_1.FileUploadModule,
                ng2_datetime_1.NKDatetimeModule,
                ng2_modal_1.ModalModule,
                ng2_bootstrap_1.DatepickerModule,
                core_2.AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyBYtaDq_jR9TpXxXmpzYsVuOx90fwbVPVE',
                    libraries: ["places"]
                })
            ],
            providers: [app_routing_1.appRoutingProviders,
                accommodation_service_1.AccommodationService,
                shared_service_1.SharedService,
                login_service_1.LoginService,
                booking_service_1.BookingService,
                location_service_1.LocationService,
                address_service_1.AddressService,
                configuration_service_1.ConfigurationService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map