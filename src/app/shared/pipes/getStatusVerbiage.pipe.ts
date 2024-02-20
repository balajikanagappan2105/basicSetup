import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'getStatusVerbiage'
})

export class GetStatusVerbiagePipe implements PipeTransform {
	transform(givenStatus, statusVerbiage, LangId) {

		if (statusVerbiage && statusVerbiage.length) {
			const statusVerbiageList = statusVerbiage.filter(ct => (ct.Status === givenStatus));
			if (statusVerbiageList.length) {
				const verbiageValue = statusVerbiageList.find(s=>(s.LanguageTypeId === +LangId));
				return verbiageValue ? verbiageValue.Verbiage : statusVerbiageList[0].Verbiage;
			} else {
				return givenStatus;
			}
		} else {
			return givenStatus;
		}
	}
}
