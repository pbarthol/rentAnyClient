import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { Password } from '../models/password';
import { ConfigurationService } from '../../shared/configuration.service';

@Injectable()
export class PasswordchangeService {

  constructor(private http: Http,
              private configurationService: ConfigurationService) { }

  private _pwdurl = this.configurationService.changePasswordUrl;

  changePassword(pwdModel: Password) {
    let body = JSON.stringify({pwdModel});
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this._pwdurl, body, options)
      .map(function (res) {
        var pwd = res.json();
        return pwd;
      })
      .catch((error) => { return this.handleError(error) });
  }


  private handleError(error: any) {
    //    let errMsg = error || 'Server error';
    console.log(error);
    let errString = '';
    if (error.status == 403 || error.status == 500) {
      errString = error.json().error;
    } else {
      errString = 'Some error occured';
    }
    return Observable.throw(errString);
  }
}
