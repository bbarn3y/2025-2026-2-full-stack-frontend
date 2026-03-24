import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'name',
})
export class NamePipe implements PipeTransform {

  transform(value: string, separator = ','): string {
    if (!value || typeof value !== 'string') return value;
    const split = value.trim().split(/\s+/);
    if (split.length === 2) {
      return `${split[1]}${separator} ${split[0]}`;
    }
    return value;
  }

}
