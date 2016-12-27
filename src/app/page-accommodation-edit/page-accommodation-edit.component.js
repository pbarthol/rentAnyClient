"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var PageAccommodationEditComponent = (function () {
    function PageAccommodationEditComponent(route, router, accommodationService, addressService, sharedService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.accommodationService = accommodationService;
        this.addressService = addressService;
        this.sharedService = sharedService;
        this.progress = 0;
        this.response = {};
        this.accommodations = [];
        this.objAccommodation = {};
        this.accTypes = [];
        this.accCategoriesT1 = [];
        this.accCategoriesT2 = [];
        this.accCategoriesT3 = [];
        this.markers = [];
        this.headerID = 3;
        this.zoom = 8;
        this.clicked = 0;
        this.subscription = sharedService.userIsLoggedIn$.subscribe(function (loggedIn) { return _this.userIsLoggedIn = loggedIn; });
    }
    PageAccommodationEditComponent.prototype.ngOnInit = function () {
        this.accommodationSaved = false;
        this.statObjDescription = true;
        this.statObjAddress = false;
        this.statObjSettings = false;
        this.statObjImages = false;
        this.currentStep = 1;
        this.accTypes = ['Unterkunft', 'Büro/Gewerberaum', 'Event Location'];
        this.accCategoriesT1 = ['Zimmer', 'Wohnung', 'Haus', 'Villa', 'Schloss', 'Hütte', 'Baumhaus', 'Zelt', 'Hausboot', 'Andere'];
        this.accCategoriesT2 = ['Büro', 'Atelier', 'Praxis', 'Coworking Space', 'Gewerberaum', 'Ladenlokal', 'Pop-up Store', 'Lagerhalle', 'Werkstatt', 'Andere'];
        this.accCategoriesT3 = ['Partyraum', 'Seminarraum', 'Kursraum', 'Festhütte', 'Festzelt', 'Event Location', 'Waldhütte', 'Andere'];
        this.objAccommodation.type = 1;
        var lsUser = sessionStorage.getItem('rentAnyUser');
        if (lsUser != null) {
            this.userId = JSON.parse(lsUser).userid;
        }
        console.log('1 - numberOfGuests: ', this.objAccommodation.numberOfGuests);
        console.log('1 - numberOfBeds: ', this.objAccommodation.numberOfBeds);
        console.log('1 - numberOfBathrooms: ', this.objAccommodation.numberOfBathrooms);
        this.objAccommodation.numberOfGuests = 0;
        this.objAccommodation.numberOfBeds = 0;
        this.objAccommodation.numberOfBathrooms = 0;
        this.objAccommodation.setting = {
            "kitchen": 0,
            "washingmachine": 0,
            "dryer": 0,
            "dishwasher": 0,
            "tv": 0,
            "wlan": 0,
            "balcony": 0,
            "garden": 0,
            "elevator": 0,
            "accessibility": 0,
            "view": 0,
            "parking": 0,
            "chimney": 0,
            "pool": 0,
            "privateoff": 0,
            "openoff": 0,
            "meetingroom": 0,
            "printer": 0,
            "cafeteria": 0,
            "restaurant": 0,
            "toilettes": 0,
            "fitness": 0,
            "reception": 0,
            "heater": 0,
            "electricity": 0,
            "beamer": 0,
            "bar": 0,
            "dishes": 0,
            "fridge": 0,
            "grill": 0,
            "catering": 0,
            "dancefloor": 0,
            "music": 0,
            "lightingsystem": 0
        };
        console.log('2 - numberOfGuests: ', this.objAccommodation.numberOfGuests);
        console.log('2 - numberOfBeds: ', this.objAccommodation.numberOfBeds);
        console.log('2 - numberOfBathrooms: ', this.objAccommodation.numberOfBathrooms);
        // coords of Sachseln, Center of CH
        this.latMap = 46.867160;
        this.lngMap = 8.239378;
        // this.route.params.forEach((params: Params) => {
        //   let id = +params['id']; // (+) converts string 'id' to a number
        //   this.accommodation = this.accommodationService.getAccommodationByID(id);
        // });
        this.zone = new core_1.NgZone({ enableLongStackTrace: false });
        this.basicOptions = {
            url: 'http://api.ng2-uploader.com:10050/upload'
        };
    };
    PageAccommodationEditComponent.prototype.clButton = function (b) {
        switch (b) {
            case 1:
                this.currentStep = 1;
                this.statObjDescription = true;
                break;
            case 2:
                this.currentStep = 2;
                this.statObjDescription = true;
                this.statObjAddress = true;
                break;
            case 3:
                this.currentStep = 3;
                this.statObjDescription = true;
                this.statObjAddress = true;
                this.statObjSettings = true;
                break;
            case 4:
                this.currentStep = 4;
                this.statObjDescription = true;
                this.statObjAddress = true;
                this.statObjSettings = true;
                this.statObjImages = true;
                break;
        }
    };
    PageAccommodationEditComponent.prototype.mapClicked = function (m) {
        var _this = this;
        var addressData = [];
        if (this.clicked < 1) {
            this.markers.push({
                lat: m[0],
                lng: m[1]
            });
            this.latMap = m[0];
            this.lngMap = m[1];
            console.log('markers(1): ', this.markers, ' / new Long/Lat: ', m[0], ' ', m[1]);
            var addressData_1 = [];
            this.addressService.getAddress(m[0], m[1]).subscribe(function (data) {
                addressData_1 = data[0].address_components;
                var streetnumber;
                for (var i in addressData_1) {
                    // town
                    if (addressData_1[i].types[0] == "locality") {
                        _this.objAccommodation.town = addressData_1[i].long_name;
                    }
                    // zipcode
                    if (addressData_1[i].types[0] == "postal_code") {
                        _this.objAccommodation.zipcode = addressData_1[i].long_name;
                    }
                    // address
                    if (addressData_1[i].types[0] == "route") {
                        _this.objAccommodation.address = addressData_1[i].long_name;
                    }
                    // streetnumber
                    if (addressData_1[i].types[0] == "street_number") {
                        streetnumber = addressData_1[i].long_name;
                    }
                    // canton
                    if (addressData_1[i].types[0] == "administrative_area_level_1") {
                        _this.objAccommodation.canton = addressData_1[i].short_name;
                    }
                    // country
                    if (addressData_1[i].types[0] == "country") {
                        _this.objAccommodation.country = addressData_1[i].long_name;
                    }
                }
                // address with streetnumber
                if (streetnumber > '') {
                    _this.objAccommodation.address = _this.objAccommodation.address + ', ' + streetnumber;
                }
            });
        }
        this.clicked = 1;
    };
    PageAccommodationEditComponent.prototype.markerDragEnd = function (m, e) {
        var _this = this;
        console.log('dragEnd', m, e[0], e[1]);
        this.latMap = e[0];
        this.lngMap = e[1];
        console.log('markers(2): ', this.markers, ' / new Long/Lat: ', e[0], ' ', e[1]);
        this.markers[0].lat = e[0];
        this.markers[0].lng = e[1];
        console.log('markers(3): ', this.markers, ' / new Long/Lat: ', e[0], ' ', e[1]);
        var addressData = [];
        this.addressService.getAddress(e[0], e[1]).subscribe(function (data) {
            addressData = data[0].address_components;
            var streetnumber;
            for (var i in addressData) {
                // town
                if (addressData[i].types[0] == "locality") {
                    _this.objAccommodation.town = addressData[i].long_name;
                }
                // zipcode
                if (addressData[i].types[0] == "postal_code") {
                    _this.objAccommodation.zipcode = addressData[i].long_name;
                }
                // address
                if (addressData[i].types[0] == "route") {
                    _this.objAccommodation.address = addressData[i].long_name;
                }
                // streetnumber
                if (addressData[i].types[0] == "street_number") {
                    streetnumber = addressData[i].long_name;
                }
                // canton
                if (addressData[i].types[0] == "administrative_area_level_1") {
                    _this.objAccommodation.canton = addressData[i].short_name;
                }
                // country
                if (addressData[i].types[0] == "country") {
                    _this.objAccommodation.country = addressData[i].long_name;
                }
            }
            // address with streetnumber
            if (streetnumber > '') {
                _this.objAccommodation.address = _this.objAccommodation.address + ', ' + streetnumber;
            }
        });
    };
    PageAccommodationEditComponent.prototype.calcField = function (field, operation) {
        switch (field) {
            case 'numberOfGuests':
                this.objAccommodation.numberOfGuests = (operation == '+') ? this.objAccommodation.numberOfGuests + 1 : this.objAccommodation.numberOfGuests - 1;
                if (this.objAccommodation.numberOfGuests < 0)
                    this.objAccommodation.numberOfGuests = 0;
                break;
            case 'numberOfBeds':
                this.objAccommodation.numberOfBeds = (operation == '+') ? this.objAccommodation.numberOfBeds + 1 : this.objAccommodation.numberOfBeds - 1;
                if (this.objAccommodation.numberOfBeds < 0)
                    this.objAccommodation.numberOfBeds = 0;
                break;
            case 'numberOfBathrooms':
                this.objAccommodation.numberOfBathrooms = (operation == '+') ? this.objAccommodation.numberOfBathrooms + 1 : this.objAccommodation.numberOfBathrooms - 1;
                if (this.objAccommodation.numberOfBathrooms < 0)
                    this.objAccommodation.numberOfBathrooms = 0;
                break;
        }
    };
    PageAccommodationEditComponent.prototype.goToUpload = function () {
        this.currentStep = 4;
        this.statObjImages = true;
    };
    PageAccommodationEditComponent.prototype.selCheckboxSetting = function (value) {
        this.objAccommodation.setting[value] = (this.objAccommodation.setting[value] === 0) ? 1 : 0;
        console.log('111 checkbox setting / ', value, ' - ', this.objAccommodation.setting[value]);
        console.log('222 checkbox setting / ', value, ' - ', this.objAccommodation.setting.kitchen);
    };
    PageAccommodationEditComponent.prototype.onSubmitEditAccomodation1 = function (form) {
        console.log(form);
        this.currentStep = 2;
        this.statObjAddress = true;
    };
    PageAccommodationEditComponent.prototype.onSubmitEditAccomodation2 = function (form) {
        console.log('form: ', form);
        this.currentStep = 3;
        this.statObjSettings = true;
    };
    PageAccommodationEditComponent.prototype.onSubmitEditAccomodation3 = function (form) {
        console.log(form);
        this.currentStep = 3;
        this.statObjImages = true;
        //save Data!!!
        this.saveData();
    };
    PageAccommodationEditComponent.prototype.onSubmitEditAccomodation4 = function (form) {
        this.currentStep = 4;
        console.log(form);
    };
    PageAccommodationEditComponent.prototype.saveData = function () {
        var _this = this;
        this.accommodationSaved = true; // No doubled savings
        this.objAccommodation.lat = this.markers[0].lat;
        this.objAccommodation.lng = this.markers[0].lng;
        console.log('save: ', this.objAccommodation);
        this.objAccommodation.ownerid = this.userId;
        this.accommodationService.addOneAccommodation(this.objAccommodation).subscribe(function (acco) {
            console.log(acco);
        }, function (error) {
            console.log(error);
            _this.accommodationSaved = false;
        });
    };
    __decorate([
        core_1.Input()
    ], PageAccommodationEditComponent.prototype, "accommodation");
    PageAccommodationEditComponent = __decorate([
        core_1.Component({
            selector: 'app-page-accommodation-edit',
            templateUrl: './page-accommodation-edit.component.html',
            styles: ["  \n    input.ng-touched.ng-invalid {\n       border-bottom: solid 1px red;\n     }  \n    .sebm-google-map-container {\n      width: 100%;\n      height: 600px;\n    }\n    .ra-formDescription {\n      font-size: 18px;\n      font-weight: 600;\n      padding: 10px;\n    }\n    .form-group label, label.radioBtn {\n      font-weight: 600;\n    }\n    .btn {\n      margin-top: 15px;\n    }\n   "]
        })
    ], PageAccommodationEditComponent);
    return PageAccommodationEditComponent;
}());
exports.PageAccommodationEditComponent = PageAccommodationEditComponent;
//# sourceMappingURL=page-accommodation-edit.component.js.map