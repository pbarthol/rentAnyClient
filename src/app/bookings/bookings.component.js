"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var booking_service_1 = require('../booking/services/booking.service');
var BookingsComponent = (function () {
    function BookingsComponent(bookingService, route, router) {
        this.bookingService = bookingService;
        this.route = route;
        this.router = router;
    }
    BookingsComponent.prototype.ngOnInit = function () {
        var lsUser = sessionStorage.getItem('rentAnyUser');
        if (lsUser === null)
            this.router.navigate(['/login']);
        else {
            lsUser = JSON.parse(lsUser);
            this.userid = lsUser['userid'];
            this.getBookings();
        }
    };
    BookingsComponent.prototype.getBookings = function () {
        var _this = this;
        var bookings = this.bookingService
            .getUserBookings(this.userid)
            .subscribe(function (res) { return _this.bookings = res; }, function (error) { return _this.errorMessage = error; });
    };
    BookingsComponent = __decorate([
        core_1.Component({
            selector: 'app-bookings',
            templateUrl: './bookings.component.html',
            styleUrls: ['./bookings.component.css'],
            providers: [booking_service_1.BookingService]
        })
    ], BookingsComponent);
    return BookingsComponent;
}());
exports.BookingsComponent = BookingsComponent;
//# sourceMappingURL=bookings.component.js.map