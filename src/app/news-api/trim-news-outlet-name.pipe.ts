import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimNewsOutletName'
})
export class TrimNewsOutletNamePipe implements PipeTransform {

  transform(title: string, outletName: string): unknown {
    /*
    // overcorrects title
    *
    * // how to Correct Better
    * // some sources have a different source name v. article name
    * // e.g. BBCnews v BBC
    * // some sources have an article name and come from a diffrent source
    * // e.g. The Hill v googlenews.com
    * // so...
    * // a regular expression to find the LAST - and cut after
    * // convoluted JS logic to find the last - and cut after that
    *
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
