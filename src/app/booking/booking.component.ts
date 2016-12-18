
import { Component, OnInit, AfterViewInit, ElementRef, Inject } from '@angular/core';
import { Booking } from './models/booking';
import { BookingService } from './services/booking.service';
import { ActivatedRoute } from "@angular/router";
import { SharedService } from '../services/shared.service';
import {Accommodation} from "../accommodation/models/accommodation";

declare var jQuery: any;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})

export class BookingComponent implements OnInit, AfterViewInit {

  newBooking: Booking;
  accommodationBookings: Booking[];
  bookingOk: boolean;
  errorMessage: string;
  currentDate: Date = new Date();
  day: number;
  month: number;
  year: number;
  dateFrom: any;
  dateTo: any;
  disabledDates: any[];
  wishesDates: any[];
  // public dt: Date = new Date();
  // public dtTo: Date = new Date();
  elementRef: ElementRef;

  private opened: boolean = false;

  constructor(private bookingService: BookingService,
              private route: ActivatedRoute,
              private sharedService: SharedService,
              @Inject(ElementRef) elementRef: ElementRef) {
    this.elementRef = elementRef;
    this.currentDate = new Date();
    this.day = this.currentDate.getDate();
    this.month = this.currentDate.getMonth();
    this.year = this.currentDate.getFullYear();
  }

  ngOnInit() {
    this.errorMessage = "";
    this.bookingOk = false; // hide Popup
    this.newBooking = new Booking();
    this.newBooking.accommodation_id = this.route.snapshot.params['id'];
    var rentAnyUser = JSON.parse(sessionStorage.getItem('rentAnyUser'));
    this.newBooking.user_id = rentAnyUser.userid;
  }

  book() {
    var dummyDate = new Date()
    var minutesToUTC = dummyDate.getTimezoneOffset(); // Difference to UTC in minutes
    // Get Values of Date pickers
    let pickerFrom = jQuery(this.elementRef.nativeElement).find('#dateFrom').pickadate('picker').get();
    // Check is arrival date chosen
    if (pickerFrom === "" ) {
      // this.errorMessage = 'Please enter a arrival date!';
      this.errorMessage = 'Bitte wählen Sie ein Anreisedatum!';
      return;
    }
    let milliseconds = Date.parse(pickerFrom);
    // add n hour(s) because mongodb will save the date as utc
    milliseconds = milliseconds + (minutesToUTC * 60 * 1000 * -1);
    this.newBooking.from_date = new Date(milliseconds);

    // Check is arrival date chosen
    let pickerTo = jQuery(this.elementRef.nativeElement).find('#dateTo').pickadate('picker').get();
    if (pickerTo === "" ) {
      // this.errorMessage = 'Please enter a departure date!';
      this.errorMessage = 'Bitte wählen Sie ein Abreisedatum!';
      return;
    }
    milliseconds = Date.parse(pickerTo);
    milliseconds = milliseconds + (minutesToUTC * 60 * 1000 * -1);
    this.newBooking.to_date = new Date(milliseconds);
    // check is departure date after arrival date
    if (this.newBooking.to_date.getTime() < this.newBooking.from_date.getTime()) {
      // this.errorMessage = 'Departure date must be later or equal arrival date!';
      this.errorMessage = 'Abreisedatum kann nicht vor dem Anreisedatum sein!';
      return;
    }
    // Check are there already booked date between arrvial date and departure date
    // Caution UTC correction!
    let whishBookDate: Date = new Date(this.newBooking.from_date.getTime());
    milliseconds = whishBookDate.getTime();
    milliseconds = milliseconds + (minutesToUTC * 60 * 1000);
    whishBookDate = new Date(milliseconds);
    while (whishBookDate <= this.newBooking.to_date) {
      for(var i = 0; i < this.disabledDates.length; i++) {
        if (whishBookDate.getTime() === this.disabledDates[i].getTime()) {
          // this.errorMessage = 'Some days are already booked!';
          this.errorMessage = 'In Ihrem gewünschten Zeitraum sind ein(ige) Tag(e) bereits ausgebucht!';
          return;
        }
      }
      whishBookDate.setDate(whishBookDate.getDate() + 1);
    }
    // ready for booking
    this.bookingService.addBooking(this.newBooking).subscribe(
      x => {
        this.sharedService.bookingFinished(true);
        this.bookingOk = true;
        document.getElementById('openModalBookingOkButton').click();
      },
      error => {
        this.errorMessage = error
      }
    );
  }

  ngAfterViewInit(){
    this.doJQueryInit();
  }

  doJQueryInit() {
    // Caution ngAfterViewInit comes before ngInit!
    this.bookingService
      .getAccommodationBookings(this.newBooking.accommodation_id)
      .subscribe(res => {
          this.accommodationBookings = res;
          let disableDates = [];
          for (let booking of this.accommodationBookings) {
            let bookDate: Date = booking.from_date;
            while (bookDate <= booking.to_date) {
              disableDates.push(new Date(bookDate.getFullYear(), bookDate.getMonth(), bookDate.getDate()));
              // disableDates.push(bookDate);
              bookDate.setDate(bookDate.getDate() + 1);
            }
          }
          this.disabledDates = disableDates;
          jQuery(this.elementRef.nativeElement).find('#dateFrom').pickadate({
            disable: this.disabledDates
            // disable: [
            //   { from: [2017,2,14], to: [2017,2,27] },
            //   new Date(2016,11,13),
            //   new Date(2016,1,29)
            // ]
          });
          jQuery(this.elementRef.nativeElement).find('#dateFrom').pickadate('picker').set('min', new Date(this.year, this.month, this.day));

          jQuery(this.elementRef.nativeElement).find('#dateTo').pickadate({
            disable: this.disabledDates
          });
          jQuery(this.elementRef.nativeElement).find('#dateTo').pickadate('picker').set('min', new Date(this.year, this.month, this.day));

        }
        , error =>  this.errorMessage = <any>error);

  }

  closeBookingModal() {
    this.bookingOk = false; // Falls Booking nochmals aufgerufen wird
    document.getElementById('closeModalBookingOkButton').click(); // Close Modal Component
  }

}
