import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizar'
})
export class CapitalizarPipe implements PipeTransform {

  transform(value: any) {
    if (value) {
      let w = '';
      value.split(' ').forEach(word => {
        w += word.charAt(0).toUpperCase() + word.slice(1) + ' ';
      });
      return w;
    }
    return value;
  }

}
