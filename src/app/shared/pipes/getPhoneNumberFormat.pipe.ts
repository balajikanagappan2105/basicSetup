import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'phoneNumber'
})

export class GetPhoneNumberFormatPipe implements PipeTransform {
	transform(phoneNo) {
		if (!phoneNo || !phoneNo.length) return '';

		const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
		let formatNo = phoneNo;

		if (!format.test(phoneNo)) {
			if (phoneNo.length === 10) {
				formatNo = '('
					+ phoneNo.toString().substring(0, 3) + ') '
					+ phoneNo.toString().substring(3, 6)
					+ '-'
					+ phoneNo.toString().substring(6, 10);
			}
		}

		return formatNo;
	}
}
