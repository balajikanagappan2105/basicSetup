//getLetterForIncomplete:benefitTypes:auditId:eventType.Id:incompleteId"
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'getLetterForIncomplete'
})

export class GetLetterForIncompletePipe implements PipeTransform {
	transform(ebvs, bts, auditId, etId, incompleteId) {
		const btIds = [];
		ebvs.forEach(ebv => {
			if (ebv.IsActive && ebv.ClientAuditId === auditId && ebv.EventTypeId === etId) {
				ebv.VerificationRequirements.forEach(vr => {
					vr.VerificationRequirementIncompleteCodes.forEach(ic => {
						if (ic.IncompleteCodeTypeId === incompleteId) {
							btIds.push(ebv.BenefitTypeId);
						}
					});
				});
			}
		});

		const filteredBts = bts.filter(bt => {
			return btIds.includes(bt.Id);
		});

		return filteredBts.map(bt => {
			return bt.Name.slice(0, 1);
		});
	}
}
