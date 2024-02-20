import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'getRelationShip'
})

export class GetRelationShipPipe implements PipeTransform {
	transform(value, relationShipDs) {

		const result = relationShipDs.filter(res => {
			return res.Id === value;
		});
		const relationShip = result.length ? result[0].Name : 'No Data Avalilable';
		return relationShip
	}
}
