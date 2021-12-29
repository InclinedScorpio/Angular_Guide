import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, matchStatement: string, objectKey: string): any {
    const newValue =  value.filter(singleValue=> {
      console.log("singleValue -- ", singleValue[objectKey], "-- ", matchStatement);
      if(singleValue[objectKey] == matchStatement) {
        return true;
      }
    });
    console.log("new value -- ", newValue);
    return newValue;
  }

}
