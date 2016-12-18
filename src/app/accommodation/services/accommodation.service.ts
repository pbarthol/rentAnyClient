import { Injectable } from '@angular/core';
import { Accommodation } from '../models/accommodation';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { ConfigurationService } from '../../shared/configuration.service';


@Injectable()
export class AccommodationService {

  constructor(private http: Http,
              private configuration: ConfigurationService) { }

  private _accommodationurl = this.configuration.accommodationUrl;
  private _accommodationlistsurl = this.configuration.accommodationListUrl;

  // Add one accommodation object on the server
  addOneAccommodation (accommodation: Accommodation) {
    let body = JSON.stringify({accommodation});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this._accommodationurl, body, options)
      .map(function (res) {
        var accommodation = res.json();
        return accommodation;
      })
      .catch(this.handleError);
  }

  getAccommodation(id: string): Observable<Accommodation> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this._accommodationurl + '/' + id, options)//$('id'))
      .map(res => {
        let accommodation = res.json();
        let acco = new Accommodation();
        acco._id=accommodation._id;
        acco.description=accommodation.description;
        acco.town=accommodation.town;
        acco.thumbnail=accommodation.thumbnail;
        acco.avatar=accommodation.avatar;
        acco.type=accommodation.type;
        acco.numberOfGuests=accommodation.numberOfBathrooms;
        acco.price=accommodation.price;
        acco.lat=accommodation.lat;
        acco.lng=accommodation.lng;
        acco.numberOfBeds=accommodation.numberOfBathrooms;
        acco.numberOfBathrooms=accommodation.numberOfBathrooms;
        acco.zipcode=accommodation.zipcode;
        acco.canton=accommodation.canton;
        acco.country=accommodation.country;
        acco.category=accommodation.category;
        acco.setting=accommodation.setting;
        acco.rules=accommodation.rules;
        acco.rulesText=accommodation.rulesText;
        acco.headerImage=accommodation.headerImage;
        acco.images=accommodation.images;
        acco.username=accommodation.username;
        acco.distance=accommodation.distance;
        acco.sel= accommodation.sel;
        acco.ownerid = accommodation.ownerid;
        return acco;

      })
      .catch(this.handleError);
  }


  getAccommodations(): Observable<Accommodation[]> {
    return this.http.get(this._accommodationlistsurl)
      .map( (responseData) => {
        return responseData.json();
      })
      .map((accommodations: Array<any>) => {
        let result: Array<Accommodation> = [];
        if (accommodations) {
          accommodations.forEach((accommodation) => {
            // let acco = <Accommodation>accommodation;
            let acco = new Accommodation();
            acco._id = accommodation._id;
            acco.title = accommodation.title;
            acco.description = accommodation.description;
            acco.town = accommodation.town;
            acco.thumbnail = accommodation.thumbnail;
            acco.avatar = accommodation.avatar;
            acco.type = accommodation.type;
            acco.numberOfGuests = accommodation.numberOfBathrooms;
            acco.price = accommodation.price;
            acco.lat = accommodation.lat;
            acco.lng = accommodation.lng;
            acco.numberOfBeds = accommodation.numberOfBathrooms;
            acco.numberOfBathrooms = accommodation.numberOfBathrooms;
            acco.zipcode = accommodation.zipcode;
            acco.canton = accommodation.canton;
            acco.country = accommodation.country;
            acco.category = accommodation.category;
            acco.setting = accommodation.setting;
            acco.rules = accommodation.rules;
            acco.rulesText = accommodation.rulesText;
            acco.headerImage = accommodation.headerImage;
            acco.images = accommodation.images;
            acco.username = accommodation.username;
            acco.distance = accommodation.distance;
            acco.sel = accommodation.sel;
            acco.ownerid = accommodation.ownerid;
            result.push(acco);
          });
        }
        return result;
      })
      .catch(this.handleError);
  }

  private handleError(error: any) {
  //    let errMsg = error || 'Server error';
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }

  // saveAccommodation(obj,func) {
  //   this.accommodations.push(obj);
  //   console.log('save accommodation - done', this.accommodations);
  // }

}


