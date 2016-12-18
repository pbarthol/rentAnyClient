import { Injectable } from '@angular/core';
import { Location } from '../../accommodation/location';

@Injectable()

export class LocationService {
  private location: Location = new Location(0,0,'','','','');

  constructor() {}

  getLocation(loc){
    let locVar:any;
    switch(loc) {
      case 'lat':
        locVar = this.location.lat;
        break;
      case 'lng':
        locVar = this.location.lng;
        break;
      case 'town':
        locVar = this.location.town;
        break;
      case 'zipcode':
        locVar = this.location.zipcode;
        break;
      case 'canton':
        locVar = this.location.canton;
        break;
      case 'country':
        locVar = this.location.country;
        break;
    }
    return locVar;
  }

  setLocation(lat,lng,town,zipcode,canton,country){
    this.location.lat = lat;
    this.location.lng = lng;
    this.location.town = town;
    this.location.zipcode = zipcode;
    this.location.canton = canton;
    this.location.country = country;
  }
}
