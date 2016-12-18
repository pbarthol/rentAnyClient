import {Component, OnInit, OnDestroy} from '@angular/core';
import { LoginService } from './services/login.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-logincomponent',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit, OnDestroy {

  model: any = {};
  loading = false;
  private subscription;
  private userIsLoggedIn: boolean = false;
  error: string = '';

  constructor(private router: Router,
              private loginService: LoginService,
              private sharedService: SharedService) {}

  ngOnInit() {
  }

  login() {
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
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      },
        error => {
          this.error=error;
          this.loading = false;
        }
      );
  }

  changeToRegister() {
    this.sharedService.showLoginComponent(false); // Hide Login Component
    this.sharedService.showRegisterComponent(true); // Show Register Component
  }

  // cancel() {
  //   this.sharedService.showLoginComponent(false); // Hide Login Component
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
