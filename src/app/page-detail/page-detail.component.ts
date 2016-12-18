import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AccommodationService } from '../accommodation/services/accommodation.service';
import { SharedService } from '../services/shared.service';
import { Subscription }   from 'rxjs/Subscription';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.component.html',
  styles: [`    
    .sebm-google-map-container {
      width: 100%;
      height: 600px;
     }
   `]
})

export class PageDetailComponent {
  @Input() accommodation;
  userIsLoggedIn: boolean;
  alreadyBooked: boolean;
  errorMessage: string;
  resultReady: boolean;
  room: string;
  zoom:number = 12;
  fotonum:number;
  settingsLeft = [];
  settingsRight = [];
  fotos = [];
  private showBookingComponent: boolean;
  private imagesAlreadyUploaded: boolean = false;
  private subscription: Subscription;
  private subscription2: Subscription;
  // public uploader:FileUploader = new FileUploader({url: 'https://rentany-server.herokuapp.com/uploads', queueLimit:
  public uploader:FileUploader = new FileUploader({url: 'http://localhost:8080/uploads', queueLimit:       8});

  constructor(private route: ActivatedRoute,
              private router: Router,
              private accommodationService: AccommodationService,
              private sharedService: SharedService) {
    this.subscription = sharedService.booked$.subscribe(
      booked => {
        this.alreadyBooked = booked;
      });

    this.subscription2 = sharedService.userIsLoggedIn$.subscribe(
      loggedIn => {
        this.userIsLoggedIn = loggedIn;
      });
  }

  ngOnInit() {
    this.userIsLoggedIn = false;
    let lsUser = sessionStorage.getItem('rentAnyUser');
    if (lsUser != null) {
      // lsUser = JSON.parse(lsUser);
      this.userIsLoggedIn = true;
    }
    this.alreadyBooked = false;
    let resultReady = false;
    this.fotonum = 0;
    let id = this.route.snapshot.params['id'];
    this.accommodationService
      .getAccommodation(id)
      .subscribe(res => {
          this.accommodation = res
          this.settingsLeft = this.getSettings("left");
          this.settingsRight = this.getSettings("right");
          this.fotos = this.getFotos();
          this.resultReady = true;
        },
        error =>  this.errorMessage = <any>error);
  }

  getFotos() {
    var images = [];
    for (let i = 0; i < this.accommodation.images; i++) {
      let num:number = i+1;
      let foto:string = this.accommodation._id + "_" + num.toString() + ".jpg";
      images.push(foto);
    }
    return images;
  }

