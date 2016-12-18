"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var accommodation_1 = require('../models/accommodation');
var accommodation_service_1 = require('../services/accommodation.service');
var AccommodationEditComponent = (function () {
    // getAccommodation() {
    //   let accommodation = this.accommodationService
    //     .getAccommodation(this.id)
    //     .subscribe(res => this.accommodation = res, error => this.errorMessage = <any>error);
    // }
    function AccommodationEditComponent(accommodationService, route, router) {
        this.accommodationService = accommodationService;
        this.route = route;
        this.router = router;
        this.mode = 'Observable';
        this.id = this.route.snapshot.params['id'];
        // if (this.route.snapshot.params['id'] === 'new') {
        //   this.accommodation = new Accommodation();
        // }
        // else {
        //   this.id = this.route.snapshot.params['id'];
        //   // this.getAccommodation();
        //   let accommodation = this.accommodationService
        //     .getAccommodation(this.id)
        //     .subscribe(res => this.accommodation = res, error => this.errorMessage = <any>error);
        // }
    }
    AccommodationEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        var resultReady = false;
        if (this.id === undefined) {
            this.accommodation = new accommodation_1.Accommodation();
            this.resultReady = true;
        }
        else {
            this.sub = this.route
                .params
                .subscribe(function (params) {
                //this.selectedId = +params['id'];
                _this.accommodationService.getAccommodation(_this.id).subscribe(function (res) {
                    _this.accommodation = res;
                    _this.resultReady = true;
                    // this.accommodation = res;
                });
            });
        }
        // this.stopSub();
    };
    AccommodationEditComponent.prototype.addAccommodation = function () {
        this.accommodationService.addOneAccommodation(this.accommodation).subscribe(function (x) { return console.log(x); });
    };
    AccommodationEditComponent.prototype.book = function () {
        // user has to be logged in
        var value = sessionStorage.getItem('rentAnyUser');
        if (value === null)
            this.router.navigate(['/login']);
        else
            this.router.navigate(['/booking', this.accommodation._id]);
    };
    AccommodationEditComponent.prototype.onDestroy = function () {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    };
    AccommodationEditComponent = __decorate([
        core_1.Component({
            //moduleId: module.id,
            selector: 'app-accommodation-edit',
            templateUrl: 'accommodation-edit.component.html',
            styleUrls: ['accommodation-edit.component.css'],
            providers: [accommodation_service_1.AccommodationService]
        })
    ], AccommodationEditComponent);
    return AccommodationEditComponent;
}());
exports.AccommodationEditComponent = AccommodationEditComponent;
//# sourceMappingURL=accommodation-edit.component.js.map