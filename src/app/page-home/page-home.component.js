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
var forms_1 = require("@angular/forms");
var PageHomeComponent = (function () {
    function PageHomeComponent(route, router, accommodationService, locationService, mapsAPILoader, searchElementRef) {
        this.route = route;
        this.router = router;
        this.accommodationService = accommodationService;
        this.locationService = locationService;
        this.mapsAPILoader = mapsAPILoader;
        this.headerID = 1;
        this.listParam1 = { "listID": 1, "listTitle": "Unterkünfte", "listIcon": "hotel", "listImage": "../img/unterkuenfte.jpg", "listColsize": 4, "listFilter": false };
        this.listParam2 = { "listID": 2, "listTitle": "Büros/Gewerberäume", "listIcon": "computer", "listImage": "../img/bueros.jpg", "listColsize": 4, "listFilter": false };
        this.listParam3 = { "listID": 3, "listTitle": "Event Locations", "listIcon": "local_bar", "listImage": "../img/partyraeume.jpg", "listColsize": 4, "listFilter": false };
        this.arrFilter = [];
        this.accommodations1 = [];
        this.accommodations2 = [];
        this.accommodations3 = [];
        this.searchElementRef = searchElementRef;
    }
    PageHomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Get accommodations
        var accommodations = this.accommodationService
            .getAccommodations()
            .subscribe(function (res) {
            _this.accommodations = res;
            _this.accommodations1 = _this.accommodations;
            _this.accommodations2 = _this.accommodations;
            _this.accommodations3 = _this.accommodations;
        }, function (error) { return _this.errorMessage = error; });
        this.locationSearch = "";
        this.locationFilled = false;
        this.msgError = "";
        //create search FormControl
        this.searchControl = new forms_1.FormControl();
        //set current position
        this.setCurrentPosition();
        //load Places Autocomplete
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement, {
                types: ["(regions)"]
            });
            autocomplete.addListener("place_changed", function () {
                //get the place result
                var place = autocomplete.getPlace();
                //set latitude and longitude
                _this.latitude = place.geometry.location.lat();
                _this.longitude = place.geometry.location.lng();
                _this.raLocation = place.name;
                _this.raCanton = place.address_components[2].short_name;
                _this.locationService.setLocation(_this.latitude, _this.longitude, _this.raLocation, '0', _this.raCanton, '');
                if (typeof (Storage) != "undefined") {
                    // Store
                    localStorage.setItem("latitude", "" + _this.latitude);
                    localStorage.setItem("longitude", "" + _this.longitude);
                    localStorage.setItem("raLocation", _this.raLocation);
                }
                _this.locationFilled = true;
                _this.msgError = "";
            });
        });
    };
    PageHomeComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        jQuery(this.searchElementRef.nativeElement).on('click', function () {
            _this.msgError = "";
        });
    };
    PageHomeComponent.prototype.goPageList = function () {
        if (this.locationFilled) {
            this.msgError = "";
            this.router.navigate(['accommodations/' + this.raLocation]);
        }
        else {
            this.msgError = "Bitte wähle einen gültigen Ort aus";
        }
    };
    PageHomeComponent.prototype.setCurrentPosition = function () {
        var _this = this;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.latitude = position.coords.latitude;
                _this.longitude = position.coords.longitude;
                _this.zoom = 12;
            });
        }
    };
    __decorate([
        core_1.ViewChild("search")
    ], PageHomeComponent.prototype, "searchElementRef");
    PageHomeComponent = __decorate([
        core_1.Component({
            selector: 'app-page-home',
            templateUrl: './page-home.component.html'
        }),
        __param(5, core_1.Inject(core_1.ElementRef))
    ], PageHomeComponent);
    return PageHomeComponent;
}());
exports.PageHomeComponent = PageHomeComponent;
//# sourceMappingURL=page-home.component.js.map