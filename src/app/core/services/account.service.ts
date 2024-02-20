import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeAccount } from 'src/app/shared/models/employee-account';
import { HttpService } from './http.service';

@Injectable({
	providedIn: 'root'
})
export class AccountService {

	constructor(private http: HttpService) { }

	getAccountDetail(payload): Observable<EmployeeAccount> {
		return this.http.put('Employee/GetEmployeeAccount', payload);
	}

	checkEmployeeGoGreen(payload): Observable<any> {
		return this.http.put('Employee/CheckEmployeeGoGreen', payload);
	}

	getAuthorizedCallers(payload): Observable<any> {
		return this.http.put('AuthorizedCaller/GetAuthorizedCallers', payload);
	}

	UpdateEmployee(payload): Observable<any> {
		return this.http.post('Employee/UpdateEmployee', payload);
	}

	UpdateEmployeeEscation(payload): Observable<any> {
		return this.http.post('EmployeeEscalation/UpdateEmployeeEscation', payload);
	}

	getRelationshipTypes(): Observable<any> {
		return this.http.get('AuthorizedCaller/GetRelationshipTypes');
	}

	createAuthorizedCaller(payload): Observable<any> {
		return this.http.post('AuthorizedCaller/CreateAuthorizedCaller', payload);
	}

	updateAuthorizedCaller(payload): Observable<any> {
		return this.http.post('AuthorizedCaller/UpdateAuthorizedCaller', payload);
	}

	deleteAuthorizedCaller(payload): Observable<any> {
		return this.http.post('AuthorizedCaller/DeleteAuthorizedCaller', payload);
	}

	enableEmployeePaperlessOption(payload) {
		return this.http.get<any>('User/EnableEmployeePaperlessOption', payload);
	}

	getSurveyDetails(payload): Observable<any> {
		return this.http.get('Survey/GetDependentQuestionairres', payload);
	}

	getEmployeePreferedEmailStatus(payload) {
		return this.http.post<any>('User/GetEmployeePreferedEmailStatus', payload);
	}

	resendEmployeePreferedEmail(payload) {
		return this.http.get<any>('User/ResendEmployeePreferedEmail', payload);
	}

	disenrollPaperlessOption(payload) {
		return this.http.get<any>('User/DisenrollPaperlessOption', payload);
	}

	getEmployeeEmailPDF(payload): Observable<any> {
		return this.http.put('EmployeeEmail/GetEmployeeEmailPDF', payload);
	}

	getPreferredLanguage(payload): Observable<number> {
		return this.http.post<number>('User/GetPreferredLanguage', payload);
	}

	getNewPreferredLanguage(payload): Observable<number> {
		return this.http.post<number>('Auth/GetPreferredLanguage', payload);
	}

	getClientEventType(payload): Observable<any[]> {
		return this.http.put('Dependent/GetAllByClientId', payload)
	}

	getAllClientBenefitTypes(payload): Observable<any[]> {
		return this.http.put('ClientBenefitType/GetClientBenefitType', payload)
	}
}
