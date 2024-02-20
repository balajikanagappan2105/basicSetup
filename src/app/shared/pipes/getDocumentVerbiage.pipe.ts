import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'getDocumentVerbiage'
})

export class GetDocumentVerbiagePipe implements PipeTransform {
	transform(id, ClientDocuments, LangId) {
		const clientDocument = ClientDocuments.find(ct => { return ct.Id === id; });
		if (clientDocument && clientDocument.ClientDocumentVerbiage.length) {
			const clientDocumentverbiage = clientDocument.ClientDocumentVerbiage.find(ct => { return ct.LanguageTypeId === +LangId; });
			if (clientDocumentverbiage) {
				return clientDocumentverbiage.RichTextVerbiage ? clientDocumentverbiage.RichTextVerbiage : clientDocumentverbiage.Verbiage;
			} else {
				return clientDocument && clientDocument.ClientDocumentVerbiage[0].RichTextVerbiage ? clientDocument.ClientDocumentVerbiage[0].RichTextVerbiage : clientDocument.ClientDocumentVerbiage[0].Verbiage;
			}
		} else {
			return '';
		}
	}
}
