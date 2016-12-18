import { Pipe, PipeTransform } from '@angular/core';
import { Accommodation } from '../../accommodation/models/accommodation';

@Pipe({
  name: 'roFilter'
})

export class AccommodationPipe implements PipeTransform {
  transform(items: Accommodation[], args: any): any {
    let filterStrings: any[];
    filterStrings = args.split("#");
    let filterType = (filterStrings[0] == 'all') ? '' : filterStrings[0];
    let filterNumberOfGuestsFrom: number = filterStrings[1];
    let filterNumberOfGuestsTo: number = filterStrings[2];
    let filterPriceFrom: number = filterStrings[3];
    let filterPriceTo: number = filterStrings[4];
    let filterDistance: number = filterStrings[5];

    if (filterType == '') {
      return items.filter( item => (item.price >= filterPriceFrom) && (item.price <= filterPriceTo) && (item.numberOfGuests >= filterNumberOfGuestsFrom)  && (item.numberOfGuests <= filterNumberOfGuestsTo) && (item.distance <= filterDistance) );
    }
    else {
      return items.filter( item => (item.type == filterType) && (item.price >= filterPriceFrom) && (item.price <= filterPriceTo) && (item.numberOfGuests >= filterNumberOfGuestsFrom)  && (item.numberOfGuests <= filterNumberOfGuestsTo) && (item.distance <= filterDistance) );
    }

  }
}
