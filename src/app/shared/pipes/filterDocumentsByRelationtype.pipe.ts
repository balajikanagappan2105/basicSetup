import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDocumentsByRelationtype'
})
export class FilterDocumentsByRelationtypePipe implements PipeTransform {

	transform(value: any, subRelationshipId: any, DependentSubType: any): any {
		const DependentSubTypeName = DependentSubType.filter((e) => e.Id === subRelationshipId);
		if (DependentSubTypeName.lenght) {
			if (DependentSubTypeName[0].Name === 'Biological Child') {
				const output = value.filter((v) => v.Document.ClientDocument.DocumentType.Name === 'Birth Certificate');
				return output;
			}
		}
    	return value;
  	}

}
