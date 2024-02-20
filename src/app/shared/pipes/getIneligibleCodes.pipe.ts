import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'getIneligibleCodes'
})

export class GetIneligibleCodesPipe implements PipeTransform {
	transform(dependent, ineligibleCodes, auditId, etId, ebvsArray) {

		let ebvs = dependent.EventBenefitVerifications.filter(ebv => {
			return ebv.IsActive && ebv.ClientAuditId === auditId && ebv.EventTypeId === etId;
		})

		const ids = ebvs.map(ebv => {
			return ebv.IneligibleCodeId;
		});

		const codes = ineligibleCodes.filter(et => {
			return ids.includes(et.Id);
		});

		return codes
	}
}
