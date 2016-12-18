import { Component, OnInit, ElementRef, Inject, AfterViewInit, ChangeDetectorRef, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Accommodation } from '../accommodation/models/accommodation';
import { AccommodationService } from '../accommodation/services/accommodation.service';
import { LocationService } from '../accommodation/services/location.service';

declare var jQuery:any;

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styles: [`    
    h3 {
      font-size: 18px;
      font-weight: 500;
      color: #22a981;
      margin: 0 0 20px 0;
    }
    .btn-group {
      margin-bottom: 10px;
    }     
    .col-list {
      float: left;
    }
    .col-filtermap {
      float: right;
    }
    .sl-input {
      display:none;
    }
    .slider {
      margin: 0 0 10px 5px;
      max-width: 300px;
    }
    .sebm-google-map-container {
      width: 100%;
    }
    .ra-filter p {
      margin-bottom: 10px; 
    } 
    .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {
      padding-left: 10px;
      padding-right: 10px;
    }
  `]
})

export class PageListComponent implements OnInit,AfterViewInit,DoCheck {
  headerID = 2;
  listParam = {"listID": 4, "listTitle": "Alle","listIcon": "reorder", "listImage": "", "listColsize": 8, "listFilter": true};
  accommodations: Accommodation[] = [];
  objectFilter = {"acTypeValue":"", "numberOfGuestsFrom":"", "numberOfGuestsTo":"", "priceFrom":"", "priceTo":"", "radius":""};
  arrFilter = [];
  argFilter: string;
  btnSuccess0 = false;
  btnSuccess1 = false;
  btnSuccess2 = false;
  btnSuccess3 = false;
  pageListParam: string;
  colModLeft: string;
  colModRight: string;
  elementRef: ElementRef;
  lat: number;
  lng: number;
  zoom: number = 9;
  mtop: number;
  locationTown: string;
  devHeight: number;
  mapHeight: number;
  mapDiff: number = 380;
  errorMessage: string;

  constructor(private route:ActivatedRoute, private router:Router, private accommodationService: AccommodationService, private locationService: LocationService, @Inject(ElementRef) elementRef: ElementRef, public cdr: ChangeDetectorRef) {
    this.elementRef = elementRef;
  }

  ngAfterViewInit(){
    this.doJQueryInit();
  }

  ngOnInit(){
    this.lat = this.locationService.getLocation('lat');
    if (this.lat == 0) {
      this.lat = Number(localStorage.getItem("latitude"));
      this.lng = Number(localStorage.getItem("longitude"));
      this.locationTown = localStorage.getItem("raLocation");
    }
    else {
      this.lng = this.locationService.getLocation('lng');
      this.locationTown = this.locationService.getLocation('town');
    }
    this.accommodationService
      .getAccommodations()
      .subscribe(res => {
        this.accommodations = res;
          // update distance within accommodations
        for (let i in this.accommodations) {
          this.accommodations[i].distance=this.calcHaversineDistance([this.lng,this.lat],[this.accommodations[i].lng,this.accommodations[i].lat]);
        }
      }
      , error =>  this.errorMessage = <any>error);
    console.log('Page List: ', this.accommodations);
    this.devHeight = window.innerHeight;
    this.mapHeight = this.devHeight - this.mapDiff;
    this.btnSuccess0 = true;
    this.pageListParam = 'both';
    this.objectFilter.acTypeValue = 'all';
    this.arrFilter[0] = 'all';
    this.objectFilter.numberOfGuestsFrom = "0";
    this.objectFilter.numberOfGuestsTo = "100";
    this.objectFilter.priceFrom = "0";
    this.objectFilter.priceTo = "500";
    this.objectFilter.radius = "100";
    this.colModLeft = 'col-md-6';
    this.colModRight = 'col-md-6';
    this.mtop = 315;
  }

  ngDoCheck(){
    // this.accommodations = this.accommodationService.getAccommodations();
    this.devHeight = window.innerHeight;
    this.mapHeight = this.devHeight - this.mapDiff;
    switch(this.objectFilter.acTypeValue){
      case '1':
        this.listParam.listTitle = 'Unterkünfte';
        this.listParam.listIcon = 'hotel';
        break;
      case '2':
        this.listParam.listTitle = 'Büros/Gewerberäume';
        this.listParam.listIcon = 'computer';
        break;
      case '3':
        this.listParam.listTitle = 'Event Locations';
        this.listParam.listIcon = 'local_bar';
        break;
      default:
        this.listParam.listTitle = 'Alle';
        this.listParam.listIcon = 'reorder';
    }


    this.lat = this.locationService.getLocation('lat');
    if (this.lat == 0) {
      this.lat = Number(localStorage.getItem("latitude"));
      this.lng = Number(localStorage.getItem("longitude"));
      this.locationTown = localStorage.getItem("raLocation");
    }
    else {
      this.lng = this.locationService.getLocation('lng');
      this.locationTown = this.locationService.getLocation('town');
    }
    this.lat = this.locationService.getLocation('lat');
    if (this.lat == 0) {
      this.lat = Number(localStorage.getItem("latitude"));
      this.lng = Number(localStorage.getItem("longitude"));
      this.locationTown = localStorage.getItem("raLocation");
    }
    else {
      this.lng = this.locationService.getLocation('lng');
      this.locationTown = this.locationService.getLocation('town');
    }

    // add distances from reference location to the accommodation objects
    for (let i in this.accommodations) {
      this.accommodations[i].distance=this.calcHaversineDistance([this.lng,this.lat],[this.accommodations[i].lng,this.accommodations[i].lat]);
      this.arrFilter[5] = this.objectFilter.radius;
    }
    this.arrFilter[0] = this.objectFilter.acTypeValue;
    this.arrFilter[1] = this.objectFilter.numberOfGuestsFrom;
    this.arrFilter[2] = this.objectFilter.numberOfGuestsTo;
    this.arrFilter[3] = this.objectFilter.priceFrom;
    this.arrFilter[4] = this.objectFilter.priceTo;
    if (this.arrFilter) {
      this.argFilter = '';
      for (let i of this.arrFilter) {
        this.argFilter = this.argFilter + i +'#';
      }
    }
    this.doJQueryInit();
  }

