"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var location_1 = require('../../accommodation/location');
var LocationService = (function () {
    function LocationService() {
        this.location = new location_1.Location(0, 0, '', '', '', '');
    }
    LocationService.prototype.getLocation = function (loc) {
        var locVar;
        switch (loc) {
            case 'lat':
                locVar = this.location.lat;
                break;
            case 'lng':
                locVar = this.location.lng;
                break;
            case 'town':
                locVar = this.location.town;
                break;
            case 'zipcode':
                locVar = this.location.zipcode;
                break;
            case 'canton':
                locVar = this.location.canton;
                break;
            case 'country':
                locVar = this.location.country;
                break;
        }
        return locVar;
    };
    LocationService.prototype.setLocation = function (lat, lng, town, zipcode, canton, country) {
        this.location.lat = lat;
        this.location.lng = lng;
        this.location.town = town;
        this.location.zipcode = zipcode;
        this.location.canton = canton;
        this.location.country = country;
    };
    LocationService = __decorate([
        core_1.Injectable()
    ], LocationService);
    return LocationService;
}());
exports.LocationService = LocationService;
//# sourceMappingURL=location.service.js.map