import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'split'
})

export class SplitPipe implements PipeTransform {
	transform(value, splitBy, valLocation) { //valLocation == first/last
        if (valLocation==='last') {
            return value.split(splitBy)[1];
        }
        return value.split(splitBy)[0];
	}
}
