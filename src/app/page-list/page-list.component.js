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
var PageListComponent = (function () {
    function PageListComponent(route, router, accommodationService, locationService, elementRef, cdr) {
        this.route = route;
        this.router = router;
        this.accommodationService = accommodationService;
        this.locationService = locationService;
        this.cdr = cdr;
        this.headerID = 2;
        this.listParam = { "listID": 4, "listTitle": "Alle", "listIcon": "reorder", "listImage": "", "listColsize": 8, "listFilter": true };
        this.accommodations = [];
        this.objectFilter = { "acTypeValue": "", "numberOfGuestsFrom": "", "numberOfGuestsTo": "", "priceFrom": "", "priceTo": "", "radius": "" };
        this.arrFilter = [];
        this.btnSuccess0 = false;
        this.btnSuccess1 = false;
        this.btnSuccess2 = false;
        this.btnSuccess3 = false;
        this.zoom = 9;
        this.mapDiff = 380;
        this.elementRef = elementRef;
    }
    PageListComponent.prototype.ngAfterViewInit = function () {
        this.doJQueryInit();
    };
    PageListComponent.prototype.ngOnInit = function () {
        var _this = this;
        /* this.route.params.forEach((params:Params) => {
          let raLocation:string = params['location'];
          this.locationTown = raLocation;
        }); */
        this.accommodationService
            .getAccommodations()
            .subscribe(function (res) { return _this.accommodations = res; }, function (error) { return _this.errorMessage = error; });
        console.log('Page List: ', this.accommodations);
        this.devHeight = window.innerHeight;
        this.mapHeight = this.devHeight - this.mapDiff;
        this.btnSuccess0 = true;
        this.pageListParam = 'both';
        this.objectFilter.acTypeValue = 'all';
        this.arrFilter[0] = 'all';
        this.objectFilter.numberOfGuestsFrom = "0";
        this.objectFilter.numberOfGuestsTo = "100";
        this.objectFilter.priceFrom = "0";
        this.objectFilter.priceTo = "500";
        this.objectFilter.radius = "100";
        this.colModLeft = 'col-md-6';
        this.colModRight = 'col-md-6';
        this.mtop = 315;
        this.lat = this.locationService.getLocation('lat');
        if (this.lat == 0) {
            this.lat = Number(localStorage.getItem("latitude"));
            this.lng = Number(localStorage.getItem("longitude"));
            this.locationTown = localStorage.getItem("raLocation");
        }
        else {
            this.lng = this.locationService.getLocation('lng');
            this.locationTown = this.locationService.getLocation('town');
        }
        // add distances from reference location to the accommodation objects
        this.setDistancesOfAccommodations(this.lng, this.lat);
    };
    PageListComponent.prototype.ngDoCheck = function () {
        // this.accommodations = this.accommodationService.getAccommodations();
        this.devHeight = window.innerHeight;
        this.mapHeight = this.devHeight - this.mapDiff;
        switch (this.objectFilter.acTypeValue) {
            case '1':
                this.listParam.listTitle = 'Unterkünfte';
                this.listParam.listIcon = 'hotel';
                break;
            case '2':
                this.listParam.listTitle = 'Büros/Gewerberäume';
                this.listParam.listIcon = 'computer';
                break;
            case '3':
                this.listParam.listTitle = 'Event Locations';
                this.listParam.listIcon = 'local_bar';
                break;
            default:
                this.listParam.listTitle = 'Alle';
                this.listParam.listIcon = 'reorder';
        }
        this.lat = this.locationService.getLocation('lat');
        if (this.lat == 0) {
            this.lat = Number(localStorage.getItem("latitude"));
            this.lng = Number(localStorage.getItem("longitude"));
            this.locationTown = localStorage.getItem("raLocation");
        }
        else {
            this.lng = this.locationService.getLocation('lng');
            this.locationTown = this.locationService.getLocation('town');
        }
        this.arrFilter[0] = this.objectFilter.acTypeValue;
        this.arrFilter[1] = this.objectFilter.numberOfGuestsFrom;
        this.arrFilter[2] = this.objectFilter.numberOfGuestsTo;
        this.arrFilter[3] = this.objectFilter.priceFrom;
        this.arrFilter[4] = this.objectFilter.priceTo;
        this.arrFilter[5] = this.objectFilter.radius;
        if (this.arrFilter) {
            this.argFilter = '';
            for (var _i = 0, _a = this.arrFilter; _i < _a.length; _i++) {
                var i = _a[_i];
                this.argFilter = this.argFilter + i + '#';
            }
        }
        this.doJQueryInit();
    };
    PageListComponent.prototype.onDataChange = function (data) {
        this.pageListParam = data;
        switch (this.pageListParam) {
            case 'filter':
                this.colModLeft = 'col-md-12';
                this.colModRight = '';
                this.mtop = 315;
                break;
            case 'map':
                this.colModLeft = 'col-md-6';
                this.colModRight = 'col-md-6';
                this.mtop = 195;
                break;
            case 'both':
                this.colModLeft = 'col-md-6';
                this.colModRight = 'col-md-6';
                this.mtop = 315;
                break;
            case 'none':
                this.colModLeft = 'col-md-12';
                this.colModRight = '';
                this.mtop = 195;
                break;
        }
        this.lat = this.locationService.getLocation('lat');
        if (this.lat == 0) {
            this.lat = Number(localStorage.getItem("latitude"));
            this.lng = Number(localStorage.getItem("longitude"));
            this.locationTown = localStorage.getItem("raLocation");
        }
        else {
            this.lng = this.locationService.getLocation('lng');
            this.locationTown = this.locationService.getLocation('town');
        }
        // add distances from reference location to the accommodation objects
        this.setDistancesOfAccommodations(this.lng, this.lat);
    };
    PageListComponent.prototype.clButton = function (b) {
        switch (b) {
            case 0:
                this.objectFilter.acTypeValue = 'all';
                this.arrFilter[0] = 'all';
                this.btnSuccess0 = true;
                this.btnSuccess1 = false;
                this.btnSuccess2 = false;
                this.btnSuccess3 = false;
                break;
            case 1:
                this.objectFilter.acTypeValue = '1';
                this.arrFilter[0] = '1';
                this.btnSuccess0 = false;
                this.btnSuccess1 = true;
                this.btnSuccess2 = false;
                this.btnSuccess3 = false;
                break;
            case 2:
                this.objectFilter.acTypeValue = '2';
                this.arrFilter[0] = '2';
                this.btnSuccess0 = false;
                this.btnSuccess1 = false;
                this.btnSuccess2 = true;
                this.btnSuccess3 = false;
                break;
            case 3:
                this.objectFilter.acTypeValue = '3';
                this.arrFilter[0] = '3';
                this.btnSuccess0 = false;
                this.btnSuccess1 = false;
                this.btnSuccess2 = false;
                this.btnSuccess3 = true;
                break;
        }
    };
    PageListComponent.prototype.doJQueryInit = function () {
        var _this = this;
        jQuery(this.elementRef.nativeElement).find("#sl-guest").slider({
            range: true,
            orientation: "horizontal",
            min: 0,
            max: 100,
            values: [this.objectFilter.numberOfGuestsFrom, this.objectFilter.numberOfGuestsTo],
            slide: function (event, ui) {
                _this.objectFilter.numberOfGuestsFrom = ui.values[0];
                _this.objectFilter.numberOfGuestsTo = ui.values[1];
            }
        });
        jQuery(this.elementRef.nativeElement).find("#sl-price").slider({
            range: true,
            orientation: "horizontal",
            min: 0,
            max: 500,
            values: [this.objectFilter.priceFrom, this.objectFilter.priceTo],
            slide: function (event, ui) {
                _this.objectFilter.priceFrom = ui.values[0];
                _this.objectFilter.priceTo = ui.values[1];
            }
        });
        jQuery(this.elementRef.nativeElement).find("#sl-radius").slider({
            range: false,
            orientation: "horizontal",
            min: 0,
            max: 500,
            value: this.objectFilter.radius,
            slide: function (event, ui) {
                _this.objectFilter.radius = ui.value;
            }
        });
    };
    PageListComponent.prototype.doMarkerLink = function (id) {
        this.router.navigate(['/accommodation', id]);
    };
    PageListComponent.prototype.getMarkerURL = function (sel) {
        if (sel) {
            return '/img/ra_marker_sel.png';
        }
        else {
            return '/img/ra_marker.png';
        }
    };
    // update distance within accommodations
    PageListComponent.prototype.setDistancesOfAccommodations = function (refLong, refLat) {
        for (var i in this.accommodations) {
            this.accommodations[i].distance = this.calcHaversineDistance([refLong, refLat], [this.accommodations[i].lng, this.accommodations[i].lat]);
        }
    };
    // formula for distances between 2 locations
    PageListComponent.prototype.calcHaversineDistance = function (coords1, coords2) {
        function toRad(x) {
            return x * Math.PI / 180;
        }
        var lon1 = coords1[0];
        var lat1 = coords1[1];
        var lon2 = coords2[0];
        var lat2 = coords2[1];
        var R = 6371; //km
        var x1 = lat2 - lat1;
        var dLat = toRad(x1);
        var x2 = lon2 - lon1;
        var dLon = toRad(x2);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = Math.round(R * c);
        return d;
    };
    PageListComponent = __decorate([
        core_1.Component({
            selector: 'app-page-list',
            templateUrl: './page-list.component.html',
            styles: ["    \n    h3 {\n      font-size: 18px;\n      font-weight: 500;\n      color: #22a981;\n      margin: 0 0 20px 0;\n    }\n    .btn-group {\n      margin-bottom: 10px;\n    }     \n    .col-list {\n      float: left;\n    }\n    .col-filtermap {\n      float: right;\n    }\n    .sl-input {\n      display:none;\n    }\n    .slider {\n      margin: 0 0 10px 5px;\n      max-width: 300px;\n    }\n    .sebm-google-map-container {\n      width: 100%;\n    }\n    .ra-filter p {\n      margin-bottom: 10px; \n    } \n    .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {\n      padding-left: 10px;\n      padding-right: 10px;\n    }\n  "]
        }),
        __param(4, core_1.Inject(core_1.ElementRef))
    ], PageListComponent);
    return PageListComponent;
}());
exports.PageListComponent = PageListComponent;
//# sourceMappingURL=page-list.component.js.map