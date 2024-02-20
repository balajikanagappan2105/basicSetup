import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'getDependentDefinitionVerbiage'
})

export class GetDependentDefinitionVerbiagePipe implements PipeTransform {
	transform(dependentDefinitionVerbiageArray, LangId, clientEventTypeId) {

		for(let i=0; i<dependentDefinitionVerbiageArray.length; i++) {
			if(dependentDefinitionVerbiageArray[i].IsActive) {
				const dependentDefinitionArray = dependentDefinitionVerbiageArray[i];
				if(dependentDefinitionArray && dependentDefinitionArray.DependentDefinitionClientEventTypeMaps.length > 0){
					const foundData = dependentDefinitionArray.DependentDefinitionClientEventTypeMaps.some(ele => ele.ClientEventTypeId == clientEventTypeId);
					if (foundData && dependentDefinitionArray.DependentDefinitionVerbiages.length > 0) {
						const depDefVerbiage = dependentDefinitionArray.DependentDefinitionVerbiages.find(ct => { return ct.LanguageTypeId === +LangId; });
						if (depDefVerbiage) {
							return depDefVerbiage.Verbiage ;
						} else {
							return dependentDefinitionArray.DependentDefinitionVerbiages  && dependentDefinitionArray.DependentDefinitionVerbiages[0].Verbiage ;
						}
					}
				}
			}
		}
		return '';
	}
}
