import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'getRelationshipVerbiage'
})

export class GetRelationshipVerbiage implements PipeTransform {
	transform(ClientDependentTypeId: number, ClientDependentTypes: any[], CurrentLanguageTypeId: number, defaultVerbiage: string, RelationToEmployee?: string, SubClientId?: number) {
		let Verbiage: string = "";
		if(ClientDependentTypeId) {
			let ClientDependentType = ClientDependentTypes.find(x => x.Id == ClientDependentTypeId);
			if(ClientDependentType) {
				let ClientDependentTypeVerbiage = ClientDependentType.ClientDependentTypeVerbiages.find(x => x.LanguageTypeId == CurrentLanguageTypeId);
				if(ClientDependentTypeVerbiage) {
					Verbiage = ClientDependentTypeVerbiage.Relationship;
				}
			}
		} else {
			let ClientDependentType = Number(+SubClientId) > 0 ? ClientDependentTypes.find(x => x.DependentType.Abbreviation.toUpperCase() == RelationToEmployee.toUpperCase() && x.ClientDependentTypeSubClients.map(sb => sb.SubClientId).includes(Number(+SubClientId))) : ClientDependentTypes.find(x => x.DependentType.Abbreviation.toUpperCase() == RelationToEmployee.toUpperCase() && x.ClientDependentTypeSubClients.length == 0);
			if(ClientDependentType) {
				let ClientDependentTypeVerbiage = ClientDependentType.ClientDependentTypeVerbiages.find(x => x.LanguageTypeId == CurrentLanguageTypeId);
				if(ClientDependentTypeVerbiage) {
					Verbiage = ClientDependentTypeVerbiage.Relationship;
				}
			}
		}

		return Verbiage != '' ? Verbiage : defaultVerbiage;
	}
}
