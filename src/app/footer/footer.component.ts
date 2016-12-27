import { Component, OnInit } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  errorMessage: string;
  private showRegister: boolean = false;
  private showPwdChangeComponent: boolean = false;
  private userIsLogging: boolean = false;
  private userIsLoggedIn: boolean = false;
  private changePassword: boolean;
  private subscription: Subscription;
  private subscription2: Subscription;
  private subscription3: Subscription;
  private subscription4: Subscription;

  constructor(private sharedService: SharedService) {

    this.subscription = sharedService.userLogging$.subscribe(
      showLogging => {
        if ( showLogging == true )
          this.userIsLogging = true;
        else
          this.userIsLogging = false;
      });

    this.subscription2 = sharedService.showRegisterComponent$.subscribe(
      registering => {
        if ( registering == true )
          this.showRegister = true;
        else
          this.showRegister = false;
      });

    this.subscription3 = sharedService.changePassword$.subscribe(
      passwordChanging => {
        this.changePassword = passwordChanging;
        if ( passwordChanging == true )
          this.showPwdChangeComponent = true;
          // document.getElementById('openModalChangePWDButton').click();
        else
          this.showPwdChangeComponent = false;
          // document.getElementById('closeModalChangePWDButton').click();
      });

    this.subscription4 = sharedService.userLogging$.subscribe(
      isLoggedIn => {
        if ( isLoggedIn == true ) {
          this.userIsLoggedIn = true;
        }
        else {
          this.userIsLoggedIn = false;
        }
      });

  }

  ngOnInit() {
  }

  hideLoginComponent() {
    this.userIsLogging = false;
    this.sharedService.showLoginComponent(false);
    // document.getElementById('closeModalLoginButton').click(); // Close Modal Component
  }

  hideRegisterComponent() {
    this.showRegister = false;
    this.sharedService.showRegisterComponent(false);
    // document.getElementById('closeModalLoginButton').click(); // Close Modal Component
  }

  hidePwdChangeComponent() {
    this.showPwdChangeComponent = false;
    this.sharedService.showPWDChangeComponent(false);
  }
}
