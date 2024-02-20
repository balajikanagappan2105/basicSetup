import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getSurveyQuestion'
})
export class GetSurveyQuestionPipe implements PipeTransform {

  transform(value: any, surveyItems, LangId): any {

		const result = surveyItems.filter(res => {
			return res.Id === value;
		});
		if (result[0] && result[0].SurveyItemVerbiage && result[0].SurveyItemVerbiage.length) {
			const SurveyItemVerbiage = result[0].SurveyItemVerbiage.find(ct => { return +ct.LanguageTypeId === +LangId; });
			if (SurveyItemVerbiage) {
				return SurveyItemVerbiage.Verbiage;
			} else {
				return result[0] && result[0].SurveyItemVerbiage[0].Verbiage;
			}
		} else {
			return 'No Data Available';
		}
// 		const question = result.length ? result[0].Verbiage : 'No Data Available';
// 		return question
   }

}
