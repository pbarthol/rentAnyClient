"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var booking_1 = require('./models/booking');
var BookingComponent = (function () {
    function BookingComponent(bookingService, route, sharedService, elementRef) {
        this.bookingService = bookingService;
        this.route = route;
        this.sharedService = sharedService;
        this.currentDate = new Date();
        this.opened = false;
        this.elementRef = elementRef;
        this.currentDate = new Date();
        this.day = this.currentDate.getDate();
        this.month = this.currentDate.getMonth();
        this.year = this.currentDate.getFullYear();
    }
    BookingComponent.prototype.ngOnInit = function () {
        this.errorMessage = "";
        this.bookingOk = false; // hide Popup
        this.newBooking = new booking_1.Booking();
        this.newBooking.accommodation_id = this.route.snapshot.params['id'];
        var rentAnyUser = JSON.parse(sessionStorage.getItem('rentAnyUser'));
        this.newBooking.user_id = rentAnyUser.userid;
    };
    BookingComponent.prototype.book = function () {
        var _this = this;
        var dummyDate = new Date();
        var minutesToUTC = dummyDate.getTimezoneOffset(); // Difference to UTC in minutes
        // Get Values of Date pickers
        var pickerFrom = jQuery(this.elementRef.nativeElement).find('#dateFrom').pickadate('picker').get();
        // Check is arrival date chosen
        if (pickerFrom === "") {
            // this.errorMessage = 'Please enter a arrival date!';
            this.errorMessage = 'Bitte wählen Sie ein Anreisedatum!';
            return;
        }
        var milliseconds = Date.parse(pickerFrom);
        // add n hour(s) because mongodb will save the date as utc
        milliseconds = milliseconds + (minutesToUTC * 60 * 1000 * -1);
        this.newBooking.from_date = new Date(milliseconds);
        // Check is arrival date chosen
        var pickerTo = jQuery(this.elementRef.nativeElement).find('#dateTo').pickadate('picker').get();
        if (pickerTo === "") {
            // this.errorMessage = 'Please enter a departure date!';
            this.errorMessage = 'Bitte wählen Sie ein Abreisedatum!';
            return;
        }
        milliseconds = Date.parse(pickerTo);
        milliseconds = milliseconds + (minutesToUTC * 60 * 1000 * -1);
        this.newBooking.to_date = new Date(milliseconds);
        // check is departure date after arrival date
        if (this.newBooking.to_date.getTime() < this.newBooking.from_date.getTime()) {
            // this.errorMessage = 'Departure date must be later or equal arrival date!';
            this.errorMessage = 'Abreisedatum kann nicht vor dem Anreisedatum sein!';
            return;
        }
        // Check are there already booked date between arrvial date and departure date
        // Caution UTC correction!
        var whishBookDate = new Date(this.newBooking.from_date.getTime());
        milliseconds = whishBookDate.getTime();
        milliseconds = milliseconds + (minutesToUTC * 60 * 1000);
        whishBookDate = new Date(milliseconds);
        while (whishBookDate <= this.newBooking.to_date) {
            for (var i = 0; i < this.disabledDates.length; i++) {
                if (whishBookDate.getTime() === this.disabledDates[i].getTime()) {
                    // this.errorMessage = 'Some days are already booked!';
                    this.errorMessage = 'In Ihrem gewünschten Zeitraum sind ein(ige) Tag(e) bereits ausgebucht!';
                    return;
                }
            }
            whishBookDate.setDate(whishBookDate.getDate() + 1);
        }
        // ready for booking
        this.bookingService.addBooking(this.newBooking).subscribe(function (x) {
            _this.sharedService.bookingFinished(true);
            _this.bookingOk = true;
            document.getElementById('openModalBookingOkButton').click();
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    BookingComponent.prototype.ngAfterViewInit = function () {
        this.doJQueryInit();
    };
    BookingComponent.prototype.doJQueryInit = function () {
        var _this = this;
        // Caution ngAfterViewInit comes before ngInit!
        this.bookingService
            .getAccommodationBookings(this.newBooking.accommodation_id)
            .subscribe(function (res) {
            _this.accommodationBookings = res;
            var disableDates = [];
            for (var _i = 0, _a = _this.accommodationBookings; _i < _a.length; _i++) {
                var booking = _a[_i];
                var bookDate = booking.from_date;
                while (bookDate <= booking.to_date) {
                    disableDates.push(new Date(bookDate.getFullYear(), bookDate.getMonth(), bookDate.getDate()));
                    // disableDates.push(bookDate);
                    bookDate.setDate(bookDate.getDate() + 1);
                }
            }
            _this.disabledDates = disableDates;
            jQuery(_this.elementRef.nativeElement).find('#dateFrom').pickadate({
                disable: _this.disabledDates
            });
            jQuery(_this.elementRef.nativeElement).find('#dateFrom').pickadate('picker').set('min', new Date(_this.year, _this.month, _this.day));
            jQuery(_this.elementRef.nativeElement).find('#dateTo').pickadate({
                disable: _this.disabledDates
            });
            jQuery(_this.elementRef.nativeElement).find('#dateTo').pickadate('picker').set('min', new Date(_this.year, _this.month, _this.day));
        }, function (error) { return _this.errorMessage = error; });
    };
    BookingComponent.prototype.closeBookingModal = function () {
        this.bookingOk = false; // Falls Booking nochmals aufgerufen wird
        document.getElementById('closeModalBookingOkButton').click(); // Close Modal Component
    };
    BookingComponent = __decorate([
        core_1.Component({
            selector: 'app-booking',
            templateUrl: './booking.component.html',
            styleUrls: ['./booking.component.css']
        }),
        __param(3, core_1.Inject(core_1.ElementRef))
    ], BookingComponent);
    return BookingComponent;
}());
exports.BookingComponent = BookingComponent;
//# sourceMappingURL=booking.component.js.map