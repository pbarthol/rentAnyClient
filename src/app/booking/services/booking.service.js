"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var booking_1 = require('../models/booking');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/Rx');
require('rxjs/add/operator/catch');
var BookingService = (function () {
    function BookingService(http, configurationService) {
        this.http = http;
        this.configurationService = configurationService;
        this._bookingurl = this.configurationService.bookingUrl;
        this._userbookingsurl = this.configurationService.bookingUserUrl;
        this._accommodationbookingsurl = this.configurationService.bookingsAccommodationUrl;
    }
    BookingService.prototype.addBooking = function (booking) {
        var _this = this;
        var body = JSON.stringify({ booking: booking });
        var lsUser = sessionStorage.getItem('rentAnyUser');
        var headers = new http_1.Headers({ 'Content-Type': 'application/json',
            'X-Access-Token': lsUser['token'] });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this._bookingurl, body, options)
            .map(function (res) {
            var booking = res.json();
            return booking;
        })
            .catch(function (error) { return _this.handleError(error); });
    };
    BookingService.prototype.getBooking = function (id) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this._bookingurl + '/' + id, options) //$('id'))
            .map(function (res) {
            var booking = res.json();
            return booking;
        })
            .catch(function (error) { return _this.handleError(error); });
    };
    BookingService.prototype.getUserBookings = function (userid) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this._userbookingsurl + '/' + userid, options) //$('id'))
            .map(function (responseData) {
            return responseData.json();
        })
            .map(function (bookings) {
            var result = [];
            if (bookings) {
                bookings.forEach(function (findBooking) {
                    var booking = new booking_1.Booking();
                    booking.user_id = findBooking.userid;
                    booking.accommodation_id = findBooking.accommodationid;
                    booking.from_date = new Date(findBooking.fromdate);
                    booking.to_date = new Date(findBooking.todate);
                    result.push(booking);
                });
            }
            return result;
        })
            .catch(this.handleError);
    };
    BookingService.prototype.getAccommodationBookings = function (accommodationid) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this._accommodationbookingsurl + '/' + accommodationid, options) //$('id'))
            .map(function (responseData) {
            return responseData.json();
        })
            .map(function (bookings) {
            var result = [];
            if (bookings) {
                bookings.forEach(function (findBooking) {
                    var booking = new booking_1.Booking();
                    booking.user_id = findBooking.userid;
                    booking.accommodation_id = findBooking.accommodationid;
                    booking.from_date = new Date(findBooking.datefrom);
                    booking.to_date = new Date(findBooking.dateto);
                    result.push(booking);
                });
            }
            return result;
        })
            .catch(this.handleError);
    };
    BookingService.prototype.handleError = function (error) {
        //    let errMsg = error || 'Server error';
        console.log(error);
        // let errMsg = (error.message) ? error.message :
        //   error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        // console.log(errMsg); // log to console instead
        // if(error instanceof Response) {
        //   return Observable.throw(error.json().error || 'Server error');
        // }
        // let errMsg = JSON.parse(error._body)['msg'];
        // return Observable.throw(errMsg || 'Server error');
        var errString = '';
        if (error.status == 500) {
            errString = error.json().error;
        }
        else {
            errString = 'Some error occured';
        }
        return Observable_1.Observable.throw(errString);
    };
    BookingService = __decorate([
        core_1.Injectable()
    ], BookingService);
    return BookingService;
}());
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map