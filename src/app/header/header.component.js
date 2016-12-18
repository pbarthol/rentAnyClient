"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var HeaderComponent = (function () {
    function HeaderComponent(route, sharedService, loginService, router, locationService) {
        var _this = this;
        this.route = route;
        this.sharedService = sharedService;
        this.loginService = loginService;
        this.router = router;
        this.locationService = locationService;
        this.btnSuccess0 = false;
        this.btnSuccess1 = false;
        this.mapDiff = 300;
        this.dataChange = new core_1.EventEmitter();
        this.subscription = this.sharedService.userIsLoggedIn$.subscribe(function (loggedIn) {
            _this.userIsLoggedIn = loggedIn;
        });
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.devHeight = window.innerHeight;
        this.mapHeight = this.devHeight - this.mapDiff;
        this.btnSuccess0 = true;
        this.btnSuccess1 = true;
        this.pageListParam = 'both';
        var lsUser = sessionStorage.getItem('rentAnyUser');
        if (lsUser === null) {
            //this.userIsLoggedIn = false;
            //this.sharedService.userIsLoggedIn(false);
            this.userIsLoggedIn = false;
        }
        else {
            this.userIsLoggedIn = true;
            this.sharedService.userIsLoggedIn(true);
        }
        this.pageListParam = 'both';
        this.locationLat = this.locationService.getLocation('lat');
        if (this.locationLat == 0) {
            this.locationLat = Number(localStorage.getItem("latitude"));
            this.locationLong = Number(localStorage.getItem("longitude"));
            this.locationTown = localStorage.getItem("raLocation");
        }
        else {
            this.locationLong = this.locationService.getLocation('lng');
            this.locationTown = this.locationService.getLocation('town');
        }
        // no location data filled --> route to home page
        /* if ( (this.locationLat == 0) || (this.locationLat == undefined) ) {
          this.router.navigate(['/']);
        } */
    };
    // Used for dynamic resize the height of google map box
    HeaderComponent.prototype.ngDoCheck = function () {
        this.devHeight = window.innerHeight;
        this.mapHeight = this.devHeight - this.mapDiff;
    };
    HeaderComponent.prototype.clButton = function (b) {
        switch (b) {
            case 0:
                this.btnSuccess0 = (this.btnSuccess0) ? false : true;
                break;
            case 1:
                this.btnSuccess1 = (this.btnSuccess1) ? false : true;
                break;
        }
        if (this.btnSuccess0 && this.btnSuccess1) {
            this.pageListParam = 'both';
        }
        else if (this.btnSuccess0 && !this.btnSuccess1) {
            this.pageListParam = 'filter';
        }
        else if (!this.btnSuccess0 && this.btnSuccess1) {
            this.pageListParam = 'map';
        }
        else {
            this.pageListParam = 'none';
        }
        this.dataChange.emit(this.pageListParam);
    };
    HeaderComponent.prototype.register = function () {
        // this.sharedService.showLoginComponent(false); // Hide Login Component
        this.sharedService.showRegisterComponent(true); // Show Register Component
    };
    HeaderComponent.prototype.login = function () {
        // this.sharedService.showRegisterComponent(false); // Hide Register Component
        this.sharedService.showLoginComponent(true); // Show Login Compoenent
    };
    HeaderComponent.prototype.logout = function () {
        this.loginService.logout();
        this.sharedService.userIsLoggedIn(false);
        // this.sharedService.showLoginComponent(false);
    };
    // closeInputCompomonents() {
    //   this.sharedService.showRegisterComponent(false); // Hide Register Component
    //   this.sharedService.showLoginComponent(false); // Hide Login Component
    //   this.router.navigate(['/']);
    // }
    HeaderComponent.prototype.actionOnClose = function () {
        console.log("Modal closed");
    };
    HeaderComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();
    };
    HeaderComponent.prototype.editUser = function () {
        // this.sharedService.showLoginComponent(false); // Hide Login Component
        this.sharedService.showRegisterComponent(true); // Show Register Component
    };
    HeaderComponent.prototype.editAccommodation = function () {
        this.sharedService.showLoginComponent(false); // Hide Login Component
        this.sharedService.showRegisterComponent(false); // Hide Register Component
        // this.sharedService.editAccoStart(true); // Show Accommodation Edit Component
    };
    __decorate([
        core_1.Input()
    ], HeaderComponent.prototype, "headerID");
    __decorate([
        core_1.Input()
    ], HeaderComponent.prototype, "locationTown");
    __decorate([
        core_1.Output()
    ], HeaderComponent.prototype, "dataChange");
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styles: ["    \n    .ra-filtermap-switcher {\n      margin: 40px 0 20px 20px; \n    } \n    a.btn  {\n      padding-top: 4px;\n      padding-left: 8px;\n      height: 36px;\n    }\n    .nav a {\n      cursor: pointer;\n    }\n  "]
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map