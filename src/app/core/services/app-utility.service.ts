import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppUtilityService {

	constructor() { }

	setDropDownPanelSize(callerElement: any) {
		const itemWrapper = callerElement.valueAccessor ? callerElement.valueAccessor.itemsWrapper : callerElement.itemsWrapper;
		const elProperty = callerElement.valueAccessor ? callerElement.valueAccessor.el : callerElement.el;

		if (itemWrapper.attributes.style.nodeValue.toString().indexOf(';width: ') === -1)
			itemWrapper.attributes.style.nodeValue += ';width: ' + elProperty.nativeElement.offsetWidth.toString() + 'px;';
	}

	getTimeTickerValue(tickValue: number): string {
		if (tickValue < 1) return '';

		let inDays = Math.floor(tickValue / (1000 * 60 * 60 * 24));
		let inHours = Math.floor(tickValue / (1000 * 60 * 60)) % 24;
		let inMinutes = Math.floor(tickValue / (1000 * 60)) % 60;
		let inSeconds = Math.floor(tickValue / 1000) % 60;

		let displayValue = inDays > 0 ? (inDays.toString().padStart(2, '0') + ':') : '';
		displayValue += inHours > 0 ? (inHours.toString().padStart(2, '0') + ':') : (displayValue.length > 0 ? '00:' : '');
		displayValue += inMinutes.toString().padStart(2, '0') + ':';
		displayValue += inSeconds.toString().padStart(2, '0');

		return displayValue;
	}

	generateRandomText() {
		const d = new Date();
		const n = d.getTime();
		const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890)(';
		const lengthOfCode = 16;
		let text = '';
		for (let i = 0; i < lengthOfCode; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text + '_' + n;
	}

	getBloburl(dataURI) {
		let blobData = this.dataURIToBlob(dataURI);
		let objectURL = URL.createObjectURL(blobData);
		return objectURL;
	}

	dataURIToBlob(dataURI) {
		let binaryString = atob(dataURI.split(',')[1]);
		let contentLength = binaryString.length;
		let arrayContent = new Uint8Array(contentLength);
		let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

		for (var i = 0; i < contentLength; i++) {
			arrayContent[i] = binaryString.charCodeAt(i);
		}

		return new Blob([arrayContent], {
			type: mimeString
		});
	}

}
