import { Injectable } from '@angular/core';
import { Booking } from '../models/booking';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { ConfigurationService } from '../../shared/configuration.service';

@Injectable()
export class BookingService {

  constructor( private http: Http,
              private configurationService: ConfigurationService) { }

  private _bookingurl = this.configurationService.bookingUrl;
  private _userbookingsurl = this.configurationService.bookingUserUrl;
  private _accommodationbookingsurl = this.configurationService.bookingsAccommodationUrl;

  addBooking (booking: Booking) {
    let body = JSON.stringify({booking});
    var lsUser = sessionStorage.getItem('rentAnyUser')
    let headers = new Headers({ 'Content-Type': 'application/json',
      'X-Access-Token': lsUser['token'] });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this._bookingurl, body, options)
      .map(function (res) {
        var booking = res.json();
        return booking;
      })
      .catch((error) => { return this.handleError(error) });
  }

  getBooking(id: string): Observable<Booking> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this._bookingurl+'/' + id, options)//$('id'))
      .map(res => {
        let booking = res.json();
        return booking;
      })
      .catch((error) => { return this.handleError(error) });
  }


  getUserBookings(userid: string): Observable<Booking[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this._userbookingsurl+'/' + userid, options)//$('id'))
      .map( (responseData) => {
        return responseData.json();
      })
      .map((bookings: Array<any>) => {
        let result: Array<Booking> = [];
        if (bookings) {
          bookings.forEach((findBooking) => {
            let booking = new Booking();
            booking.user_id = findBooking.userid;
            booking.accommodation_id = findBooking.accommodationid;
            booking.from_date = new Date(findBooking.fromdate);
            booking.to_date = new Date(findBooking.todate);
            result.push(booking);
          });
        }
        return result;
      })
      .catch(this.handleError);
  }

  getAccommodationBookings(accommodationid: string): Observable<Booking[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this._accommodationbookingsurl+'/' + accommodationid, options)//$('id'))
      .map( (responseData) => {
        return responseData.json();
      })
      .map((bookings: Array<any>) => {
        let result: Array<Booking> = [];
        if (bookings) {
          bookings.forEach((findBooking) => {
            let booking = new Booking();
            booking.user_id = findBooking.userid;
            booking.accommodation_id = findBooking.accommodationid;
            booking.from_date = new Date(findBooking.datefrom);
            booking.to_date = new Date(findBooking.dateto);
            result.push(booking);
          });
        }
        return result;
      })
      .catch(this.handleError);
  }

  private handleError(error: any) {
    //    let errMsg = error || 'Server error';
    console.log(error);
    // let errMsg = (error.message) ? error.message :
    //   error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    // console.log(errMsg); // log to console instead
    // if(error instanceof Response) {
    //   return Observable.throw(error.json().error || 'Server error');
    // }
    // let errMsg = JSON.parse(error._body)['msg'];
    // return Observable.throw(errMsg || 'Server error');

    let errString = '';
    if (error.status == 500) {
      errString = error.json().error;
    } else {
      errString = 'Some error occured';
    }
    return Observable.throw(errString);
  }

}
