import { Pipe, PipeTransform } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { TranslateService } from 'src/app/core/services/translate.service';

@Pipe({ name: 'getAnswerVerbiage' })
export class GetAnswerVerbiagePipe implements PipeTransform {

	constructor(private authService: AuthenticationService, public translateService: TranslateService) { }

	transform(answerVerbiage): string {
		const englishLanguageId = this.translateService.languageList.find(ele => ele.LanguageType.Name.toUpperCase() == 'ENGLISH').LanguageTypeId;
		const fallBackVerbiage = answerVerbiage.find((resp: any) => resp.LanguageTypeId === +englishLanguageId);
		let value = '';
		const verbiage = answerVerbiage.find((resp: any) => resp.LanguageTypeId === +this.authService.getLangPreference);
		const answerVerbiageLabel = verbiage ? verbiage : fallBackVerbiage;
		if(answerVerbiageLabel) {
			value = answerVerbiageLabel.Verbiage;
			value = value.replace('<p>','');
			value = value.replace('</p>','');
		}
		return  value;
	}

}
