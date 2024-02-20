import { Pipe } from '@angular/core';

@Pipe({ name: 'convertFileSize' })

export class ConvertFileSize {
	constructor() { }

	transform(convertValue: number, convertTo?: string): any {
		const size = convertValue;
		let mb;
		if (convertTo) {
			switch (convertTo) {
				case 'GB':
					mb = (size * 0.000000001).toFixed(2) + ' GB'
					break;
				case 'MB':
					mb = (size * 0.000001).toFixed(2) + ' MB'
					break;
				case 'KB':
					mb = (size * 0.001).toFixed(2) + ' KB'
					break;
				default:
					mb = (size).toFixed(2) + ' Bytes'
					break;
			}
		} else {
			if(size * 0.000000001 >= 1) {
				mb = (size * 0.000000001).toFixed(2) + ' GB'
			} else if(size * 0.000001 >= 1) {
				mb = (size * 0.000001).toFixed(2) + ' MB'
			} else if(size * 0.001 >= 1) {
				mb = (size * 0.001).toFixed(2) + ' KB'
			} else {
				mb = (size).toFixed(2) + ' Bytes'
			}
		}
		return mb;
	}
}
