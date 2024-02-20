import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from 'src/app/core/services/translate.service';

@Pipe({
	name: 'getIncompleteCodeVerbiage'
})

export class GetIncompleteCodeVerbiagePipe implements PipeTransform {
	constructor(public translateService: TranslateService) {}
	transform(id, IncompleteCodeVerbiage, LangId) {
		//const incompleteCodes = incompleteCodeTypes.find(ct => { return ct.Id === id; });
		if (IncompleteCodeVerbiage && IncompleteCodeVerbiage.length) {
			const iCodeverbiage = IncompleteCodeVerbiage.find(ct => { return ct.LanguageTypeId === +LangId; });
			if (iCodeverbiage) {
				return iCodeverbiage.Verbiage + ' ' + iCodeverbiage.ActionItemVerbiage;
			} else {
				const englishLanguageId = this.translateService.languageList.find(ele => ele.LanguageType.Name.toUpperCase() == 'ENGLISH').LanguageTypeId;
				const inCompleteVerniage =  IncompleteCodeVerbiage.find((resp: any) => resp.LanguageTypeId === +englishLanguageId);
				return inCompleteVerniage.Verbiage  + ' ' + inCompleteVerniage.ActionItemVerbiage;
			}
		} else {
			return '';
		}
	}
}
