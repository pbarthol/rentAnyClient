"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var AccommodationListComponent = (function () {
    function AccommodationListComponent() {
    }
    AccommodationListComponent.prototype.ngOnInit = function () {
        if (this.arrFilter) {
            this.argFilter = '';
            for (var _i = 0, _a = this.arrFilter; _i < _a.length; _i++) {
                var i = _a[_i];
                this.argFilter = this.argFilter + i + '#';
            }
        }
    };
    AccommodationListComponent.prototype.ngDoCheck = function () {
        if (this.arrFilter) {
            this.argFilter = '';
            for (var _i = 0, _a = this.arrFilter; _i < _a.length; _i++) {
                var i = _a[_i];
                this.argFilter = this.argFilter + i + '#';
            }
        }
    };
    __decorate([
        core_1.Input()
    ], AccommodationListComponent.prototype, "listParam");
    __decorate([
        core_1.Input()
    ], AccommodationListComponent.prototype, "accommodations");
    __decorate([
        core_1.Input()
    ], AccommodationListComponent.prototype, "arrFilter");
    AccommodationListComponent = __decorate([
        core_1.Component({
            selector: 'app-accommodation-list',
            templateUrl: './accommodation-list.component.html'
        })
    ], AccommodationListComponent);
    return AccommodationListComponent;
}());
exports.AccommodationListComponent = AccommodationListComponent;
//# sourceMappingURL=accommodation-list.component.js.map