import { Pipe, PipeTransform } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Pipe({
	name: 'getEventTypeStatus'
})
export class GetEventTypeStatusPipe implements PipeTransform {

	constructor(public authService: AuthenticationService) { }

	transform(column: any, dataSource: any, index: any): string {
		const resultArray = {
			Complete: [],
			Incomplete: [],
			Inprocess: [],
			NonResponder: [],
			Ineligible: [],
			NullStatus: [],
			SurveyStatus: []
		};
		// if (this.authService.isMarkAsIneligible) {
		// 	return 'In Process';
		// }
		const keys = Object.keys(dataSource[0]);
		let colLength = 0;
		const colArray = column.split(" ");
		for (let s = 0; s < keys.length; s++) {
			const splitName = keys[s].split('_');
			// if (colArray[0] === splitName[0]) {
			if (splitName.indexOf(colArray[0]) >= 0) {
				colLength++;

				switch (dataSource[index][keys[s]]) {
					case 'Complete':
						resultArray.Complete.push(dataSource[index][keys[s]]);
						break;
					case 'Incomplete':
						resultArray.Incomplete.push(dataSource[index][keys[s]]);
						break;
					case 'In Process':
						resultArray.Inprocess.push(dataSource[index][keys[s]]);
						break;
					case 'Non Responder':
						resultArray.NonResponder.push(dataSource[index][keys[s]]);
						break;
					case 'Ineligible':
						resultArray.Ineligible.push(dataSource[index][keys[s]]);
						break;
					default:
						if(dataSource[index][keys[s]]) {
							resultArray.SurveyStatus.push(dataSource[index][keys[s]]);
						} else {
							resultArray.NullStatus.push(dataSource[index][keys[s]]);
						}
						break;
				}
			}
		}

		// if(resultArray.Incomplete.length > 0) {
		// 	return 'Incomplete';
		// } else if(
		// 	(resultArray.Complete.length > 0 &&
		// 	resultArray.Ineligible.length > 0 &&
		// 	resultArray.Incomplete.length === 0 &&
		// 	resultArray.Inprocess.length === 0 &&
		// 	resultArray.NonResponder.length === 0)
		// 	||
		// 	(resultArray.Complete.length > 0 &&
		// 	resultArray.Ineligible.length === 0 &&
		// 	resultArray.Incomplete.length === 0 &&
		// 	resultArray.Inprocess.length === 0 &&
		// 	resultArray.NonResponder.length === 0)
		// 	) {
		// 	return 'Complete';
		// } else if(
		// 	resultArray.NonResponder.length > 0 &&
		// 	resultArray.Complete.length === 0 &&
		// 	resultArray.Ineligible.length === 0 &&
		// 	resultArray.Incomplete.length === 0 &&
		// 	resultArray.Inprocess.length === 0
		// 	) {
		// 	return 'Non Responder';
		// } else if(
		// 	resultArray.Inprocess.length > 0 &&
		// 	resultArray.Complete.length === 0 &&
		// 	resultArray.Ineligible.length === 0 &&
		// 	resultArray.Incomplete.length === 0 &&
		// 	resultArray.NonResponder.length === 0
		// 	) {
		// 	return 'In Process'
		// } else if(
		// 	resultArray.NonResponder.length === 0 &&
		// 	resultArray.Inprocess.length === 0 &&
		// 	resultArray.Incomplete.length === 0 &&
		// 	resultArray.Complete.length === 0 &&
		// 	resultArray.Ineligible.length > 0
		// 	) {
		// 	return 'Ineligible';
		// } else if(
		// 	resultArray.NonResponder.length === 0 &&
		// 	resultArray.Inprocess.length === 0 &&
		// 	resultArray.Incomplete.length === 0 &&
		// 	resultArray.Complete.length === 0 &&
		// 	resultArray.Ineligible.length === 0
		// ) {
		// 	return 'N/A';
		// }
		if (dataSource[index].selectedReason != "" && dataSource[index].selectedReason.IneligibleCodeType.Description == "System" && dataSource[index].selectedReason.Description == "Non-Responder" && (colLength === (resultArray.NullStatus.length + resultArray.NonResponder.length))) {
			if((!this.authService.isEmployeeDocumentUploded && !this.authService.isDependentSelfDeclared.length) || (resultArray.NonResponder.length > 0 && this.authService.isEmployeeDocumentUploded) || (resultArray.NonResponder.length > 0 && this.authService.isDependentSelfDeclared.length) || (resultArray.NonResponder.length === 0 && resultArray.Inprocess.length > 0)) {
				if(dataSource.some(ele => ele.DependentSelfDeclaredReasonId)) {
					return 'In Process'
				} else {
					if(dataSource[index].DocumentUploadStatus == 'true' || this.authService.isAnySurveyCompleted){
						return 'In Process';
					} else{
						return 'Non Responder';
					}
				}
			} else {
				if(dataSource[index].DocumentUploadStatus == 'true' || this.authService.isAnySurveyCompleted){
					return 'In Process';
				} else{
					return 'Non Responder';
				}
			}
		}
		else if (dataSource[index].selectedReason != "" && dataSource[index].selectedReason.IneligibleCodeType.Description == "System" && dataSource[index].selectedReason.Description == "InComplete" && (resultArray.NonResponder.length === 0 && resultArray.Inprocess.length === 0 && resultArray.Incomplete.length > 0)) {
			return 'Incomplete';
		}

		else if (resultArray.NonResponder.length > 0
			&& !this.authService.isEmployeeDocumentUploded
			&& !this.authService.isDependentSelfDeclared.length) {
				if(this.authService.isMarkAsIneligible) {
					return 'In Process'
				} else {
					if(dataSource[index].DocumentUploadStatus == 'true' || this.authService.isAnySurveyCompleted){
						return 'In Process';
					} else{
						return 'Non Responder';
					}
				}
		}
		else if ((resultArray.NonResponder.length > 0 && this.authService.isEmployeeDocumentUploded) || (resultArray.NonResponder.length > 0 && this.authService.isDependentSelfDeclared.length)) {
			if(dataSource[index].DocumentUploadStatus == 'true'  || this.authService.isAnySurveyCompleted){
				return 'In Process';
			} else{
				return 'Non Responder';
			}
		} else if (resultArray.NonResponder.length === 0 && resultArray.Inprocess.length > 0) {
			return 'In Process';
		} else if (resultArray.NonResponder.length === 0 && resultArray.SurveyStatus.length > 0) {
			return resultArray.SurveyStatus[0];
		} else if (resultArray.NonResponder.length === 0 && resultArray.Inprocess.length === 0 && resultArray.Incomplete.length > 0) {
			return 'Incomplete';
		} else if (
			(resultArray.Complete.length > 0 &&	resultArray.Ineligible.length > 0 && resultArray.Incomplete.length === 0 && resultArray.Inprocess.length === 0 && resultArray.NonResponder.length === 0)
			||
			(resultArray.NonResponder.length === 0 && resultArray.Inprocess.length === 0 && resultArray.Incomplete.length === 0 && resultArray.Complete.length > 0 && resultArray.Ineligible.length === 0 &&(colLength === (resultArray.NullStatus.length + resultArray.Complete.length)))
		) {
			return 'Complete';
		}
		else if (resultArray.NonResponder.length === 0 && resultArray.Inprocess.length === 0 && resultArray.Incomplete.length === 0 && resultArray.Complete.length === 0 && (colLength === (resultArray.NullStatus.length + resultArray.Ineligible.length))) {
			return 'Ineligible';
		} else if (resultArray.NonResponder.length === 0 && resultArray.Inprocess.length === 0 && resultArray.Incomplete.length === 0 && resultArray.Complete.length === 0 && (colLength === resultArray.NullStatus.length)) {
			return 'N/A';
		}

	}

}
