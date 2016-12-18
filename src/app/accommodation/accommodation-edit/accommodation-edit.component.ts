import { Component, OnInit, Input } from '@angular/core';
import { Accommodation } from '../models/accommodation';
import { AccommodationService } from '../services/accommodation.service';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { BookingComponent } from '../../booking/booking.component';


@Component({
  //moduleId: module.id,
  selector: 'app-accommodation-edit',
  templateUrl: 'accommodation-edit.component.html',
  styleUrls: ['accommodation-edit.component.css'],
  providers: [AccommodationService]
  // providers: [AccommodationService]
})

export class AccommodationEditComponent implements OnInit {

  private id: string;
  errorMessage: string;
  accommodation: Accommodation;
  mode = 'Observable';
  private resultReady: Boolean;
  private sub: Subscription;
  private selectedId: string;

  // getAccommodation() {
  //   let accommodation = this.accommodationService
  //     .getAccommodation(this.id)
  //     .subscribe(res => this.accommodation = res, error => this.errorMessage = <any>error);
  // }

  constructor(private accommodationService: AccommodationService, private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.params['id'];
    // if (this.route.snapshot.params['id'] === 'new') {
    //   this.accommodation = new Accommodation();
    // }
    // else {
    //   this.id = this.route.snapshot.params['id'];
    //   // this.getAccommodation();
    //   let accommodation = this.accommodationService
    //     .getAccommodation(this.id)
    //     .subscribe(res => this.accommodation = res, error => this.errorMessage = <any>error);
    // }
  }

  ngOnInit() {
    let resultReady = false;
    if (this.id === undefined) {
      this.accommodation = new Accommodation();
      this.resultReady = true;
    }
    else {
      this.sub = this.route
        .params
        .subscribe(params => {
          //this.selectedId = +params['id'];
          this.accommodationService.getAccommodation(this.id).subscribe(res => {
            this.accommodation = res;
            this.resultReady = true;
            // this.accommodation = res;
          });

        });
    }
    // this.stopSub();
  }

  addAccommodation() {
    this.accommodationService.addOneAccommodation(this.accommodation).subscribe(x => console.log(x));
  }

  book() {
    // user has to be logged in
    var value = sessionStorage.getItem('rentAnyUser');
    if (value === null)
      this.router.navigate(['/login']);
    else
      this.router.navigate(['/booking', this.accommodation._id]);
  }

  onDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }

  }
}
