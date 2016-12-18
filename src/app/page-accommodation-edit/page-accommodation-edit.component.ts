import { Component, Input, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Accommodation } from '../accommodation/models/accommodation';
import { AccommodationService } from '../accommodation/services/accommodation.service';
import { AddressService } from '../accommodation/services/address.service';
import { NgForm } from '@angular/forms';
import { SharedService } from '../services/shared.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-page-accommodation-edit',
  templateUrl: './page-accommodation-edit.component.html',
  styles: [`  
    input.ng-touched.ng-invalid {
       border-bottom: solid 1px red;
     }  
    .sebm-google-map-container {
      width: 100%;
      height: 600px;
    }
    .ra-formDescription {
      font-size: 18px;
      font-weight: 600;
      padding: 10px;
    }
    .form-group label, label.radioBtn {
      font-weight: 600;
    }
    .btn {
      margin-top: 15px;
    }
   `]
})

export class PageAccommodationEditComponent implements OnInit {
  private zone:NgZone;
  private basicOptions:Object;
  private progress:number = 0;
  private response:any = {};
  private subscription:Subscription;
  private userId:string;
  private accommodationSaved:boolean;
  userIsLoggedIn:boolean;
  accommodations:Accommodation[] = [];
  objAccommodation:any = {};
  accTypes:any = [];
  accCategoriesT1:any = [];
  accCategoriesT2:any = [];
  accCategoriesT3:any = [];
  statObjDescription:boolean;
  statObjAddress:boolean;
  statObjSettings:boolean;
  statObjImages:boolean;
  currentStep:number;
  latMap:number;
  lngMap:number;
  markers:marker[] = [];
  headerID = 3;
  zoom:number = 8;
  clicked:number = 0;
  @Input() accommodation;

  constructor(private route:ActivatedRoute,
              private router:Router,
              private accommodationService:AccommodationService,
              private addressService:AddressService,
              private sharedService:SharedService) {
    this.subscription = sharedService.userIsLoggedIn$.subscribe(
      loggedIn => this.userIsLoggedIn = loggedIn)
  }

  ngOnInit() {
    this.accommodationSaved = false;
    this.statObjDescription = true;
    this.statObjAddress = false;
    this.statObjSettings = false;
    this.statObjImages = false;
    this.currentStep = 1;
    this.accTypes = ['Unterkunft', 'Büro/Gewerberaum', 'Event Location'];
    this.accCategoriesT1 = ['Zimmer', 'Wohnung', 'Haus', 'Villa', 'Schloss', 'Hütte', 'Baumhaus', 'Zelt', 'Hausboot', 'Andere'];
    this.accCategoriesT2 = ['Büro', 'Atelier', 'Praxis', 'Coworking Space', 'Gewerberaum', 'Ladenlokal', 'Pop-up Store', 'Lagerhalle', 'Werkstatt', 'Andere'];
    this.accCategoriesT3 = ['Partyraum', 'Seminarraum', 'Kursraum', 'Festhütte', 'Festzelt', 'Event Location', 'Waldhütte', 'Andere'];
    this.objAccommodation.type = 1;
    let lsUser = sessionStorage.getItem('rentAnyUser');
    if (lsUser != null) {
      this.userId = JSON.parse(lsUser).userid;
    }

    console.log('1 - numberOfGuests: ', this.objAccommodation.numberOfGuests);
    console.log('1 - numberOfBeds: ', this.objAccommodation.numberOfBeds);
    console.log('1 - numberOfBathrooms: ', this.objAccommodation.numberOfBathrooms);

    this.objAccommodation.numberOfGuests = 0;
    this.objAccommodation.numberOfBeds = 0;
    this.objAccommodation.numberOfBathrooms = 0;

    this.objAccommodation.setting = {
      "kitchen": 0,
      "washingmachine": 0,
      "dryer": 0,
      "dishwasher": 0,
      "tv": 0,
      "wlan": 0,
      "balcony": 0,
      "garden": 0,
      "elevator": 0,
      "accessibility": 0,
      "view": 0,
      "parking": 0,
      "chimney": 0,
      "pool": 0,
      "privateoff": 0,
      "openoff": 0,
      "meetingroom": 0,
      "printer": 0,
      "cafeteria": 0,
      "restaurant": 0,
      "toilettes": 0,
      "fitness": 0,
      "reception": 0,
      "heater": 0,
      "electricity": 0,
      "beamer": 0,
      "bar": 0,
      "dishes": 0,
      "fridge": 0,
      "grill": 0,
      "catering": 0,
      "dancefloor": 0,
      "music": 0,
      "lightingsystem": 0
    }

    console.log('2 - numberOfGuests: ', this.objAccommodation.numberOfGuests);
    console.log('2 - numberOfBeds: ', this.objAccommodation.numberOfBeds);
    console.log('2 - numberOfBathrooms: ', this.objAccommodation.numberOfBathrooms);

    // coords of Sachseln, Center of CH
    this.latMap = 46.867160;
    this.lngMap = 8.239378;
    // this.route.params.forEach((params: Params) => {
    //   let id = +params['id']; // (+) converts string 'id' to a number
    //   this.accommodation = this.accommodationService.getAccommodationByID(id);
    // });
    this.zone = new NgZone({enableLongStackTrace: false});
    this.basicOptions = {
      url: 'http://api.ng2-uploader.com:10050/upload'
    };
  }

