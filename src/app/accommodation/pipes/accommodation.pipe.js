"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var AccommodationPipe = (function () {
    function AccommodationPipe() {
    }
    AccommodationPipe.prototype.transform = function (items, args) {
        var filterStrings;
        filterStrings = args.split("#");
        var filterType = (filterStrings[0] == 'all') ? '' : filterStrings[0];
        var filterNumberOfGuestsFrom = filterStrings[1];
        var filterNumberOfGuestsTo = filterStrings[2];
        var filterPriceFrom = filterStrings[3];
        var filterPriceTo = filterStrings[4];
        var filterDistance = filterStrings[5];
        if (filterType == '') {
            return items.filter(function (item) { return (item.price >= filterPriceFrom) && (item.price <= filterPriceTo) && (item.numberOfGuests >= filterNumberOfGuestsFrom) && (item.numberOfGuests <= filterNumberOfGuestsTo) && (item.distance <= filterDistance); });
        }
        else {
            return items.filter(function (item) { return (item.type == filterType) && (item.price >= filterPriceFrom) && (item.price <= filterPriceTo) && (item.numberOfGuests >= filterNumberOfGuestsFrom) && (item.numberOfGuests <= filterNumberOfGuestsTo) && (item.distance <= filterDistance); });
        }
    };
    AccommodationPipe = __decorate([
        core_1.Pipe({
            name: 'roFilter'
        })
    ], AccommodationPipe);
    return AccommodationPipe;
}());
exports.AccommodationPipe = AccommodationPipe;
//# sourceMappingURL=accommodation.pipe.js.map