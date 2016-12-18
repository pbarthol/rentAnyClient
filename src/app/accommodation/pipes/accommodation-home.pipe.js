"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var AccommodationHomePipe = (function () {
    function AccommodationHomePipe() {
    }
    AccommodationHomePipe.prototype.transform = function (items, args) {
        var filterType = args;
        return items.filter(function (item) { return item.type == filterType; });
    };
    AccommodationHomePipe = __decorate([
        core_1.Pipe({
            name: 'roFilterHome'
        })
    ], AccommodationHomePipe);
    return AccommodationHomePipe;
}());
exports.AccommodationHomePipe = AccommodationHomePipe;
//# sourceMappingURL=accommodation-home.pipe.js.map