"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var FooterComponent = (function () {
    function FooterComponent(sharedService) {
        var _this = this;
        this.sharedService = sharedService;
        this.showRegister = false;
        this.showPwdChangeComponent = false;
        this.userIsLogging = false;
        this.userIsLoggedIn = false;
        this.subscription = sharedService.userLogging$.subscribe(function (showLogging) {
            if (showLogging == true)
                _this.userIsLogging = true;
            else
                _this.userIsLogging = false;
        });
        this.subscription2 = sharedService.showRegisterComponent$.subscribe(function (registering) {
            if (registering == true)
                _this.showRegister = true;
            else
                _this.showRegister = false;
        });
        this.subscription3 = sharedService.changePassword$.subscribe(function (passwordChanging) {
            _this.changePassword = passwordChanging;
            if (passwordChanging == true)
                _this.showPwdChangeComponent = true;
            else
                _this.showPwdChangeComponent = false;
            // document.getElementById('closeModalChangePWDButton').click();
        });
        this.subscription4 = sharedService.userLogging$.subscribe(function (isLoggedIn) {
            if (isLoggedIn == true) {
                _this.userIsLoggedIn = true;
            }
            else {
                _this.userIsLoggedIn = false;
            }
        });
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent.prototype.hideLoginComponent = function () {
        this.userIsLogging = false;
        this.sharedService.showLoginComponent(false);
        // document.getElementById('closeModalLoginButton').click(); // Close Modal Component
    };
    FooterComponent.prototype.hideRegisterComponent = function () {
        this.showRegister = false;
        this.sharedService.showRegisterComponent(false);
        // document.getElementById('closeModalLoginButton').click(); // Close Modal Component
    };
    FooterComponent.prototype.hidePwdChangeComponent = function () {
        this.showPwdChangeComponent = false;
        this.sharedService.showPWDChangeComponent(false);
    };
    FooterComponent = __decorate([
        core_1.Component({
            selector: 'app-footer',
            templateUrl: './footer.component.html',
            styleUrls: ['./footer.component.css']
        })
    ], FooterComponent);
    return FooterComponent;
}());
exports.FooterComponent = FooterComponent;
//# sourceMappingURL=footer.component.js.map