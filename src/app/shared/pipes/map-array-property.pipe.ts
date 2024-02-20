import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapArrayProperty'
})
export class MapArrayPropertyPipe implements PipeTransform {

  transform(value: any[], property: string): any {
	let intArray: any[] = [];
    intArray = value.map(x => x[property]);

	return Object.values(

		intArray.reduce((a, b) => {

		  if (!a[b]) a[b] = b;

		  return a;

		}, {})

	  );
  	}
}
