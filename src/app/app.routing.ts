/**
 * Created by Peter on 12.09.2016.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageAccommodationEditComponent } from './page-accommodation-edit/page-accommodation-edit.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageListComponent } from './page-list/page-list.component';
import { PageDetailComponent } from './page-detail/page-detail.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { BookingComponent } from './booking/booking.component';
import { BookingsComponent } from './bookings/bookings.component';
import { PasswordchangeComponent } from './passwordchange/passwordchange.component';


const appRoutes: Routes = [
  { path: '', component: PageHomeComponent },
  { path: 'accommodations', component: PageListComponent },
  { path: 'accommodations/:location', component: PageListComponent },
  // { path: 'accommodationlist_peter', component: AccommodationlistComponent },
  { path: 'accommodation-edit', component: PageAccommodationEditComponent },
  { path: 'accommodation/:id', component: PageDetailComponent},
  { path: 'booking', component: BookingComponent },
  { path: 'booking/:id', component: BookingComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/passwordchange', component: PasswordchangeComponent }
  // { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
