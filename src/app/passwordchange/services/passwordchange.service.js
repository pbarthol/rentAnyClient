"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/Rx');
require('rxjs/add/operator/catch');
var PasswordchangeService = (function () {
    function PasswordchangeService(http, configurationService) {
        this.http = http;
        this.configurationService = configurationService;
        this._pwdurl = this.configurationService.changePasswordUrl;
    }
    PasswordchangeService.prototype.changePassword = function (pwdModel) {
        var _this = this;
        var body = JSON.stringify({ pwdModel: pwdModel });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this._pwdurl, body, options)
            .map(function (res) {
            var pwd = res.json();
            return pwd;
        })
            .catch(function (error) { return _this.handleError(error); });
    };
    PasswordchangeService.prototype.handleError = function (error) {
        //    let errMsg = error || 'Server error';
        console.log(error);
        var errString = '';
        if (error.status == 403 || error.status == 500) {
            errString = error.json().error;
        }
        else {
            errString = 'Some error occured';
        }
        return Observable_1.Observable.throw(errString);
    };
    PasswordchangeService = __decorate([
        core_1.Injectable()
    ], PasswordchangeService);
    return PasswordchangeService;
}());
exports.PasswordchangeService = PasswordchangeService;
//# sourceMappingURL=passwordchange.service.js.map