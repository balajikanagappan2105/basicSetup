import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpXsrfTokenExtractor, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, mergeMap, materialize, delay, dematerialize } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class HttpService implements HttpInterceptor {

    idpEndpointList = ['auth/employeelogin','auth/logout', 'auth/renewemployeeauthtoken', 'auth/updateemployeeconsent', 'user/enableemployeepaperlessoption', 'user/activatepaperlessoption', 'user/setemployeelanguage', 'user/getemployeepreferedemailstatus', 'user/resendemployeepreferedemail', 'user/disenrollpaperlessoption', 'auth/getnothing', 'user/getpreferredlanguage', 'auth/validateemployee', 'resetpassword/forgotpassword', 'resetpassword/submitnewpassword', 'resetpassword/forgotpasswordiverify', 'resetpassword/submitnewpasswordiverify', 'resetpassword/changepasswordiverify', 'auth/validateauthentication', 'auth/sendemailotp', 'auth/resendemailotp', 'auth/sendmobileotp', 'auth/resendmobileotp', 'auth/validateotp', 'auth/updateemail', 'auth/createnewaccount', 'auth/getloginemployeedetails', 'auth/setemployeelanguage', 'user/updatepaperlessoption', 'user/getemployeeuser','auth/getpreferredlanguage', 'auth/getloginemployee', 'auth/sendforgetusername', 'auth/updatemobilenumber','resetpassword/sendforgotpasswordotp','resetpassword/verifyusername'];
	coreCommunicationEndPointList = ['employeeletter/getemployeeletters', 'employeeemail/getemployeeemails', 'employeeemail/getemployeeemailpdf', 'employeeemail/updateemployeeemail', 'employeeletter/updateemployeeletter', 'employeeletter/getemployeeletterfiledata', 'employeeemail/getemployeeemailaffidavit', 'survey/getdependentsurveys', 'survey/getsurveyquestionnaire', 'survey/createemployeequestionnaireresponse', 'survey/completesurvey', 'survey/completequickstart', 'survey/getemployeequestionairres', 'survey/getemployeesurveys', 'survey/getdependentquestionairres', 'employee/getemployeeaccount', 'survey/downloadsurveyaffidavit', 'survey/getpreviousslidesurveyquestionnaire', 'survey/updateemployeequestionnaire', 'survey/mapemployeequestionnaire', 'survey/generatesurveypdf', 'dependent/updatedependentsubtype', 'survey/getsurveyoutcomeconfig', 'employeeletter/getemployeeaffidavits', 'survey/retakesurveyupdate', 'authorizedcaller/getauthorizedcallers',
									 'authorizedcaller/createauthorizedcaller', 'authorizedcaller/updateauthorizedcaller', 'authorizedcaller/deleteauthorizedcaller', 'authorizedcaller/getrelationshiptypes', 'dependent/getdashboardetails', 'dependent/geteventtypes', 'dependent/getselfdeclaredreasonslist', 'dependent/getemployeedependentdetails', 'dependent/getdependentsubtypes', 'dependent/updatedependent', 'dependent/updatemultipledependent', 'dependent/getdependentverification', 'dependent/getdependentandverificationrequirements', 'dependent/getwizardsummary', 'dependent/getdependentsubtypelist', 'dependent/getclientdependentsubtypes', 'dependent/getdocumenttyperelationshipmap', 'employee/checkemployeegogreen', 'employee/updateemployee', 'employee/validateemployeelogin', 'employee/getemployeeuploaddocumentstatus', 'employee/getemployeeincompletecodes', 'employee/getreceiveddocument', 'employee/getreceivedfiledata', 'employee/getemployeenotifications',
									 'employee/updateemployeeemail', 'employee/updateemployeeletter', 'employee/getemployeeletterfiledata', 'employee/getemployeeaffidavits', 'employee/getemployeeaffidavitsfiledata', 'client/getclientlogo', 'client/getclientdetails', 'employee/getlanguage', 'employee/getwizardslideverbiage', 'employee/createportalinquirytask', 'client/getclientlogo', 'dependent/getdashboarddetails', 'activity/getactivitytype', 'activity/createactivity', 'employee/getclientdetails', 'dependent/getclientdependenttype', 'dependent/getallbyclientid', 'client/getclientstatusverbiags', 'activity/getnothing', 'clientauditdeadline/getclientauditdeadlines', 'employee/getemployeeuploadstatus', 'employee/getemployeedependentuploaddocumentstatus', 'employee/getwizardslidetypes', 'employee/getcompletedwizards', 'employee/getcommunicationlanguage', 'employee/submitwizardslides', 'dependent/getdependentdocument', 'client/getclientauditdeadlines',
									 'client/getcommunicationlanguage', 'employee/uploademployeedocument', 'log/logerror', 'employeeemail/updateemployeesms','clientbenefittype/getclientbenefittype','employee/updatenotification'];
	constructor(private http: HttpClient,
		public xsrfTokenExtractor: HttpXsrfTokenExtractor,
		public authService: AuthenticationService,
		public router: Router) {
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		request = request.clone({ headers: request.headers.set('Access-Control-Allow-Origin', environment.allowOrigin) });
		request = request.clone({ headers: request.headers.set('Access-Control-Max-Age', '1728000') });
		request = request.clone({ headers: request.headers.set('Access-Control-Allow-Headers', '*') });

		if (this.authService.isUserAuthorized)
			request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${this.authService.getAuthToken}`) });

		if (this.authService.getIDPStateToken && this.authService.getIDPStateToken.length)
			request = request.clone({ headers: request.headers.set('StateToken', this.authService.getIDPStateToken) });


		// if (request.method !== 'GET') {
		// 	const xsrfToken = this.xsrfTokenExtractor.getToken();
		// 	const headerName = 'X-XSRF-TOKEN';
		// 	if (xsrfToken)
		// 		request = request.clone({ headers: request.headers.set(headerName, xsrfToken) });
		// }

		return of(null)
			.pipe(mergeMap(handleRoute))
			.pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown
			.pipe(delay(500))
			.pipe(dematerialize());

		function handleRoute() {
			return next.handle(request);
		}
	}

	public get<T>(url: string, params?: URLSearchParams | { [key: string]: any | any[] }): Observable<T> {
		const method = 'GET';
		return this.request(url, method, params);
	}

	public post<T>(url: string, body?: any, Map?: (response: Response) => any): Observable<T> {
		body = JSON.stringify(body);
		const method = 'POST';
		return this.request(url, method, body, Map);
	}

	public put<T>(url: string, body?: any, Map?: (response: Response) => any): Observable<T> {
		body = JSON.stringify(body);
		const method = 'PUT';
		return this.request(url, method, body, Map);
	}

	public upload<T>(url: string, body?: any, Map?: (response: Response) => any): Observable<T> {
		//Don't stringfy the body for file upload
		const method = 'UPLOAD';
		return this.request(url, method, body, Map);
	}

	private request<T>(url: string, method?: string, body?: any, Map?: (response: Response) => any): Observable<T> {
		let isIDPEndpoint = this.idpEndpointList.includes(url.toLowerCase());
		let isCoreCommunicationEndpoint = this.coreCommunicationEndPointList.includes(url.toLowerCase());
		if(isIDPEndpoint)
			url=environment.authenticationBaseUrl + url;
		else if(isCoreCommunicationEndpoint)
			url=environment.coreCommunicationBaseUrl + url;
		else
			url=environment.apiBaseUrl + url;

		//url = (isIDPEndpoint ? environment.authenticationBaseUrl : environment.apiBaseUrl) + url;
		let isUpload: boolean = false;
		if (method === 'UPLOAD') {
			method = 'POST';
			isUpload = true;
		}

		let init = (method === 'DELETE' || method === 'GET' || method === 'HEAD' || method === 'JSONP' || method === 'OPTIONS') ? { params: body } : { body: body };

		//Set the header as per the request
		const headers = isUpload ? new HttpHeaders().set('Content-Type', 'multipart/form-data') : new HttpHeaders().set('Content-Type', 'application/json');

		//Set the header option to the request as per the request.
		//If it is file process, don't set the multipart/form-data as it will get applied by the application by default.
		//Setting the multipart/form-data will cause error
		const options = isUpload ? { ...init, withCredentials: !isCoreCommunicationEndpoint } : { ...init, withCredentials: !isCoreCommunicationEndpoint, headers };
		options['observe'] = 'response';

		return this.http.request(method, url, options).pipe(
			map(Map ? Map : response => {
				let idpStateToken = response['headers'].get('StateToken');
				// console.log(idpStateToken);
				if(idpStateToken && idpStateToken.length > 0) {
					this.authService.setIDPStateToken(idpStateToken);
				}
				return response['body'] as T;
			}),
			catchError(err=>this.handleError(err))
		);
	}

	private handleError(error: Error | string) {
		if (error instanceof HttpErrorResponse) {
			if (error.status === 401 || error.status === 203) {
				this.authService.resetJWTInfoModel();
				this.authService.clearLocalStorage();
				this.router.navigate(['/login']);
			}
		  }
		let idpStateToken = error['headers'].get('StateToken');
		if(idpStateToken && idpStateToken.length > 0) {
			this.authService.setIDPStateToken(idpStateToken);
		}
		const message = error instanceof Error ? error.message : error;
		return throwError(message);
	}



}
