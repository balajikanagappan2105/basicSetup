import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'getIncompleteCodes'
})

export class GetIncompleteCodesPipe implements PipeTransform {
	transform(ebvs, etId, auditId) {
		const codeIds = [];
		ebvs.forEach(ebv => {
			if (ebv.IsActive && ebv.EventTypeId === etId && ebv.ClientAuditId === auditId) {
				ebv.VerificationRequirements.forEach(vr => {
					vr.VerificationRequirementIncompleteCodes.forEach(ic => {
						codeIds.push(ic.IncompleteCodeTypeId);
					});
				});
			}
		});

		return Array.from(new Set(codeIds));
	}
}