  clButton(b) {
    switch (b) {
      case 1:
        this.currentStep = 1;
        this.statObjDescription = true;
        break;
      case 2:
        this.currentStep = 2;
        this.statObjDescription = true;
        this.statObjAddress = true;
        break;
      case 3:
        this.currentStep = 3;
        this.statObjDescription = true;
        this.statObjAddress = true;
        this.statObjSettings = true;
        break;
      case 4:
        this.currentStep = 4;
        this.statObjDescription = true;
        this.statObjAddress = true;
        this.statObjSettings = true;
        this.statObjImages = true;
        break;
    }
  }

  mapClicked(m:MouseEvent) {
    let addressData:any = [];
    if (this.clicked < 1) {
      this.markers.push({
        lat: m[0],
        lng: m[1]
      });
      this.latMap = m[0];
      this.lngMap = m[1];
      console.log('markers(1): ', this.markers, ' / new Long/Lat: ', m[0], ' ', m[1]);
      let addressData:any = [];
      this.addressService.getAddress(m[0], m[1]).subscribe(data => {
        addressData = data[0].address_components;
        let streetnumber:string;
        for (let i in addressData) {
          // town
          if (addressData[i].types[0] == "locality") {
            this.objAccommodation.town = addressData[i].long_name;
          }
          // zipcode
          if (addressData[i].types[0] == "postal_code") {
            this.objAccommodation.zipcode = addressData[i].long_name;
          }
          // address
          if (addressData[i].types[0] == "route") {
            this.objAccommodation.address = addressData[i].long_name;
          }
          // streetnumber
          if (addressData[i].types[0] == "street_number") {
            streetnumber = addressData[i].long_name;
          }
          // canton
          if (addressData[i].types[0] == "administrative_area_level_1") {
            this.objAccommodation.canton = addressData[i].short_name;
          }
          // country
          if (addressData[i].types[0] == "country") {
            this.objAccommodation.country = addressData[i].long_name;
          }
        }
        // address with streetnumber
        if (streetnumber > '') {
          this.objAccommodation.address = this.objAccommodation.address + ', ' + streetnumber;
        }
      });
    }
    this.clicked = 1;
  }

