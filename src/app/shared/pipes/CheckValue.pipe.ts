import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'checkValue' })
export class CheckValuePipe implements PipeTransform {
	transform(value: any, answer): any {
		const arrayValue = answer.split(',');
		const result = arrayValue.indexOf(value);
		if (result >= 0) {
			return true;
		}
		else {
			return false;
		}
	}
}
