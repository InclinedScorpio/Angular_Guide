import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "slicer"
})
export class SlicerPipe implements PipeTransform {
    transform(value: string, limit) {
        if(limit>0) {
            return value.slice(0,limit) + "...";
        }
        return value;
    }
}