  getSettings(col) {
    class SettingObject {
      name: string
      icon: string

      constructor(name,icon){
        this.name = name;
        this.icon = icon;
      }
    }

    let countLeft:number = 0;

    type SettingLeft = Array<SettingObject>;
    var settingLeft: SettingLeft = [];

    type SettingRight = Array<SettingObject>;
    var settingRight: SettingRight = [];

    switch(this.accommodation.type) {
      case '1':
        this.room = "Unterkunft";
        if (this.accommodation.setting.kitchen > 0) {
          settingLeft.push(new SettingObject("Küche", "stove"));
          countLeft++;
        }
        if (this.accommodation.setting.washingmachine > 0) {
          settingLeft.push(new SettingObject("Waschmaschine", "tshirt-crew"));
          countLeft++;
        }
        if (this.accommodation.setting.dryer > 0) {
          settingLeft.push(new SettingObject("Tumbler", "weather-sunny"));
          countLeft++;
        }
        if (this.accommodation.setting.dishwasher > 0) {
          settingLeft.push(new SettingObject("Geschirrspüler", "water"));
          countLeft++;
        }
        if (this.accommodation.setting.tv > 0) {
          settingLeft.push(new SettingObject("TV", "monitor"));
          countLeft++;
        }
        if (this.accommodation.setting.wlan > 0) {
          settingLeft.push(new SettingObject("WLAN", "wifi"));
          countLeft++;
        }
        if (this.accommodation.setting.balcony > 0) {
          settingLeft.push(new SettingObject("Balkon/Terrasse", "eye"));
          countLeft++;
        }

        if (this.accommodation.setting.garden > 0) {
          if (countLeft > 6) {
            settingRight.push(new SettingObject("Garten", "flower"));
          } else {
            settingLeft.push(new SettingObject("Garten", "flower"));
            countLeft++;
          }
        }
        if (this.accommodation.setting.elevator > 0) {
          if (countLeft > 6) {
            settingRight.push(new SettingObject("Lift", "swap-vertical"));
          } else {
            settingLeft.push(new SettingObject("Lift", "swap-vertical"));
            countLeft++;
          }
        }
        if (this.accommodation.setting.accesibility > 0) {
          if (countLeft > 6) {
            settingRight.push(new SettingObject("rollstuhlgängig", "wheelchair-accessibility"));
          } else {
            settingLeft.push(new SettingObject("rollstuhlgängig", "wheelchair-accessibility"));
            countLeft++;
          }
        }
        if (this.accommodation.setting.view > 0) {
          if (countLeft > 6) {
            settingRight.push(new SettingObject("Aussicht", "image-filter-hdr"));
          } else {
            settingLeft.push(new SettingObject("Aussicht", "image-filter-hdr"));
            countLeft++;
          }
        }
        if (this.accommodation.setting.parking > 0) {
          if (countLeft > 6) {
            settingRight.push(new SettingObject("Parkplatz", "parking"));
          } else {
            settingLeft.push(new SettingObject("Parkplatz", "parking"));
            countLeft++;
          }
        }
        if (this.accommodation.setting.chimney > 0) {
          if (countLeft > 6) {
            settingRight.push(new SettingObject("Cheminée/Ofen", "fire"));
          } else {
            settingLeft.push(new SettingObject("Cheminée/Ofen", "fire"));
            countLeft++;
          }
        }
        if (this.accommodation.setting.pool > 0) {
          if (countLeft > 6) {
            settingRight.push(new SettingObject("Pool", "pool"));
          } else {
            settingLeft.push(new SettingObject("Pool", "pool"));
            countLeft++;
          }
        }
        break;
      case '2':
        this.room = "Räumlichkeiten";
        if (this.accommodation.setting.wlan > 0) {
          settingLeft.push(new SettingObject("WLAN", "wifi"));
          countLeft++;
        }
        if (this.accommodation.setting.parking > 0) {
          settingLeft.push(new SettingObject("Parkplatz/Parkhaus", "parking"));
          countLeft++;
        }
        if (this.accommodation.setting.accessibility > 0) {
          settingLeft.push(new SettingObject("rollstuhlgängig", "wheelchair-accessibility"));
          countLeft++;
        }
        if (this.accommodation.setting.elevator > 0) {
          settingLeft.push(new SettingObject("Lift", "swap-vertical"));
          countLeft++;
        }
        if (this.accommodation.setting.privateoff > 0) {
          settingLeft.push(new SettingObject("Einzelbüro", "account"));
          countLeft++;
        }
        if (this.accommodation.setting.openoff > 0) {
          settingLeft.push(new SettingObject("Grossraumbüro", "account-multiple"));
          countLeft++;
        }
        if (this.accommodation.setting.meetingroom > 0) {
          settingLeft.push(new SettingObject("Meetingroom", "presentation"));
          countLeft++;
        }
        if (this.accommodation.setting.printer > 0) {
          settingLeft.push(new SettingObject("Printer", "printer"));
          countLeft++;
        }

        if (this.accommodation.setting.cafeteria > 0) {
          if (countLeft > 7) {
            settingRight.push(new SettingObject("Cafeteria/Snackbar", "coffee"));
          } else {
            settingLeft.push(new SettingObject("Cafeteria/Snackbar", "coffee"));
            countLeft++;
          }
        }
        if (this.accommodation.setting.restaurant > 0) {
          if (countLeft > 7) {
            settingRight.push(new SettingObject("Restaurant", "food"));
          } else {
            settingLeft.push(new SettingObject("Restaurant", "food"));
            countLeft++;
          }
        }
        if (this.accommodation.setting.kitchen > 0) {
          if (countLeft > 7) {
            settingRight.push(new SettingObject("Küche", "stove"));
          } else {
            settingLeft.push(new SettingObject("Küche", "stove"));
            countLeft++;
          }
        }
        if (this.accommodation.setting.toilettes > 0) {
          if (countLeft > 7) {
            settingRight.push(new SettingObject("Toiletten", "human-male-female"));
          } else {
            settingLeft.push(new SettingObject("Toiletten", "human-male-female"));
            countLeft++;
          }
        }
        if (this.accommodation.setting.fitness > 0) {
          if (countLeft > 7) {
            settingRight.push(new SettingObject("Fitnessstudio", "dumbbell"));
          } else {
            settingLeft.push(new SettingObject("Fitnessstudio", "dumbbell"));
            countLeft++;
          }
        }
        if (this.accommodation.setting.reception > 0) {
          if (countLeft > 7) {
            settingRight.push(new SettingObject("Empfang/Reception", "face"));
          } else {
            settingLeft.push(new SettingObject("Empfang/Reception", "face"));
            countLeft++;
          }
        }
        if (this.accommodation.setting.balcony > 0) {
          if (countLeft > 7) {
            settingRight.push(new SettingObject("Balkon/Terrasse", "eye"));
          } else {
            settingLeft.push(new SettingObject("Balkon/Terrasse", "eye"));
            countLeft++;
          }
        }
        if (this.accommodation.setting.view > 0) {
          if (countLeft > 7) {
            settingRight.push(new SettingObject("Aussicht", "image-filter-hdr"));
          } else {
            settingLeft.push(new SettingObject("Aussicht", "image-filter-hdr"));
            countLeft++;
          }
        }
        break;
      case '3':
        this.room = "Location";
        if (this.accommodation.setting.wlan > 0) {
          settingLeft.push(new SettingObject("WLAN", "wifi"));
          countLeft++;
        }
        if (this.accommodation.setting.parking > 0) {
          settingLeft.push(new SettingObject("Parkplatz/Parkhaus", "parking"));
          countLeft++;
        }
        if (this.accommodation.setting.xxxx > 0) {
          settingLeft.push(new SettingObject("Heizung", "temperature-celsius"));
          countLeft++;
        }
        if (this.accommodation.setting.xxxx > 0) {
          settingLeft.push(new SettingObject("Strom", "flash"));
          countLeft++;
        }
        if (this.accommodation.setting.toilettes > 0) {
          settingLeft.push(new SettingObject("Toiletten", "human-male-female"));
          countLeft++;
        }
        if (this.accommodation.setting.xxxx > 0) {
          settingLeft.push(new SettingObject("Beamer", "presentation"));
          countLeft++;
        }
        if (this.accommodation.setting.bar > 0) {
          settingLeft.push(new SettingObject("Bar", "glass-tulip"));
          countLeft++;
        }
        if (this.accommodation.setting.kitchen > 0) {
          settingLeft.push(new SettingObject("Küche", "stove"));
          countLeft++;
        }
        if (this.accommodation.setting.fridge > 0) {
          if (countLeft > 7) {
            settingRight.push(new SettingObject("Kühlschrank", "fridge-filled"));
          } else {
            settingLeft.push(new SettingObject("Kühlschrank", "fridge-filled"));
            countLeft++;
          }
        }
        if (this.accommodation.setting.dishes > 0) {
          if (countLeft > 7) {
            settingRight.push(new SettingObject("Geschirr/Besteck", "silverware-variant"));
          } else {
            settingLeft.push(new SettingObject("Geschirr/Besteck", "silverware-variant"));
            countLeft++;
          }
        }
        if (this.accommodation.setting.dishwasher > 0) {
          if (countLeft > 7) {
            settingRight.push(new SettingObject("Geschirrspüler", "water"));
          } else {
            settingLeft.push(new SettingObject("Geschirrspüler", "water"));
            countLeft++;
          }
        }
        if (this.accommodation.setting.grill > 0) {
          if (countLeft > 7) {
            settingRight.push(new SettingObject("Feuerstelle/Grill", "fire"));
          } else {
            settingLeft.push(new SettingObject("Feuerstelle/Grill", "fire"));
            countLeft++;
          }
        }
        if (this.accommodation.setting.catering > 0) {
          if (countLeft > 7) {
            settingRight.push(new SettingObject("Catering", "food"));
          } else {
            settingLeft.push(new SettingObject("Catering", "food"));
            countLeft++;
          }
        }
        if (this.accommodation.setting.dancefloor > 0) {
          if (countLeft > 7) {
            settingRight.push(new SettingObject("Bühne/Tanzfläche", "human-handsup"));
          } else {
            settingLeft.push(new SettingObject("Bühne/Tanzfläche", "human-handsup"));
            countLeft++;
          }
        }
        if (this.accommodation.setting.music > 0) {
          if (countLeft > 7) {
            settingRight.push(new SettingObject("Musikanlage", "music-note"));
          } else {
            settingLeft.push(new SettingObject("Musikanlage", "music-note"));
            countLeft++;
          }
        }
        if (this.accommodation.setting.lightingsystem > 0) {
          if (countLeft > 7) {
            settingRight.push(new SettingObject("Lichtanlage", "lightbulb-on"));
          } else {
            settingLeft.push(new SettingObject("Lichtanlage", "lightbulb-on"));
            countLeft++;
          }
        }
        break;
    }
    return (col == "left")?settingLeft:settingRight;
  }

  openGallery(n) {
    if (n > this.fotos.length) {
      this.fotonum = 1;
    }
    else if (n < 1) {
      this.fotonum = this.fotos.length;
    }
    else {
      this.fotonum = n;
    }
  }

  activateBookingComponent() {
    this.showBookingComponent = true;
  }

  login() {
    this.sharedService.showLoginComponent(true);
  }
}
