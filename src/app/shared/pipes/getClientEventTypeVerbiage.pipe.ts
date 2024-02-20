import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'getClientEventTypeVerbiage'
})

export class GetClientEventTypeVerbiage implements PipeTransform {
	transform(values, statusVerbiage: any[], LangId) {
		if (statusVerbiage && statusVerbiage.length) {
			const statusVerbiageList = statusVerbiage.find(verb => verb.LanguageTypeId == LangId);
			if (statusVerbiageList) {
				return statusVerbiageList ? statusVerbiageList.Verbiage : '';
			} else {
				const verbiageValue = statusVerbiage[0];
				return verbiageValue ? verbiageValue.Verbiage : '';
			}
		} else {
			return '';
		}
	}
}
