import { Component, OnInit, AfterViewInit, ElementRef, Inject, ViewChild } from '@angular/core';
import { Accommodation } from '../accommodation/models/accommodation';
import { AccommodationService } from '../accommodation/services/accommodation.service';
import { LocationService } from '../accommodation/services/location.service';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var jQuery:any;

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html'
})

export class PageHomeComponent implements OnInit, AfterViewInit{
  errorMessage: string;
  private editAccommodation: boolean;
  headerID = 1;
  public listParam1 = {"listID": 1, "listTitle": "Unterkünfte","listIcon": "hotel", "listImage": "../img/unterkuenfte.jpg", "listColsize": 4, "listFilter":false};
  public listParam2 = {"listID": 2, "listTitle": "Büros/Gewerberäume","listIcon": "computer", "listImage": "../img/bueros.jpg", "listColsize": 4, "listFilter":false};
  public listParam3 = {"listID": 3, "listTitle": "Event Locations","listIcon": "local_bar", "listImage": "../img/partyraeume.jpg", "listColsize": 4, "listFilter":false};
  arrFilter = [];
  private accommodations: Accommodation[];
  private accommodations1: Accommodation[] = [];
  private accommodations2: Accommodation[] = [];
  private accommodations3: Accommodation[] = [];

  msgError: string;
  locationFilled: boolean;
  locationSearch: string;

  public latitude: number;
  public longitude: number;
  public raLocation: string;
  public raCanton: string;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private route:ActivatedRoute, private router:Router, private accommodationService: AccommodationService, private locationService: LocationService, private mapsAPILoader: MapsAPILoader, @Inject(ElementRef) searchElementRef: ElementRef) {
    this.searchElementRef = searchElementRef;
  }

  ngOnInit() {
    // Get accommodations
    let accommodations = this.accommodationService
      .getAccommodations()
      .subscribe(res => {this.accommodations = res
          this.accommodations1 = this.accommodations;
          this.accommodations2 = this.accommodations;
          this.accommodations3 = this.accommodations;
        },
        error =>  this.errorMessage = <any>error);

    this.locationSearch = "";
    this.locationFilled = false;
    this.msgError="";

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["(regions)"]
      });
      autocomplete.addListener("place_changed", () => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //set latitude and longitude
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.raLocation = place.name;
        this.raCanton = place.address_components[2].short_name;
        this.locationService.setLocation(this.latitude,this.longitude,this.raLocation,'0',this.raCanton,'');
        if (typeof(Storage) != "undefined") {
          // Store
          localStorage.setItem("latitude",""+this.latitude);
          localStorage.setItem("longitude",""+this.longitude);
          localStorage.setItem("raLocation",this.raLocation);
        }
        this.locationFilled = true;
        this.msgError="";
      });
    });
  }

  ngAfterViewInit() {
    jQuery(this.searchElementRef.nativeElement).on('click', () => {
      this.msgError="";
    });
  }

  goPageList() {
    if (this.locationFilled) {
      this.msgError="";
      this.router.navigate(['accommodations/' + this.raLocation]);
    }
    else {
      this.msgError="Bitte wähle einen gültigen Ort aus";
    }
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}
