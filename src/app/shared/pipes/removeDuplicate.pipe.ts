import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'removeDuplicate'
})
export class RemoveDuplicatePipe implements PipeTransform {

	transform(dataSource: any, value: string): any {
		const unique = dataSource
			.map(e => e[value])
			// store the keys of the unique objects
			.map((e, i, final) => final.indexOf(e) === i && i)
			// eliminate the dead keys & store unique objects
			.filter(e => dataSource[e]).map(e => dataSource[e]);
		return unique;
	}

}
