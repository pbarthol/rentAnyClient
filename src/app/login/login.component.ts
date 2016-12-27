import {Component, OnInit, OnDestroy} from '@angular/core';
import { LoginService } from './services/login.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-logincomponent',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  private model: any = {};
  private loading = false;
  private userIsLoggedIn: boolean = false;
  private errorMessage: string = '';

  constructor(private router: Router,
              private loginService: LoginService,
              private sharedService: SharedService) {}

  ngOnInit() {
    this.errorMessage = '';
  }

  login() {
    this.errorMessage = '';
    this.loading = true;
    this.loginService.login(this.model.username, this.model.password)
      .subscribe(result => {
        if (result === true) {
          this.sharedService.userIsLoggedIn(true);
          this.userIsLoggedIn = true; // Show message and disable login button
          // this.sharedService.showLoginComponent(false); // Hide Login Component
          this.loading = false;
        } else {
          // login failed
          this.errorMessage = 'Username or password is incorrect';
          this.loading = false;
        }
      },
        error => {
          this.errorMessage=error;
          this.loading = false;
        }
      );
  }

  changeToRegister() {
    this.sharedService.showLoginComponent(false); // Hide Login Component
    this.sharedService.showRegisterComponent(true); // Show Register Component
  }

}
