import { Pipe, PipeTransform } from '@angular/core';
import { timeSince } from 'src/utils/dateFormat';

@Pipe({
  name: 'timeSince',
})
export class TimeSincePipe implements PipeTransform {
  transform(value: string) {
    return timeSince(value);
  }
}
