import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {

  constructor() { }

  public get loginUrl(): string {
    return this.baseBackendUrl + 'login';
  }

  public get changePasswordUrl(): string {
    return this.baseBackendUrl + 'user/changepassword';
  }

  public get userUrl(): string {
    return this.baseBackendUrl + 'user';
  }

  public get updateUserUrl(): string {
    return this.baseBackendUrl + 'user/update';
  }

  public get bookingsAccommodationUrl(): string {
    return this.baseBackendUrl + 'bookings/accommodation';
  }

  public get bookingUserUrl(): string {
    return this.baseBackendUrl + 'booking/user';
  }

  public get bookingUrl(): string {
    return this.baseBackendUrl + 'booking';
  }

  public get accommodationListUrl(): string {
    return this.baseBackendUrl + 'accommodationlist';
  }

  public get accommodationUrl(): string {
    return this.baseBackendUrl + 'accommodation';
  }

  public get uploadsUrl(): string {
    return this.baseBackendUrl + 'uploads';
  }

  private get baseBackendUrl(): string {
    return 'http://localhost:8080/';
    // return 'http://rentany-client.herokuapp.com/';
  }
}
