import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'getAuditorName' })
export class GetAuditorNamePipe implements PipeTransform {
	transform(auditorId: number, auditorDataSource): string {
		const auditor = auditorDataSource.filter((resp: any) => resp.Id === auditorId);
		return auditor[0].FirstName || '';
	}
}
