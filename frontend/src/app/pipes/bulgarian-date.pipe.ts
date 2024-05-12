import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bulgarianDate',
  standalone: true,
})
export class BulgarianDatePipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
    };
    return new Intl.DateTimeFormat('bg-BG', options).format(date);
  }
}
