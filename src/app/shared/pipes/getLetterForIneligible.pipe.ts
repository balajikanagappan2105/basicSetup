import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'getLetterForIneligible'
})

export class GetLetterForIneligiblePipe implements PipeTransform {
	transform(ebvs, bts, auditId, etId, IneligibleId) {
		const filteredEbvs = ebvs.filter(ebv => {
			return ebv.IsActive && ebv.ClientAuditId === auditId && ebv.EventTypeId === etId && ebv.IneligibleCodeId === IneligibleId;
		});

		const btIds = filteredEbvs.map(ebv => {
			return ebv.BenefitTypeId;
		});

		const filteredBts = bts.filter(bt => {
			return btIds.includes(bt.Id);
		});

		return filteredBts.map(bt => {
			return bt.Name.slice(0, 1);
		});
	}
}
