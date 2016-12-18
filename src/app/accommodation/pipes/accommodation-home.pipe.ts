import { Pipe, PipeTransform } from '@angular/core';
import { Accommodation } from '../../accommodation/models/accommodation';

@Pipe({
  name: 'roFilterHome'
})

export class AccommodationHomePipe implements PipeTransform {
  transform(items: Accommodation[], args: string): any {
    let filterType = args;
    return items.filter(item => item.type == filterType);
  }
}
