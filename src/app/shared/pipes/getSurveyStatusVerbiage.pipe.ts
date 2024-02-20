import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: 'getSurveyStatusVerbiage'
})
export class GetSurveyStatusVerbiagePipe implements PipeTransform {
	transform(status: string, CustomStatus: any[], LangId) {
		if(CustomStatus && CustomStatus.length > 0) {
			let outcomeCofig = CustomStatus.find(x => x.Outcome.toUpperCase() == status.toUpperCase()) ? CustomStatus.find(x => x.Outcome.toUpperCase() == status.toUpperCase()).SurveyOutcomeConfigId : null;

			if(outcomeCofig) {
				let outcomeStatus = CustomStatus.find(x => x.LanguageTypeId == LangId && x.SurveyOutcomeConfigId == outcomeCofig) ? CustomStatus.find(x => x.LanguageTypeId == LangId && x.SurveyOutcomeConfigId == outcomeCofig).Outcome : status;

				return outcomeStatus;
			} else {
				return status;
			}
		} else {
			return status;
		}
	}
}
