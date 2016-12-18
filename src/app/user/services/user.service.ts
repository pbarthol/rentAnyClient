import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { ConfigurationService } from '../../shared/configuration.service';

@Injectable()
export class UserService {

  constructor( private http: Http,
                private configuration: ConfigurationService ) { }

  private _userurl = this.configuration.userUrl;
  private _userurlupdate = this.configuration.updateUserUrl;

  addUser (user: User) {
    let body = JSON.stringify({user});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this._userurl, body, options)
      .map(function (res) {
        var user = res.json();
        return user;
      })
      .catch((error) => { return this.handleError(error) });
  }

  updateUser (user:User) {
    let body = JSON.stringify({user});
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('withCrdedentials', 'true');
    let options = new RequestOptions({ headers: headers });
    // return this.http.put(this._userurl, body, options)
    return this.http.post(this._userurlupdate, body, options)
    // return this.http.put(this._userurl, body)
      .map(function (res) {
        var user = res.json();
        return user;
      })
      .catch((error) => { return this.handleError(error) });
  }

  getUser(id: string): Observable<User> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this._userurl+'/' + id, options)//$('id'))
      .map(res => {
        let user = res.json();
        return user;
      })
      .catch((error) => { return this.handleError(error) });
  }

  private handleError(error: any) {
    //    let errMsg = error || 'Server error';
    console.log(error);
    let errString = '';
    if (error.status == 500) {
      errString = error.json().error;
    } else {
      errString = 'Some error occured';
    }
    return Observable.throw(errString);
  }
}