  markerDragEnd(m:marker, e:MouseEvent) {
    console.log('dragEnd', m, e[0], e[1]);
    this.latMap = e[0];
    this.lngMap = e[1];
    console.log('markers(2): ', this.markers, ' / new Long/Lat: ', e[0], ' ', e[1]);
    this.markers[0].lat = e[0];
    this.markers[0].lng = e[1];
    console.log('markers(3): ', this.markers, ' / new Long/Lat: ', e[0], ' ', e[1]);
    let addressData:any = [];
    this.addressService.getAddress(e[0], e[1]).subscribe(data => {
      addressData = data[0].address_components;
      let streetnumber:string;
      for (let i in addressData) {
        // town
        if (addressData[i].types[0] == "locality") {
          this.objAccommodation.town = addressData[i].long_name;
        }
        // zipcode
        if (addressData[i].types[0] == "postal_code") {
          this.objAccommodation.zipcode = addressData[i].long_name;
        }
        // address
        if (addressData[i].types[0] == "route") {
          this.objAccommodation.address = addressData[i].long_name;
        }
        // streetnumber
        if (addressData[i].types[0] == "street_number") {
          streetnumber = addressData[i].long_name;
        }
        // canton
        if (addressData[i].types[0] == "administrative_area_level_1") {
          this.objAccommodation.canton = addressData[i].short_name;
        }
        // country
        if (addressData[i].types[0] == "country") {
          this.objAccommodation.country = addressData[i].long_name;
        }
      }
      // address with streetnumber
      if (streetnumber > '') {
        this.objAccommodation.address = this.objAccommodation.address + ', ' + streetnumber;
      }
    });
  }

  calcField(field, operation) {
    switch (field) {
      case 'numberOfGuests':
        this.objAccommodation.numberOfGuests = (operation == '+') ? this.objAccommodation.numberOfGuests + 1 : this.objAccommodation.numberOfGuests - 1;
        if (this.objAccommodation.numberOfGuests < 0) this.objAccommodation.numberOfGuests = 0;
        break;
      case 'numberOfBeds':
        this.objAccommodation.numberOfBeds = (operation == '+') ? this.objAccommodation.numberOfBeds + 1 : this.objAccommodation.numberOfBeds - 1;
        if (this.objAccommodation.numberOfBeds < 0) this.objAccommodation.numberOfBeds = 0;
        break;
      case 'numberOfBathrooms':
        this.objAccommodation.numberOfBathrooms = (operation == '+') ? this.objAccommodation.numberOfBathrooms + 1 : this.objAccommodation.numberOfBathrooms - 1;
        if (this.objAccommodation.numberOfBathrooms < 0) this.objAccommodation.numberOfBathrooms = 0;
        break;
    }
  }

  goToUpload() {
    this.currentStep = 4;
    this.statObjImages = true;
  }

  selCheckboxSetting(value) {
    this.objAccommodation.setting[value] = (this.objAccommodation.setting[value] === 0) ? 1 : 0;

    console.log('111 checkbox setting / ', value, ' - ', this.objAccommodation.setting[value]);
    console.log('222 checkbox setting / ', value, ' - ', this.objAccommodation.setting.kitchen);
  }

  onSubmitEditAccomodation1(form:NgForm) {
    console.log(form);
    this.currentStep = 2;
    this.statObjAddress = true;
  }

  onSubmitEditAccomodation2(form:NgForm) {
    console.log('form: ', form);
    this.currentStep = 3;
    this.statObjSettings = true;

  }

  onSubmitEditAccomodation3(form:NgForm) {
    console.log(form);
    this.currentStep = 3;
    this.statObjImages = true;
    //save Data!!!
    this.saveData();
  }

  onSubmitEditAccomodation4(form:NgForm) {
    this.currentStep = 4;
    console.log(form);
  }

  saveData() {
    this.accommodationSaved = true; // No doubled savings
    this.objAccommodation.lat = this.markers[0].lat;
    this.objAccommodation.lng = this.markers[0].lng;

    console.log('save: ', this.objAccommodation);

    this.objAccommodation.ownerid = this.userId;
    this.accommodationService.addOneAccommodation(this.objAccommodation).subscribe(acco => {
        console.log(acco);
      },
      error => {
        console.log(error);
        this.accommodationSaved = false;
      }
    );
  }

}
// just an interface for type safety
interface marker {
  lat: number;
  lng: number;
}
