import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDocumentsByRelationtypeMap'
})
export class FilterDocumentsByRelationtypeMapPipe implements PipeTransform {

	transform(value: any, DocumentTypeRelatiponshipMap: any, docfilter: boolean): any {

		if (DocumentTypeRelatiponshipMap.length) {
			let outputDocuments = [];
			for (let index = 0; index < DocumentTypeRelatiponshipMap.length; index++) {
				const element = DocumentTypeRelatiponshipMap[index];
				for (let i = 0; i < value.length; i++) {
					const ele = value[i];
					if(ele.Document && ele.Document.ClientDocumentId === element) {
						if(docfilter){
							const checkDupCompon = outputDocuments.some(el => el.ClientEventTypeId == ele.ClientEventTypeId && el.Document && el.Document.ClientDocumentId == ele.Document.ClientDocumentId)
							if(!checkDupCompon) {
								outputDocuments.push(ele);
							}
						}
						else
						{
							outputDocuments.push(ele);
						}
						//outputDocuments.push(ele);
					} else if(ele.SurveyId) {
						const checkDuplicate = outputDocuments.some(el => el.ClientEventTypeId == ele.ClientEventTypeId && el.ClientBenefitTypeId == ele.ClientBenefitTypeId && el.SurveyId == ele.SurveyId)
						if(!checkDuplicate) {
							outputDocuments.push(ele);
						}
					}
				}
			}
			return (outputDocuments && outputDocuments.length) ? outputDocuments.sort((a,b) => a.EventBenefitVerificationId - b.EventBenefitVerificationId) : outputDocuments;
		}
    	return value;
  	}

}
