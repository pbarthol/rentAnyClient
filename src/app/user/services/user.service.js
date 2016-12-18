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
var UserService = (function () {
    function UserService(http, configuration) {
        this.http = http;
        this.configuration = configuration;
        this._userurl = this.configuration.userUrl;
        this._userurlupdate = this.configuration.updateUserUrl;
    }
    UserService.prototype.addUser = function (user) {
        var _this = this;
        var body = JSON.stringify({ user: user });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this._userurl, body, options)
            .map(function (res) {
            var user = res.json();
            return user;
        })
            .catch(function (error) { return _this.handleError(error); });
    };
    UserService.prototype.updateUser = function (user) {
        var _this = this;
        var body = JSON.stringify({ user: user });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        // headers.append('withCrdedentials', 'true');
        var options = new http_1.RequestOptions({ headers: headers });
        // return this.http.put(this._userurl, body, options)
        return this.http.post(this._userurlupdate, body, options)
            .map(function (res) {
            var user = res.json();
            return user;
        })
            .catch(function (error) { return _this.handleError(error); });
    };
    UserService.prototype.getUser = function (id) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this._userurl + '/' + id, options) //$('id'))
            .map(function (res) {
            var user = res.json();
            return user;
        })
            .catch(function (error) { return _this.handleError(error); });
    };
    UserService.prototype.handleError = function (error) {
        //    let errMsg = error || 'Server error';
        console.log(error);
        var errString = '';
        if (error.status == 500) {
            errString = error.json().error;
        }
        else {
            errString = 'Some error occured';
        }
        return Observable_1.Observable.throw(errString);
    };
    UserService = __decorate([
        core_1.Injectable()
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map