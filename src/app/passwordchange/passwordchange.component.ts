import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordchangeService } from './services/passwordchange.service';
import { LoginService } from '../login/services/login.service';
import { SharedService } from '../services/shared.service';
import { Password } from './models/password';


@Component({
  selector: 'app-passwordchange',
  templateUrl: './passwordchange.component.html',
  styleUrls: ['./passwordchange.component.css'],
  providers: [PasswordchangeService]
})

export class PasswordchangeComponent implements OnInit {
  pwdForm: FormGroup;
  errorMessage: string = '';
  userid: string = '';
  pwdModel: Password;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private passwordChangeService: PasswordchangeService,
              private loginService: LoginService,
              private sharedService: SharedService,
              builder: FormBuilder) {
    this.pwdForm = builder.group({
      oldpwd: builder.control('', Validators.required),
      passwords: builder.group({
        password: builder.control('', Validators.compose([
          Validators.required,
          Validators.minLength(10)
        ])),
        passwordRepeat: builder.control('')
      }, {
        validator(group: FormGroup) {
          if (group.value.password !== group.value.passwordRepeat) {
            return { passwordsNotEqual: true };
          }
          return null;
        }})
    });
  }

  ngOnInit() {
    this.pwdModel = new Password();
    let lsUser = sessionStorage.getItem('rentAnyUser');
    if (lsUser != null) {
      lsUser = JSON.parse(lsUser);
      this.pwdModel.userid = lsUser['userid'];
      // this.pwdModel.oldpwd = "";
      // this.pwdModel.newpwd = "";
    }
  }

  changePassword(){
    if (this.pwdForm.valid) {
      this.errorMessage = '';
      this.passwordChangeService.changePassword(this.pwdModel).subscribe(
        x => {
          console.log(x);
          this.sharedService.showLoginComponent(true);
          // this.router.navigate(['/login']);
        },
        error => {
          this.errorMessage = error
        },
      );
    }
  }

  cancelPasswordChange(){
    this.router.navigate(['/user']);
  }

}
