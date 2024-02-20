import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'getIncompleteCodeDescription'
})

export class GetIncompleteCodeDescriptionPipe implements PipeTransform {
	transform(id, incompleteCodeTypes) {
		const codeType = incompleteCodeTypes.find(ct => { return ct.Id === id; });

		if (codeType) {
			return codeType.Description;
		} else {
			return '';
		}
	}
}
