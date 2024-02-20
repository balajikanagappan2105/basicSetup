import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
	providedIn: 'root'
})
export class DashboardService {

	constructor(private http: HttpService) { }

	// getDependents(payload): Observable<any> {
	// 	return this.http.get('Dependent/GetDashboardDependent', payload);
	// }

	getDashboardDetails(payload): Observable<any> {
		return this.http.put('Dependent/GetDashboardDetails', payload);
	}
	getClientDependentStatusVerbiage(payload): Observable<any>
	{
		return this.http.put('Client/GetClientStatusVerbiags', payload);
	}

	getEmployeeIncompleteCodes(payload): Observable<any> {
		return this.http.put('Employee/GetEmployeeIncompleteCodes', payload);
	}

	getReceivedDocuments(payload): Observable<any> {
		return this.http.put('Employee/GetReceivedDocument', payload);
	}

	GetEmployeeLetterData(payload): Observable<any> {
		return this.http.put('EmployeeLetter/GetEmployeeLetters', payload);
	}
	GetEmployeeEmailData(payload): Observable<any> {
		return this.http.put('EmployeeEmail/GetEmployeeEmails', payload);
	}

	GetEmployeeEmailAffidavit(payload): Observable<any> {
		return this.http.put('EmployeeEmail/GetEmployeeEmailAffidavit', payload);
	}

	GetReceivedFileData(payload): Observable<any> {
		return this.http.put('Employee/GetReceivedFileData', payload);
	}

	getNotifiation(payload): Observable<any> {
		return this.http.put('Employee/GetEmployeeNotifications', payload);
	}
	GetClientAuditDeadline(payload): Observable<any> {
		return this.http.put('Client/GetClientAuditDeadlines', payload);
	}

	UpdateEmployeeLetterEmail(payload, isEmail: boolean, isSms: boolean): Observable<any> {
		return isEmail ? this.http.post('EmployeeEmail/UpdateEmployeeEmail', payload) : isSms ? this.http.post('EmployeeEmail/UpdateEmployeeSms', payload) : this.http.post('EmployeeLetter/UpdateEmployeeLetter', payload);
	}

	GetEmployeeLetterFileData(payload): Observable<any> {
		return this.http.put('EmployeeLetter/GetEmployeeLetterFileData', payload);
	}
	updateNotification(payload): Observable<any> {
        return this.http.post('Employee/UpdateNotification', payload);
    }
	GetEmployeeAffidavits(payload): Observable<any> {
		return this.http.put('EmployeeLetter/GetEmployeeAffidavits', payload);
	}

	GetEmployeeAffidavitsFileData(payload): Observable<any> {
		return this.http.put('Employee/GetEmployeeAffidavitsFileData', payload);
	}

	UploadDocument(uploadGUID, employeeId, username, dependentId, documentTypeId, payload): Observable<any> {
		// let url = 'Employee/UploadAsync?employeeId=' + employeeId;
		let url = 'Employee/UploadEmployeeDocument';
	 	const payloadData={'employeeId':employeeId,'groupId':uploadGUID,'userName':username,'dependentId':dependentId,'documentTypeId':documentTypeId,'uploadFiles':payload}
		// if (uploadGUID)
		// 	url += '&groupId=' + uploadGUID;

		// if (username)
		// 	url += '&userName=' + username;

		// if (dependentId)
		// 	url += '&dependentId=' + dependentId;

		// if (documentTypeId)
		// 	url += '&documentTypeId=' + documentTypeId;

		return this.http.upload(url, payload);
	}

	GetClientDetails(payload): Observable<any> {
		return this.http.put('Client/GetClientDetails', payload);
	}

	PortalEnquiry(payload): Observable<any> {
		return this.http.post('Employee/CreatePortalInquiry', payload);
	}

	PortalEnquiryTask(payload): Observable<any> {
		return this.http.post('Employee/CreatePortalInquiryTask', payload);
	}

	GetEventTypes(): Observable<any> {
		return this.http.get('Dependent/GetEventTypes');
	}

	activatePaperlessOption(payload) {
		return this.http.post<any>('User/ActivatePaperlessOption', payload);
	}

	getSelfDeclaredReasonsList(payload): Observable<any> {
		return this.http.put('Dependent/GetSelfDeclaredReasonsList',payload);
	}

	updateDashboardDependent(payload): Observable<any> {
		return this.http.post('Dependent/UpdateDashboardDependent', payload);
	}

	getRelationshipTypes(): Observable<any> {
		return this.http.get('AuthorizedCaller/GetRelationshipTypes');
	}

	getEmployeeSurveys(payload): Observable<any> {
		return this.http.put('Survey/GetEmployeeSurveys', payload);
	}

	getDependentSurveys(payload): Observable<any> {
		return this.http.get('Survey/GetDependentSurveys', payload);
	}

	getClientLogo(payload): Observable<any> {
		return this.http.put('Client/GetClientLogo', payload);
	}

	getClientDependentType(payload): Observable<any[]> {
		return this.http.put('Dependent/GetClientDependentType', payload)
	  }
}
