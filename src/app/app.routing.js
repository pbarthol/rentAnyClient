"use strict";
var router_1 = require('@angular/router');
var page_accommodation_edit_component_1 = require('./page-accommodation-edit/page-accommodation-edit.component');
var page_home_component_1 = require('./page-home/page-home.component');
var page_list_component_1 = require('./page-list/page-list.component');
var page_detail_component_1 = require('./page-detail/page-detail.component');
var login_component_1 = require('./login/login.component');
var user_component_1 = require('./user/user.component');
var booking_component_1 = require('./booking/booking.component');
var bookings_component_1 = require('./bookings/bookings.component');
var passwordchange_component_1 = require('./passwordchange/passwordchange.component');
var appRoutes = [
    { path: '', component: page_home_component_1.PageHomeComponent },
    { path: 'accommodations', component: page_list_component_1.PageListComponent },
    { path: 'accommodations/:location', component: page_list_component_1.PageListComponent },
    // { path: 'accommodationlist_peter', component: AccommodationlistComponent },
    { path: 'accommodation-edit', component: page_accommodation_edit_component_1.PageAccommodationEditComponent },
    { path: 'accommodation/:id', component: page_detail_component_1.PageDetailComponent },
    { path: 'booking', component: booking_component_1.BookingComponent },
    { path: 'booking/:id', component: booking_component_1.BookingComponent },
    { path: 'bookings', component: bookings_component_1.BookingsComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'user', component: user_component_1.UserComponent },
    { path: 'user/passwordchange', component: passwordchange_component_1.PasswordchangeComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map