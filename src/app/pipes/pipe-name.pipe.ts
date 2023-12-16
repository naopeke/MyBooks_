import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addRef'
})
export class PipeNamePipe implements PipeTransform {

  transform(value:string): string {
    let resultRef:string;
    resultRef = 'Ref - ' + value
    return resultRef;
  }
  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

}
