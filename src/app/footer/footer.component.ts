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
  private userIsLogging: boolean = false;
  private userIsLoggedIn: boolean = false;
  private registeringStarted: boolean;
  private changePassword: boolean;
  subscription: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  subscription4: Subscription;

  constructor(private sharedService: SharedService) {

    this.subscription = sharedService.userLogging$.subscribe(
      showLogging => {
        if ( showLogging == true ) {
          this.userIsLogging = true;
          document.getElementById('openModalLoginButton').click();
        }
        // else {
        //   document.getElementById('closeModalLoginButton').click();
        //   this.userIsLogging = false;
        //   // document.getElementById('modLogin').remove();
        // }
      });

    this.subscription2 = sharedService.register$.subscribe(
      registering => {
        this.registeringStarted = registering;
        if ( registering == true )
          document.getElementById('openModalRegisterButton').click();
        else
          document.getElementById('closeModalRegisterButton').click();
      });

    this.subscription3 = sharedService.changePassword$.subscribe(
      passwordChanging => {
        this.changePassword = passwordChanging;
        if ( passwordChanging == true )
          document.getElementById('openModalChangePWDButton').click();
        else
          document.getElementById('closeModalChangePWDButton').click();
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

  // closeLogin() {
  //   this.sharedService.showLoginComponent(false);
  //   // document.getElementById('closeModalLoginButton').click(); // Close Modal Component
  // }

  closeRegister() {
    this.sharedService.showRegisterComponent(false);
    // document.getElementById('closeModalRegisterButton').click(); // Close Modal Component
  }

  closeChangePassword() {
    this.sharedService.showPWDChangeComponent(false);
    this.sharedService.showRegisterComponent(true);

  }
}
