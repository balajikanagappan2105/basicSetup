import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'getSelfDeclaration'
})

export class GetSelfDeclarationPipe implements PipeTransform {
	transform(value, SelfDeclarationDs, langId) {
		if(SelfDeclarationDs.length > 0) {
        const result = SelfDeclarationDs.find(res => res.Id === value);
        const verbiage = result && result.IneligibleCodeVerbiage.find(r => r.LanguageTypeId === +langId);
        const selfDeclaration = verbiage ? verbiage.Verbiage : result.Description;
        return selfDeclaration;
		} else {
			return '';
		}
    }
}
