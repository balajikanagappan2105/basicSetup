import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'groupEventBenefitStatus'
})
export class GroupEventBenefitStatusPipe implements PipeTransform {

	transform(value, items): any {
		const val = Object.values(items);
		const filtered = val.filter(el => {
			if (el && typeof (el) === 'string') {
				return el;
			}
		});
		let count = 0;
		filtered.forEach(element => {
			if (element === 'Completed') {
				count = count + 1;
			}
		});
		if (count === filtered.length) {
			return 'Completed';
		} else {
			return 'InComplete';
		}
	}

}
