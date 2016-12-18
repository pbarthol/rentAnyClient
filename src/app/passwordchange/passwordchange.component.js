"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var passwordchange_service_1 = require('./services/passwordchange.service');
var password_1 = require('./models/password');
var PasswordchangeComponent = (function () {
    function PasswordchangeComponent(router, route, passwordChangeService, loginService, sharedService, builder) {
        this.router = router;
        this.route = route;
        this.passwordChangeService = passwordChangeService;
        this.loginService = loginService;
        this.sharedService = sharedService;
        this.errorMessage = '';
        this.userid = '';
        this.pwdForm = builder.group({
            oldpwd: builder.control('', forms_1.Validators.required),
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
    PasswordchangeComponent.prototype.ngOnInit = function () {
        this.pwdModel = new password_1.Password();
        var lsUser = sessionStorage.getItem('rentAnyUser');
        if (lsUser != null) {
            lsUser = JSON.parse(lsUser);
            this.pwdModel.userid = lsUser['userid'];
        }
    };
    PasswordchangeComponent.prototype.changePassword = function () {
        var _this = this;
        if (this.pwdForm.valid) {
            this.errorMessage = '';
            this.passwordChangeService.changePassword(this.pwdModel).subscribe(function (x) {
                console.log(x);
                _this.sharedService.showLoginComponent(true);
                // this.router.navigate(['/login']);
            }, function (error) {
                _this.errorMessage = error;
            });
        }
    };
    PasswordchangeComponent.prototype.cancelPasswordChange = function () {
        this.router.navigate(['/user']);
    };
    PasswordchangeComponent = __decorate([
        core_1.Component({
            selector: 'app-passwordchange',
            templateUrl: './passwordchange.component.html',
            styleUrls: ['./passwordchange.component.css'],
            providers: [passwordchange_service_1.PasswordchangeService]
        })
    ], PasswordchangeComponent);
    return PasswordchangeComponent;
}());
exports.PasswordchangeComponent = PasswordchangeComponent;
//# sourceMappingURL=passwordchange.component.js.map