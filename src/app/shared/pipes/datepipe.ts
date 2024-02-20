import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
	name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
	transform(value: any, args?: any): any {
		if (args && args.length) {
			return super.transform(value, args);
		}

		return super.transform(value, "MM/dd/yyyy");
	}
}
