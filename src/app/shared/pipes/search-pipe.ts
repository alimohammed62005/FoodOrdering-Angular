import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string, property: string): any[] {
    if (!items || !searchText || !property) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(item =>
      item[property]?.toString().toLowerCase().includes(searchText)
    );
  }
}
