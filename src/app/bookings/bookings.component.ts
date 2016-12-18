import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BookingService } from '../booking/services/booking.service'
import { Booking } from '../booking/models/booking';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
  providers: [BookingService]
})

export class BookingsComponent implements OnInit {

  private userid: string;
  bookings: Booking[];
  errorMessage: string;

  constructor( private bookingService: BookingService, private route: ActivatedRoute, private router: Router ) {
  }

  ngOnInit() {
    let lsUser = sessionStorage.getItem('rentAnyUser');
    if (lsUser === null)
      this.router.navigate(['/login']);
    else {
      lsUser = JSON.parse(lsUser);
      this.userid = lsUser['userid'];
      this.getBookings();
    }
  }

  getBookings(): void {
    let bookings = this.bookingService
      .getUserBookings(this.userid)
      .subscribe(res => this.bookings = res, error =>  this.errorMessage = <any>error);
  }

}
