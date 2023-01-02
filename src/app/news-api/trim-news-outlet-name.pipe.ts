import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimNewsOutletName'
})
export class TrimNewsOutletNamePipe implements PipeTransform {

  transform(title: string, outletName: string): unknown {
    /*
    // overcorrects title
    const noOutlet = title.split('-');
    let evenBetterOutlet: string = '';
    for (let i = 0; i < noOutlet.length-1; i++) {
      evenBetterOutlet += noOutlet[i];
    }
    return evenBetterOutlet.trim(); */
    // under corrects title
    return title.replace(` - ${outletName}`, '');
  }

}
