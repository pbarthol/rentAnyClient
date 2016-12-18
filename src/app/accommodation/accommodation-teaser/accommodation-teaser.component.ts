import { Component, Input, OnInit } from '@angular/core';
import { Accommodation } from '../models/accommodation';
import { LocationService } from '../../accommodation/services/location.service';

@Component({
  selector: 'app-accommodation-teaser',
  templateUrl: './accommodation-teaser.component.html',
  styles: ['.media { margin-top: 15px; }']
})
export class AccommodationTeaserComponent implements OnInit {
  @Input() accommodation: Accommodation;
  refTown: string;

  constructor(private locationService: LocationService) {}

  ngOnInit(){
    this.refTown = this.locationService.getLocation('town');
    if (this.refTown == '') {
      this.refTown = localStorage.getItem("raLocation");
    }
  }

  mouseoverButton(){
    this.accommodation.sel=true;
  }

  mouseoutButton(){
    this.accommodation.sel=false;
  }

}
