import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()

export class AddressService {
  private baseUrl: string = "http://maps.google.com/maps/api/geocode";

  constructor(private http : Http) {}

  getAddress(lat,lng){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    //return this.http.get(this.baseUrl + '/json?latlng=' + lat + ',' + lng,{headers: headers});
    return this.http.get(this.baseUrl + '/json?latlng=' + lat + ',' + lng,{headers: headers})
      .map((response: Response) => {
        const data = response.json();
        const returnArray = [];
        for (let key in data) {
          returnArray.push(data[key][0])
        }
        return returnArray;
      });
  }

}
