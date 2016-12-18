import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ConfigurationService } from '../../shared/configuration.service';


@Injectable()
export class LoginService {

  public token: string;
  private _loginurl = this.configuration.loginUrl;

  constructor(private http: Http,
              private configuration: ConfigurationService) {
    // set token if saved in session storage
    var rentAnyUser = JSON.parse(sessionStorage.getItem('rentAnyUser'));
    this.token = rentAnyUser && rentAnyUser.token;
  }

  login(username, password): Observable<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this._loginurl, JSON.stringify({ username: username, password: password }), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        let userid = response.json().userid;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          sessionStorage.setItem('rentAnyUser',
            JSON.stringify({ username: username, userid: userid, token: token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      })
      .catch((error) => { return this.handleError(error) });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    sessionStorage.removeItem('rentAnyUser');
  }

  private handleError(error: any) {
    console.log(error);
    let errString = '';
    if (error.status == 403) {
      errString = error.json().error;
    } else {
      errString = 'Some error occured';
    }
    return Observable.throw(errString);
  }
}
