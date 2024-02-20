import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from 'src/app/core/services/translate.service';

@Pipe({ name: 'incompleteVeribageByLanguagePipe' })
export class IncompleteVeribageByLanguagePipe implements PipeTransform {
	constructor(public translateService: TranslateService) {}
	transform(incompleteCodeTypes, LangId) {
		let verbiage = incompleteCodeTypes.find((resp: any) => resp.LanguageTypeId === +LangId);
		if(!verbiage) {
			const englishLanguageId = this.translateService.languageList.find(ele => ele.LanguageType.Name.toUpperCase() == 'ENGLISH').LanguageTypeId;
			verbiage = incompleteCodeTypes.find((resp: any) => resp.LanguageTypeId === +englishLanguageId);
		}
		return verbiage ? verbiage.Verbiage + ' ' + verbiage.ActionItemVerbiage : '';
	}
}
