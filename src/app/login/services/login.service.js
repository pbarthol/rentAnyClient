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
require('rxjs/add/operator/catch');
var LoginService = (function () {
    function LoginService(http, configuration) {
        this.http = http;
        this.configuration = configuration;
        this._loginurl = this.configuration.loginUrl;
        // set token if saved in session storage
        var rentAnyUser = JSON.parse(sessionStorage.getItem('rentAnyUser'));
        this.token = rentAnyUser && rentAnyUser.token;
    }
    LoginService.prototype.login = function (username, password) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this._loginurl, JSON.stringify({ username: username, password: password }), options)
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var token = response.json() && response.json().token;
            var userid = response.json().userid;
            if (token) {
                // set token property
                _this.token = token;
                // store username and jwt token in local storage to keep user logged in between page refreshes
                sessionStorage.setItem('rentAnyUser', JSON.stringify({ username: username, userid: userid, token: token }));
                // return true to indicate successful login
                return true;
            }
            else {
                // return false to indicate failed login
                return false;
            }
        })
            .catch(function (error) { return _this.handleError(error); });
    };
    LoginService.prototype.logout = function () {
        // clear token remove user from local storage to log user out
        this.token = null;
        sessionStorage.removeItem('rentAnyUser');
    };
    LoginService.prototype.handleError = function (error) {
        console.log(error);
        var errString = '';
        if (error.status == 403) {
            errString = error.json().error;
        }
        else {
            errString = 'Some error occured';
        }
        return Observable_1.Observable.throw(errString);
    };
    LoginService = __decorate([
        core_1.Injectable()
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map