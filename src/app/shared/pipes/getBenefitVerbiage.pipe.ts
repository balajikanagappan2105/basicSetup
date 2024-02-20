import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'getBenefitVerbiage'
})

export class GetBenefitVerbiage implements PipeTransform {
	transform(givenStatus, benefitTypes, benefitId,  LangId) {
		if (benefitTypes && benefitTypes.length) {
			const benefit = benefitTypes.find(bt => (bt.Id == benefitId));
			if (benefit) {
				return benefit ? benefit.Name: '';
			} else {
				return '';
			}
		} else {
			return '';
		}
	}
}
