import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterIneligibleClientEventTypeMaps' })
export class FilterIneligibleClientEventTypeMapsPipe implements PipeTransform {

	constructor() { }

	transform(SelfDeclaredReasons: any[], clientEventTypeId: number): any[] {
		let value = [];
		SelfDeclaredReasons.forEach(element => {
			if(element.IneligibleCodeClientEventTypeMaps.some(ele => ele.ClientEventTypeId == clientEventTypeId)) {
				value.push(element);
			}
		});
		return  value;
	}

}
