import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class SharedService {

  constructor(){
    console.log('shared services started');
  }

  private userLoggingSource = new Subject<boolean>();
  userLogging$ = this.userLoggingSource.asObservable();
  showLoginComponent(logging: boolean) {
    this.userLoggingSource.next(logging);
  }

  private userIsLoggedInSource = new Subject<boolean>();
  userIsLoggedIn$ = this.userIsLoggedInSource.asObservable();
  userIsLoggedIn(loggedIn: boolean) {
    this.userIsLoggedInSource.next(loggedIn);
  }

  private registerSource = new Subject<boolean>();
  showRegisterComponent$ = this.registerSource.asObservable();
  showRegisterComponent(registering: boolean) {
    this.registerSource.next(registering);
  }

  private editAccoService = new Subject<boolean>();
  editAccommodation$ = this.editAccoService.asObservable();
  editAccoStart(editAccommodation: boolean) {
    this.editAccoService.next(editAccommodation);
  }

  private bookingFinishService = new Subject<boolean>();
  booked$ = this.bookingFinishService.asObservable();
  bookingFinished(bookingFinish: boolean) {
    this.bookingFinishService.next(bookingFinish);
  }

  private changePasswordService = new Subject<boolean>();
  changePassword$ = this.changePasswordService.asObservable();
  showPWDChangeComponent(pwdChanging: boolean) {
    this.changePasswordService.next(pwdChanging);
  }


}
