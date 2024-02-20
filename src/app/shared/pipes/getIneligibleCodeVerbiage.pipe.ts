import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from 'src/app/core/services/translate.service';

@Pipe({
	name: 'getIneligibleCodeVerbiage'
})

export class GetIneligibleCodeVerbiagePipe implements PipeTransform {
	constructor(public translateService: TranslateService) {}
	transform(codeId, ineligibleCodes: any[], LangId) {
		if (ineligibleCodes && ineligibleCodes.length) {
			const iCodeverbiage = ineligibleCodes.find(ct => ct.Id === +codeId);
			if (iCodeverbiage) {
				if(iCodeverbiage.IneligibleCodeVerbiage.find(x => x.LanguageTypeId == +LangId)) {
					return iCodeverbiage.IneligibleCodeVerbiage.find(x => x.LanguageTypeId == +LangId).Verbiage;
				} else {
					const englishLanguageId = this.translateService.languageList.find(ele => ele.LanguageType.Name.toUpperCase() == 'ENGLISH').LanguageTypeId;
					return iCodeverbiage.IneligibleCodeVerbiage.find((resp: any) => resp.LanguageTypeId === +englishLanguageId).Verbiage;
				}
			} else {
				return '';
			}
		} else {
			return '';
		}
	}
}
