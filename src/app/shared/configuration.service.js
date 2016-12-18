"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ConfigurationService = (function () {
    function ConfigurationService() {
    }
    Object.defineProperty(ConfigurationService.prototype, "loginUrl", {
        get: function () {
            return this.baseBackendUrl + 'login';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "changePasswordUrl", {
        get: function () {
            return this.baseBackendUrl + 'user/changepassword';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "userUrl", {
        get: function () {
            return this.baseBackendUrl + 'user';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "updateUserUrl", {
        get: function () {
            return this.baseBackendUrl + 'user/update';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "bookingsAccommodationUrl", {
        get: function () {
            return this.baseBackendUrl + 'bookings/accommodation';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "bookingUserUrl", {
        get: function () {
            return this.baseBackendUrl + 'booking/user';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "bookingUrl", {
        get: function () {
            return this.baseBackendUrl + 'booking';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "accommodationListUrl", {
        get: function () {
            return this.baseBackendUrl + 'accommodationlist';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "accommodationUrl", {
        get: function () {
            return this.baseBackendUrl + 'accommodation';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "uploadsUrl", {
        get: function () {
            return this.baseBackendUrl + 'uploads';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "baseBackendUrl", {
        get: function () {
            return 'http://localhost:8080/';
            // return 'http://rentany-client.herokuapp.com/';
        },
        enumerable: true,
        configurable: true
    });
    ConfigurationService = __decorate([
        core_1.Injectable()
    ], ConfigurationService);
    return ConfigurationService;
}());
exports.ConfigurationService = ConfigurationService;
//# sourceMappingURL=configuration.service.js.map