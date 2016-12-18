"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/Rx');
var AddressService = (function () {
    function AddressService(http) {
        this.http = http;
        this.baseUrl = "http://maps.google.com/maps/api/geocode";
    }
    AddressService.prototype.getAddress = function (lat, lng) {
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        //return this.http.get(this.baseUrl + '/json?latlng=' + lat + ',' + lng,{headers: headers});
        return this.http.get(this.baseUrl + '/json?latlng=' + lat + ',' + lng, { headers: headers })
            .map(function (response) {
            var data = response.json();
            var returnArray = [];
            for (var key in data) {
                returnArray.push(data[key][0]);
            }
            return returnArray;
        });
    };
    AddressService = __decorate([
        core_1.Injectable()
    ], AddressService);
    return AddressService;
}());
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map