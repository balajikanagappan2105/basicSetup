import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'getWizardVerbiage'
})

export class GetWizardVerbiagePipe implements PipeTransform {
	transform(wizardSlideArray, sliedeTypeId, LangId) {

		const currentSlide = wizardSlideArray.find(ele => ele.WizardSlideTypeId == sliedeTypeId);

		if (currentSlide && currentSlide.WizardSlideVerbiages.length > 0) {
			const slideVerbiage = currentSlide.WizardSlideVerbiages.find(ct => { return ct.LanguageTypeId === +LangId; });
			if (slideVerbiage) {
				return slideVerbiage.Verbiage ;
			} else {
				return currentSlide.WizardSlideVerbiages  && currentSlide.WizardSlideVerbiages[0].Verbiage ;
			}
		} else {
			return '';
		}
	}
}
