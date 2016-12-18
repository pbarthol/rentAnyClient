"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var accommodation_1 = require('../models/accommodation');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/Rx');
require('rxjs/add/operator/catch');
var AccommodationService = (function () {
    function AccommodationService(http, configuration) {
        this.http = http;
        this.configuration = configuration;
        this._accommodationurl = this.configuration.accommodationUrl;
        this._accommodationlistsurl = this.configuration.accommodationListUrl;
    }
    // Add one accommodation object on the server
    AccommodationService.prototype.addOneAccommodation = function (accommodation) {
        var body = JSON.stringify({ accommodation: accommodation });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this._accommodationurl, body, options)
            .map(function (res) {
            var accommodation = res.json();
            return accommodation;
        })
            .catch(this.handleError);
    };
    AccommodationService.prototype.getAccommodation = function (id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this._accommodationurl + '/' + id, options) //$('id'))
            .map(function (res) {
            var accommodation = res.json();
            var acco = new accommodation_1.Accommodation();
            acco._id = accommodation._id;
            acco.description = accommodation.description;
            acco.town = accommodation.town;
            acco.thumbnail = accommodation.thumbnail;
            acco.avatar = accommodation.avatar;
            acco.type = accommodation.type;
            acco.numberOfGuests = accommodation.numberOfBathrooms;
            acco.price = accommodation.price;
            acco.lat = accommodation.lat;
            acco.lng = accommodation.lng;
            acco.numberOfBeds = accommodation.numberOfBathrooms;
            acco.numberOfBathrooms = accommodation.numberOfBathrooms;
            acco.zipcode = accommodation.zipcode;
            acco.canton = accommodation.canton;
            acco.country = accommodation.country;
            acco.category = accommodation.category;
            acco.setting = accommodation.setting;
            acco.rules = accommodation.rules;
            acco.rulesText = accommodation.rulesText;
            acco.headerImage = accommodation.headerImage;
            acco.images = accommodation.images;
            acco.username = accommodation.username;
            acco.distance = accommodation.distance;
            acco.sel = accommodation.sel;
            acco.ownerid = accommodation.ownerid;
            return acco;
        })
            .catch(this.handleError);
    };
    AccommodationService.prototype.getAccommodations = function () {
        return this.http.get(this._accommodationlistsurl)
            .map(function (responseData) {
            return responseData.json();
        })
            .map(function (accommodations) {
            var result = [];
            if (accommodations) {
                accommodations.forEach(function (accommodation) {
                    // let acco = <Accommodation>accommodation;
                    var acco = new accommodation_1.Accommodation();
                    acco._id = accommodation._id;
                    acco.title = accommodation.title;
                    acco.description = accommodation.description;
                    acco.town = accommodation.town;
                    acco.thumbnail = accommodation.thumbnail;
                    acco.avatar = accommodation.avatar;
                    acco.type = accommodation.type;
                    acco.numberOfGuests = accommodation.numberOfBathrooms;
                    acco.price = accommodation.price;
                    acco.lat = accommodation.lat;
                    acco.lng = accommodation.lng;
                    acco.numberOfBeds = accommodation.numberOfBathrooms;
                    acco.numberOfBathrooms = accommodation.numberOfBathrooms;
                    acco.zipcode = accommodation.zipcode;
                    acco.canton = accommodation.canton;
                    acco.country = accommodation.country;
                    acco.category = accommodation.category;
                    acco.setting = accommodation.setting;
                    acco.rules = accommodation.rules;
                    acco.rulesText = accommodation.rulesText;
                    acco.headerImage = accommodation.headerImage;
                    acco.images = accommodation.images;
                    acco.username = accommodation.username;
                    acco.distance = accommodation.distance;
                    acco.sel = accommodation.sel;
                    acco.ownerid = accommodation.ownerid;
                    result.push(acco);
                });
            }
            return result;
        })
            .catch(this.handleError);
    };
    AccommodationService.prototype.handleError = function (error) {
        //    let errMsg = error || 'Server error';
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        return Observable_1.Observable.throw(errMsg);
    };
    AccommodationService = __decorate([
        core_1.Injectable()
    ], AccommodationService);
    return AccommodationService;
}());
exports.AccommodationService = AccommodationService;
//# sourceMappingURL=accommodation.service.js.map