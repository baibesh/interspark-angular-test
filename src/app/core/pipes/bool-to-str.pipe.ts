import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolToStr',
})
export class BoolToStrPipe implements PipeTransform {
  transform(value: boolean): any {
    return value ? 'Yes' : 'No';
  }
}
