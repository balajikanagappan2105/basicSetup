import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class AuthorizationService {

	constructor(private http: HttpService) { }

	login(payload: any) {
		return this.http.post<any>('Auth/EmployeeLogin', payload);
	}

	renewToken(payload: any) {
		return this.http.post<any>('Auth/RenewEmployeeAuthToken', payload);
	}
	logoutUser(payload: any) {
		return this.http.post<any>('Auth/Logout', payload);
	}

	updateEmployeeConsent(payload: any) {
		return this.http.post<any>('Auth/UpdateEmployeeConsent', payload);
	}

	validateEmployeeLogin(payload: any) {
		return this.http.put<any>('Employee/ValidateEmployeeLogin', payload);
	}
	getEmployeeUploadDocumentStatus(payload: any) {
		return this.http.put<any>('Employee/GetEmployeeUploadDocumentStatus', payload);
	}
	getEmployeeDependentUploadDocumentStatus(payload: any) {
		return this.http.put<any>('Employee/GetEmployeeDependentUploadDocumentStatus', payload);
	}
	getEmployeeUploadStatus(payload: any) {
		return this.http.put<any>('Employee/GetEmployeeUploadStatus', payload);
	}
	validateEmployee(payload: any) {
		return this.http.post<any>('Auth/ValidateEmployee', payload);
	}

	validateAuthDeatils(payload: any){
		return this.http.post<any>('Auth/ValidateAuthentication', payload);
	}

	sendEmailOTP(payload: any){
		return this.http.post<any>('Auth/SendEmailOTP', payload);
	}

	resendEmailOTP(payload: any){
		return this.http.post<any>('Auth/ResendEmailOTP', payload);
	}

	sendMobileOTP(payload: any){
		return this.http.post<any>('Auth/SendMobileOTP', payload);
	}

	resendMobileOTP(payload: any){
		return this.http.post<any>('Auth/ResendMobileOTP', payload);
	}

	validateOTP(payload: any){
		return this.http.post<any>('Auth/ValidateOTP', payload);
	}

	updateEmail(payload: any){
		return this.http.post<any>('Auth/UpdateEmail', payload);
	}

	updateMobileNumer(payload: any){
		return this.http.post<any>('Auth/UpdateMobileNumber', payload);
	}

	createNewAccount(payload: any){
		return this.http.post<any>('Auth/CreateNewAccount', payload);
	}

	getLoginEmployeeDetails(payload: any) {
		return this.http.post<any>('Auth/GetLoginEmployeeDetails', payload);
	}

	getLoginEmployee(payload: any) {
		return this.http.post<any>('Auth/GetLoginEmployee', payload);
	}

	setEmployeeLanguage(payload) {
		return this.http.post<any>('Auth/SetEmployeeLanguage', payload);
	}

	updatePaperLessOption(payload) {
		return this.http.post<any>('User/UpdatePaperLessOption', payload);
	}
	GetEmployeeUser(payload) {
		return this.http.post<any>('User/GetEmployeeUser', payload)
	}

	sendForgetUserName(payload){
		return this.http.post<any>('Auth/SendForgetUserName', payload);
	}
}
