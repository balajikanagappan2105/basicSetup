import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'getClientBenefitTypeVerbiage'
})

export class GetClientBenefitTypeVerbiage implements PipeTransform {
	transform(clientBenefits: number[], clientEventTypes: any[], ClientEventTypeId: number, currentLangTypeId: number, clientBenefitTypes: any[], isDisplayCode?: boolean) {
		let BenefitNames: string[] = [];

		if (clientEventTypes && clientEventTypes.length) {
			const clientEventType = clientEventTypes.find(x => x.Id == ClientEventTypeId);
			if (clientEventType && clientEventType.ClientEventBenefitMaps && clientEventType.ClientEventBenefitMaps.length) {

				//let clientBenefitType = clientEventType.ClientEventBenefitMaps.filter(x => clientBenefits.includes(x.ClientBenefitTypeId));

				let clientBenefitType = clientBenefitTypes.filter(x => clientBenefits.includes(x.Id));

				if(clientBenefitType && clientBenefitType.length) {
					for(let i=0; i< clientBenefitType.length; i++) {
						if(clientBenefitType[i].ClientBenefitTypeVerbiages && clientBenefitType[i].ClientBenefitTypeVerbiages.length) {
							if(clientBenefitType[i].ClientBenefitTypeVerbiages.find(x => x.LanguageTypeId == Number(+currentLangTypeId))) {
								if(isDisplayCode) {
									BenefitNames.push(clientBenefitType[i].ClientBenefitTypeVerbiages.find(x => x.LanguageTypeId == Number(+currentLangTypeId)).Code)
								} else {
									BenefitNames.push(clientBenefitType[i].ClientBenefitTypeVerbiages.find(x => x.LanguageTypeId == Number(+currentLangTypeId)).Verbiage)
								}
							} else {
								if(isDisplayCode) {
									BenefitNames.push(clientBenefitType[i].ClientBenefitTypeVerbiages[0].Code)
								} else {
									BenefitNames.push(clientBenefitType[i].ClientBenefitTypeVerbiages[0].Verbiage)
								}
							}
						} else {
							if(isDisplayCode) {
								BenefitNames.push(clientBenefitType[i].ClientBenefitTypeVerbiages.find(x => x.LanguageTypeId == Number(+currentLangTypeId)).Code);
							} else {
								BenefitNames.push(clientBenefitType[i].Name);
							}
						}
					}
				}
			} else {

			}
		} else {

		}
		return (BenefitNames && BenefitNames.length) ? BenefitNames.join(', ') : '';
	}
}
