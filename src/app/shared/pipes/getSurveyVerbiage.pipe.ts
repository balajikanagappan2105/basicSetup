import { Pipe, PipeTransform } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { TranslateService } from 'src/app/core/services/translate.service';

@Pipe({ name: 'getSurveyVerbiage' })
export class GetSurveyVerbiagePipe implements PipeTransform {

	constructor(private authService: AuthenticationService, public translateService: TranslateService) { }

	transform(surveyVerbiage): string {
		const englishLanguageId = this.translateService.languageList.find(ele => ele.LanguageType.Name.toUpperCase() == 'ENGLISH').LanguageTypeId;
		const fallBackVerbiage = surveyVerbiage.find((resp: any) => resp.LanguageTypeId === +englishLanguageId);
		const verbiage = surveyVerbiage.find((resp: any) => resp.LanguageTypeId === +this.authService.getLangPreference);
		return verbiage ? verbiage.Verbiage : fallBackVerbiage.Verbiage;
	}

}
