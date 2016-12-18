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
        this.userIsLogging = false;
        this.userIsLoggedIn = false;
        this.subscription = sharedService.userLogging$.subscribe(function (showLogging) {
            if (showLogging == true) {
                _this.userIsLogging = true;
                document.getElementById('openModalLoginButton').click();
            }
            // else {
            //   document.getElementById('closeModalLoginButton').click();
            //   this.userIsLogging = false;
            //   // document.getElementById('modLogin').remove();
            // }
        });
        this.subscription2 = sharedService.register$.subscribe(function (registering) {
            _this.registeringStarted = registering;
            if (registering == true)
                document.getElementById('openModalRegisterButton').click();
            else
                document.getElementById('closeModalRegisterButton').click();
        });
        this.subscription3 = sharedService.changePassword$.subscribe(function (passwordChanging) {
            _this.changePassword = passwordChanging;
            if (passwordChanging == true)
                document.getElementById('openModalChangePWDButton').click();
            else
                document.getElementById('closeModalChangePWDButton').click();
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
    // closeLogin() {
    //   this.sharedService.showLoginComponent(false);
    //   // document.getElementById('closeModalLoginButton').click(); // Close Modal Component
    // }
    FooterComponent.prototype.closeRegister = function () {
        this.sharedService.showRegisterComponent(false);
        // document.getElementById('closeModalRegisterButton').click(); // Close Modal Component
    };
    FooterComponent.prototype.closeChangePassword = function () {
        this.sharedService.showPWDChangeComponent(false);
        this.sharedService.showRegisterComponent(true);
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