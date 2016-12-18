"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var LoginComponent = (function () {
    function LoginComponent(router, loginService, sharedService) {
        this.router = router;
        this.loginService = loginService;
        this.sharedService = sharedService;
        this.model = {};
        this.loading = false;
        this.userIsLoggedIn = false;
        this.error = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.loginService.login(this.model.username, this.model.password)
            .subscribe(function (result) {
            if (result === true) {
                _this.sharedService.userIsLoggedIn(true);
                _this.userIsLoggedIn = true; // Show message and disable login button
                // this.sharedService.showLoginComponent(false); // Hide Login Component
                _this.loading = false;
            }
            else {
                // login failed
                _this.error = 'Username or password is incorrect';
                _this.loading = false;
            }
        }, function (error) {
            _this.error = error;
            _this.loading = false;
        });
    };
    LoginComponent.prototype.changeToRegister = function () {
        this.sharedService.showLoginComponent(false); // Hide Login Component
        this.sharedService.showRegisterComponent(true); // Show Register Component
    };
    // cancel() {
    //   this.sharedService.showLoginComponent(false); // Hide Login Component
    // }
    LoginComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-logincomponent',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map