"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Subject_1 = require('rxjs/Subject');
var SharedService = (function () {
    function SharedService() {
        this.userLoggingSource = new Subject_1.Subject();
        this.userLogging$ = this.userLoggingSource.asObservable();
        this.userIsLoggedInSource = new Subject_1.Subject();
        this.userIsLoggedIn$ = this.userIsLoggedInSource.asObservable();
        this.registerSource = new Subject_1.Subject();
        this.register$ = this.registerSource.asObservable();
        this.editAccoService = new Subject_1.Subject();
        this.editAccommodation$ = this.editAccoService.asObservable();
        this.bookingFinishService = new Subject_1.Subject();
        this.booked$ = this.bookingFinishService.asObservable();
        this.changePasswordService = new Subject_1.Subject();
        this.changePassword$ = this.changePasswordService.asObservable();
        console.log('shared services started');
    }
    SharedService.prototype.showLoginComponent = function (logging) {
        this.userLoggingSource.next(logging);
    };
    SharedService.prototype.userIsLoggedIn = function (loggedIn) {
        this.userIsLoggedInSource.next(loggedIn);
    };
    SharedService.prototype.showRegisterComponent = function (registering) {
        this.registerSource.next(registering);
    };
    SharedService.prototype.editAccoStart = function (editAccommodation) {
        this.editAccoService.next(editAccommodation);
    };
    SharedService.prototype.bookingFinished = function (bookingFinish) {
        this.bookingFinishService.next(bookingFinish);
    };
    SharedService.prototype.showPWDChangeComponent = function (pwdChanging) {
        this.changePasswordService.next(pwdChanging);
    };
    SharedService = __decorate([
        core_1.Injectable()
    ], SharedService);
    return SharedService;
}());
exports.SharedService = SharedService;
//# sourceMappingURL=shared.service.js.map