import {Component, Input, Output, OnInit, EventEmitter, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../accommodation/services/location.service';
import { Subscription }   from 'rxjs/Subscription';
import { SharedService } from '../services/shared.service';
import { LoginService } from '../login/services/login.service';

declare var jQuery:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`    
    .ra-filtermap-switcher {
      margin: 40px 0 20px 20px; 
    } 
    a.btn  {
      padding-top: 4px;
      padding-left: 8px;
      height: 36px;
    }
    .nav a {
      cursor: pointer;
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  btnSuccess0 = false;
  btnSuccess1 = false;
  locationLat: number;
  locationLong: number;
  pageListParam: string;
  devHeight: number;
  mapHeight: number;
  mapDiff: number = 300;
  private userIsLoggedIn: boolean;
  subscription: Subscription;
  @Input() headerID;
  @Input() locationTown;
  @Output() dataChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private route: ActivatedRoute,
              private sharedService: SharedService,
              private loginService: LoginService,
              private router: Router,
              private locationService: LocationService){
    this.subscription = this.sharedService.userIsLoggedIn$.subscribe(
      loggedIn => {
        this.userIsLoggedIn = loggedIn;
      });
  }

  ngOnInit() {
    this.devHeight = window.innerHeight;
    this.mapHeight = this.devHeight - this.mapDiff;
    this.btnSuccess0 = true;
    this.btnSuccess1 = true;
    this.pageListParam = 'both';
    let lsUser = sessionStorage.getItem('rentAnyUser');
    if (lsUser === null){
      //this.userIsLoggedIn = false;
      //this.sharedService.userIsLoggedIn(false);
      this.userIsLoggedIn = false;
    }
    else {
      this.userIsLoggedIn = true;
      this.sharedService.userIsLoggedIn(true);
    }
    this.pageListParam = 'both';
    this.locationLat = this.locationService.getLocation('lat');
    if (this.locationLat == 0) {
      this.locationLat = Number(localStorage.getItem("latitude"));
      this.locationLong = Number(localStorage.getItem("longitude"));
      this.locationTown = localStorage.getItem("raLocation");
    }
    else {
      this.locationLong = this.locationService.getLocation('lng');
      this.locationTown = this.locationService.getLocation('town');
    }
    // no location data filled --> route to home page
    /* if ( (this.locationLat == 0) || (this.locationLat == undefined) ) {
      this.router.navigate(['/']);
    } */
  }

  // Used for dynamic resize the height of google map box
  ngDoCheck(){
    this.devHeight = window.innerHeight;
    this.mapHeight = this.devHeight - this.mapDiff;
  }

  clButton(b){
    switch(b){
      case 0:
        this.btnSuccess0 = (this.btnSuccess0)?false:true;
        break;
      case 1:
        this.btnSuccess1 = (this.btnSuccess1)?false:true;
        break;
    }

    if (this.btnSuccess0 && this.btnSuccess1) {
      this.pageListParam = 'both';
    }
    else if (this.btnSuccess0 && !this.btnSuccess1) {
      this.pageListParam = 'filter';
    }
    else if (!this.btnSuccess0 && this.btnSuccess1) {
      this.pageListParam = 'map';
    }
    else {
      this.pageListParam = 'none';
    }
    this.dataChange.emit(this.pageListParam);

  }

  register() {
    // this.sharedService.showLoginComponent(false); // Hide Login Component
    this.sharedService.showRegisterComponent(true); // Show Register Component
  }

  login() {
    // this.sharedService.showRegisterComponent(false); // Hide Register Component
    this.sharedService.showLoginComponent(true); // Show Login Compoenent
  }

  logout() {
    this.loginService.logout();
    this.sharedService.userIsLoggedIn(false);
    // this.sharedService.showLoginComponent(false);
  }

  // closeInputCompomonents() {
  //   this.sharedService.showRegisterComponent(false); // Hide Register Component
  //   this.sharedService.showLoginComponent(false); // Hide Login Component
  //   this.router.navigate(['/']);
  // }

  actionOnClose() {
    console.log("Modal closed");
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  editUser() {
    // this.sharedService.showLoginComponent(false); // Hide Login Component
    this.sharedService.showRegisterComponent(true); // Show Register Component
  }

  editAccommodation() {
    this.sharedService.showLoginComponent(false); // Hide Login Component
    this.sharedService.showRegisterComponent(false); // Hide Register Component
    // this.sharedService.editAccoStart(true); // Show Accommodation Edit Component
  }
}
