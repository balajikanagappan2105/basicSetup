import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from 'src/app/core/services/translate.service';

@Pipe({
	name: 'getCustomRuleStatusVerbiage'
})

export class GetCustomRuleStatusVerbiagePipe implements PipeTransform {
	constructor(public translateService: TranslateService) {}
	transform(status: string, ebvs: any[], ebvId: number[], LangId, ClientStatusVerbiages: any[]) {
		const englishLanguageId = this.translateService.languageList.find(ele => ele.LanguageType.Name.toUpperCase() == 'ENGLISH').LanguageTypeId;
		if(ebvId){
			const ebv = ebvs.find(x => x.Id == (ebvId && ebvId.length > 0 ? ebvId[0]: null));
			if (ebv && ebv.Status != 'In Process') {
				const statusVerbiageList = ClientStatusVerbiages.find(x => x.LanguageTypeId == LangId && x.EventRuleId == (ebv.EventRuleId ? ebv.EventRuleId: 0));
				if (statusVerbiageList) {
					const verbiageValue = statusVerbiageList.Verbiage;
					return verbiageValue ? verbiageValue : '';
				} else {
					const EnglishStatusVerbiageList = ClientStatusVerbiages.find(x => x.LanguageTypeId == englishLanguageId && x.EventRuleId == (ebv.EventRuleId ? ebv.EventRuleId: 0));
					return EnglishStatusVerbiageList ? EnglishStatusVerbiageList.Verbiage : '';
				}
			} else {
				return '';
			}
		} else {
			const ebv = ebvs.find(x => (x.DisplayStatus.toLowerCase() == status.toLowerCase() || x.Status.toLowerCase() == status.toLowerCase()));
			if (ebv && ebv.Status != 'In Process') {
				const statusVerbiageList = ClientStatusVerbiages.find(x => x.LanguageTypeId == LangId && x.EventRuleId == (ebv.EventRuleId ? ebv.EventRuleId: 0));
				if (statusVerbiageList) {
					const verbiageValue = statusVerbiageList.Verbiage;
					return verbiageValue ? verbiageValue : '';
				} else {
					const EnglishStatusVerbiageList = ClientStatusVerbiages.find(x => x.LanguageTypeId == englishLanguageId && x.EventRuleId == (ebv.EventRuleId ? ebv.EventRuleId: 0));
					return EnglishStatusVerbiageList ? EnglishStatusVerbiageList.Verbiage : '';
				}
			} else {
				return '';
			}
		}
	}
}
