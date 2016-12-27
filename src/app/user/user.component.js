"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var user_1 = require('./models/user');
var user_service_1 = require('./services/user.service');
var ng2_file_upload_1 = require('ng2-file-upload/ng2-file-upload');
// const URL = 'https://rentany-server.herokuapp.com/upload';
var URL = 'http://localhost:8080/upload';
var UserComponent = (function () {
    function UserComponent(router, route, userService, sharedService, sanitizer, builder, configurationService) {
        this.router = router;
        this.route = route;
        this.userService = userService;
        this.sharedService = sharedService;
        this.sanitizer = sanitizer;
        this.builder = builder;
        this.configurationService = configurationService;
        this.user = {};
        this.loading = false;
        this.newUser = false;
        this.avatarAlreadyUploaded = false;
        this.action = "";
        this.errorMessage = '';
        // public uploader:FileUploader = new FileUploader({url: 'https://rentany-server.herokuapp.com/upload', queueLimit: 1});
        this.uploader = new ng2_file_upload_1.FileUploader({ url: 'http://localhost:8080/upload', queueLimit: 1 });
        this.userForm = builder.group({
            username: builder.control('', forms_1.Validators.required),
            email: builder.control('', forms_1.Validators.compose([
                forms_1.Validators.required,
                forms_1.Validators.minLength(10),
                function containsSigne(control) {
                    var reg = /[@]/;
                    if (reg.test(control.value))
                        return null;
                    else
                        return { containsSigne: true };
                }
            ])),
            passwords: builder.group({
                password: builder.control('', forms_1.Validators.compose([
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(10)
                ])),
                passwordRepeat: builder.control('')
            }, {
                validator: function (group) {
                    if (group.value.password !== group.value.passwordRepeat) {
                        return { passwordsNotEqual: true };
                    }
                    return null;
                } })
        });
    }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.errorMessage = "";
        this.registered = false;
        var rentAnyUser = JSON.parse(sessionStorage.getItem('rentAnyUser'));
        if (rentAnyUser === undefined || rentAnyUser === null) {
            // New User
            this.user = new user_1.User();
            this.action = "Registrieren";
            this.newUser = true;
        }
        else {
            // User already registered -> Edit User Data
            this.id = rentAnyUser.userid;
            this.userService.getUser(this.id)
                .subscribe(function (user) {
                // console.log("User neu geladen")
                _this.user = user;
                _this.action = "Benutzerdaten ändern";
                _this.newUser = false;
            }, function (error) {
                _this.errorMessage = error;
            });
        }
    };
    UserComponent.prototype.addUser = function () {
        var _this = this;
        if (this.userForm.valid) {
            this.user.password = this.userForm.value.passwords['password'];
            this.userService.addUser(this.user)
                .subscribe(function (x) {
                console.log(x);
                _this.registered = true;
            }, function (error) { return _this.errorMessage = error; });
        }
    };
    UserComponent.prototype.updateUser = function () {
        var _this = this;
        this.userService.updateUser(this.user)
            .subscribe(function (user) {
            console.log(user);
            _this.user = user; // Refresh
            _this.sharedService.showRegisterComponent(false);
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    UserComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getUser(this.id)
            .subscribe(function (user) {
            _this.user = user;
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    UserComponent.prototype.onChange = function (event) {
        this.user.avataroriginal = event.srcElement.files[0].name;
    };
    UserComponent.prototype.onUpload = function (event) {
        this.uploader.queue[0].upload();
        this.avatarAlreadyUploaded = true;
    };
    UserComponent.prototype.avatarURL = function () {
        return this.sanitizer.bypassSecurityTrustUrl(this.user.avatar);
    };
    UserComponent.prototype.openChangePasswordDialog = function () {
        this.sharedService.showRegisterComponent(false);
        this.sharedService.showPWDChangeComponent(true);
    };
    UserComponent = __decorate([
        core_1.Component({
            selector: 'app-user',
            templateUrl: './user.component.html',
            styleUrls: ['./user.component.css'],
            providers: [user_service_1.UserService]
        })
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map