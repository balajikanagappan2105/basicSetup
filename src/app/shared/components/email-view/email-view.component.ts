import { Component, OnInit, Input } from '@angular/core';
import { IEmailView } from '../../models/emailview.model';

import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
	selector: 'app-email-view',
	templateUrl: './email-view.component.html',
	styleUrls: ['./email-view.component.scss'],
	providers: [AccountService]
})
export class EmailViewComponent implements OnInit {

	@Input() emailSource: IEmailView;

	public pdfViewerDialog: any = { visible: false, objectUri: null };

	showLoader: boolean = true;
	pdfObjectURI: any = null;
	printContentHTML: any;
	showPortal: boolean = false;
	emailPrintHTML: any;

	constructor(public accountService: AccountService,public authService: AuthenticationService) { }

	ngOnInit() {
		this.showLoader = false;
	}

	printEmail(evt: Event) {
		this.downloadPrintEmailPDF(true);
		// this.emailPrintHTML = document.getElementById('divEmailContainer').innerHTML;
		// this.showPortal = true;
	}

	downloadEmail(evt: Event) {
		this.downloadPrintEmailPDF(false);
		// this.downloadPrintPDF();
	}

	downloadPrintEmailPDF(isPrint: boolean) {
		this.showLoader = true;

		const payload = {
			employeeId : this.authService.getEmployeeId,
			clientid : this.authService.getClientId,
			employeeEmailId: this.emailSource.Id };

		this.accountService.getEmployeeEmailPDF(payload).subscribe((res) => {
			let base64DataContent = "data:application/pdf;base64," + res.DataFile;
			let objectURI = this.getbloburl(base64DataContent);

			if (isPrint) {
				window.open(objectURI);
			} else {
				const currentDateTime = new Date();
				const filename = this.emailSource.EmailType + '_'
					+ currentDateTime.getFullYear().toString().padStart(2, "0")
					+ (currentDateTime.getMonth() + 1).toString().padStart(2, "0")
					+ currentDateTime.getDate().toString().padStart(2, "0")
					+ currentDateTime.getHours().toString().padStart(2, "0")
					+ currentDateTime.getMinutes().toString().padStart(2, "0")
					+ currentDateTime.getSeconds().toString().padStart(2, "0")
					+ ".pdf";

				let pdfDownloadLink = document.createElement("a");
				pdfDownloadLink.style.display = "none";
				document.body.appendChild(pdfDownloadLink);
				pdfDownloadLink.setAttribute("href", objectURI);
				pdfDownloadLink.setAttribute("download", filename);
				pdfDownloadLink.click();
				document.body.removeChild(pdfDownloadLink);
			}
		}, err => {
		}).add(() => {
			this.showLoader = false;
		});
	}

	getbloburl(dataURI: string) {
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

	downloadPrintPDF() {
		this.showLoader = true;
		window["html2canvas"] = html2canvas;
		document.getElementById('divEmailPrintableContentContainer').classList.remove("hide");
		document.getElementById('divEmailPrintableContentContainer').innerHTML = document.getElementById('divEmailContainer').innerHTML;
		setTimeout(() => {
			this.processPDF();
		}, 10);
	}

	processPDF() {
		const currentDateTime = new Date();
		const filename = 'Email' + '_'
			+ currentDateTime.getFullYear().toString().padStart(2, "0")
			+ (currentDateTime.getMonth() + 1).toString().padStart(2, "0")
			+ currentDateTime.getDate().toString().padStart(2, "0")
			+ currentDateTime.getHours().toString().padStart(2, "0")
			+ currentDateTime.getMinutes().toString().padStart(2, "0")
			+ currentDateTime.getSeconds().toString().padStart(2, "0")
			+ ".pdf";

		const printContentElement = document.getElementById("divEmailPrintableContentContainer");

		var html2canvasOption = {
			//scale: 2, //1-10
			allowTaint: true,
			useCORS: true,
			logging: false,
			dpi: 96,
			letterRendering: true
		};

		html2canvas(printContentElement, html2canvasOption).then(canvas => {
			document.body.appendChild(canvas);

			var pdfOption = {
				unit: 'pt',
				format: 'a4', //a1, a4, letter
				orientation: 'portrait', //portrait, landscape
				pagesplit: true,
				margins: [2, 2, 2, 2],
				documentProperties: {
					title: 'Consova Email',
					subject: 'Consova Email',
					author: 'Consova',
					keywords: 'Consova,Email',
					creator: 'Consova'
				}
			};

			const fixHeight = 1250;
			const fixWidth = 900;

			var pdfDocument = new jsPDF(pdfOption);
			for (var i = 0; i <= printContentElement.clientHeight / fixHeight; i++) {
				//! This is all just html2canvas stuff
				var srcImg = canvas;
				var sX = 0;
				var sY = fixHeight * i; // start 980 pixels down for every new page
				var sWidth = fixWidth;
				var sHeight = fixHeight;
				var dX = 0;
				var dY = 0;
				var dWidth = fixWidth;
				var dHeight = fixHeight;

				let onePageCanvas = document.createElement("canvas");
				onePageCanvas.setAttribute('width', fixWidth.toString());
				onePageCanvas.setAttribute('height', fixHeight.toString());
				var ctx = onePageCanvas.getContext('2d');

				// Slice Image
				ctx.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

				// document.body.appendChild(canvas);
				var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

				var width = onePageCanvas.width;
				var height = onePageCanvas.clientHeight;

				//! If we're on anything other than the first page, add another page
				if (i > 0) {
					pdfDocument.addPage(pdfOption);
				}

				//! now we declare that we're working on that page
				pdfDocument.setPage(i + 1);

				//! now we add content to that page!
				pdfDocument.addImage(canvasDataURL, 'PNG', 20, 40, (width * .62), (height * .62));
			}

			// pdfDocument.autoPrint();
			// let objectSRC = pdfDocument.output("datauristring", { filename: filename });

			pdfDocument.save(filename, { returnPromise: true }).then((scb, ecb) => {
				document.getElementById("divEmailPrintableContentContainer").innerHTML = "";
				document.getElementById('divEmailPrintableContentContainer').classList.add("hide");
				document.body.removeChild(canvas);
				this.showLoader = false;
			});
		});
	}
}