  onDataChange(data) {
    this.pageListParam = data;
    switch(this.pageListParam){
      case 'filter':
        this.colModLeft  = 'col-md-12';
        this.colModRight = '';
        this.mtop = 315;
        break;
      case 'map':
        this.colModLeft  = 'col-md-6';
        this.colModRight = 'col-md-6';
        this.mtop = 195;
        break;
      case 'both':
        this.colModLeft  = 'col-md-6';
        this.colModRight = 'col-md-6';
        this.mtop = 315;
        break;
      case 'none':
        this.colModLeft  = 'col-md-12';
        this.colModRight = '';
        this.mtop = 195;
        break;
    }
    this.lat = this.locationService.getLocation('lat');
    if (this.lat == 0) {
      this.lat = Number(localStorage.getItem("latitude"));
      this.lng = Number(localStorage.getItem("longitude"));
      this.locationTown = localStorage.getItem("raLocation");
    }
    else {
      this.lng = this.locationService.getLocation('lng');
      this.locationTown = this.locationService.getLocation('town');
    }
  }

  clButton(b){
    switch(b){
      case 0:
        this.objectFilter.acTypeValue = 'all';
        this.arrFilter[0] = 'all';
        this.btnSuccess0 = true
        this.btnSuccess1 = false;
        this.btnSuccess2 = false;
        this.btnSuccess3 = false;
        break;
      case 1:
        this.objectFilter.acTypeValue = '1';
        this.arrFilter[0] = '1';
        this.btnSuccess0 = false;
        this.btnSuccess1 = true;
        this.btnSuccess2 = false;
        this.btnSuccess3 = false;
        break;
      case 2:
        this.objectFilter.acTypeValue = '2';
        this.arrFilter[0] = '2';
        this.btnSuccess0 = false;
        this.btnSuccess1 = false;
        this.btnSuccess2 = true;
        this.btnSuccess3 = false;
        break;
      case 3:
        this.objectFilter.acTypeValue = '3';
        this.arrFilter[0] = '3';
        this.btnSuccess0 = false;
        this.btnSuccess1 = false;
        this.btnSuccess2 = false;
        this.btnSuccess3 = true;
        break;
    }
  }

  doJQueryInit() {
    jQuery(this.elementRef.nativeElement).find("#sl-guest").slider({
      range: true,
      orientation: "horizontal",
      min: 0,
      max: 100,
      values: [this.objectFilter.numberOfGuestsFrom, this.objectFilter.numberOfGuestsTo],
      slide: ( event, ui ) => {
        this.objectFilter.numberOfGuestsFrom = ui.values[0];
        this.objectFilter.numberOfGuestsTo = ui.values[1];
      }
    });
    jQuery(this.elementRef.nativeElement).find("#sl-price").slider({
      range: true,
      orientation: "horizontal",
      min: 0,
      max: 500,
      values: [this.objectFilter.priceFrom, this.objectFilter.priceTo],
      slide: ( event, ui ) => {
        this.objectFilter.priceFrom = ui.values[0];
        this.objectFilter.priceTo = ui.values[1];
      }
    });
    jQuery(this.elementRef.nativeElement).find("#sl-radius").slider({
      range: false,
      orientation: "horizontal",
      min: 0,
      max: 500,
      value: this.objectFilter.radius,
      slide: ( event, ui ) => {
        this.objectFilter.radius = ui.value;
      }
    });
  }

  doMarkerLink(id) {
    this.router.navigate(['/accommodation',id]);
  }

  getMarkerURL(sel) {
    if(sel) {
      return '/img/ra_marker_sel.png';
    }
    else {
      return '/img/ra_marker.png';
    }
  }

  // formula for distances between 2 locations
  calcHaversineDistance(coords1, coords2){
    console.log("Coordinates: ", coords1, coords2);
    function toRad(x) {
      return x * Math.PI / 180;
    }
    let lon1 = coords1[0];
    let lat1 = coords1[1];
    let lon2 = coords2[0];
    let lat2 = coords2[1];
    let R = 6371; //km
    let x1 = lat2 - lat1;
    let dLat = toRad(x1);
    let x2 = lon2 - lon1;
    let dLon = toRad(x2)
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = Math.round(R * c);
    return d;
  }
}
