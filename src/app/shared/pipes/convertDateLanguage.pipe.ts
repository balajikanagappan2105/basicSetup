import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslateService } from '../../core/services/translate.service';

@Pipe({
	name: 'dateLanguage',
	pure: false
})
export class DateLanguagePipe extends DatePipe implements PipeTransform {

	constructor(private translateService: TranslateService) {
		super('en-US'); // call to default constructor added implicitly
	}

	transform(value: any, language?: any,dateformat?:any): any {
		value = new Date(value);
		const selectedLanguage = this.translateService.languageList ? this.translateService.languageList.find(ele => ele.LanguageTypeId == language): null;
		let languageName = '';
		if(selectedLanguage) {
			languageName = selectedLanguage.LanguageType.Name.toLowerCase();
		} else {
			languageName = 'english';
		}
		switch (languageName) {
			case 'spanish':
				if (dateformat != 'MM/dd/yyyy') {
					const dtFormatter = new Intl.DateTimeFormat('es-US', {
						year: 'numeric',
						month: '2-digit',
						day: '2-digit',
						hour: '2-digit',
						minute: '2-digit',
						second: '2-digit',
						hour12: true
					});
					return dtFormatter.format(value);
				} else {
					return super.transform(value,'dd/MM/yyyy');
				}
				break;

			case 'english':
			default:
				if (dateformat != 'MM/dd/yyyy'){
					return super.transform(value, 'MM/dd/yyyy hh:mm:ss aa');
				} else {
					return super.transform(value, 'MM/dd/yyyy');
				}
				break;
		}
	}
}
