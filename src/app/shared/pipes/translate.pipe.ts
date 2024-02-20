import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from 'src/app/core/services/translate.service';

@Pipe({
	name: 'translate',
	pure: false
})
export class TranslatePipe implements PipeTransform {

	constructor(private translate: TranslateService) { }

	transform(key: any, objName?: any): any {
		if (!Object.keys(this.translate.data).length) return key;

		return objName ? this.translate.data[objName][key] : this.translate.data[key] || key;
	}

}
