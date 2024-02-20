import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'getIneligibleCodeIdVerbiage'
})

export class GetIneligibleCodeIdVerbiagePipe implements PipeTransform {
	transform(codeId: number, ineligibleCodes: any[], LangId: number) {

		if (ineligibleCodes && ineligibleCodes.length) {
			const iCodeverbiages = ineligibleCodes.find(ct => ct.Id == codeId);
			if (iCodeverbiages.IneligibleCodeVerbiage && iCodeverbiages.IneligibleCodeVerbiage.length) {
				if(iCodeverbiages.IneligibleCodeVerbiage.find(x => x.LanguageTypeId == +LangId)) {
					let verbiage = iCodeverbiages.IneligibleCodeVerbiage.find(x => x.LanguageTypeId == +LangId);
					return verbiage.Verbiage ;
				} else {
					return iCodeverbiages[0].Verbiage;
				}
			} else {
				return iCodeverbiages.Description;
			}
		} else {
			return '';
		}
	}
}
