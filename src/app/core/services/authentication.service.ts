import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { JWTInfoModel } from 'src/app/shared/models/jwt-info.model';
import { ILocalStorage } from 'src/app/shared/models/local-storage.model';
import { CryptService } from './crypt.service';
import { AppUtilityService } from './app-utility.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { IActivityType } from 'src/app/shared/models/activity-type.model';
import { IActivityLog } from 'src/app/shared/models/activity-log.model';
import { ObjectState } from 'src/app/shared/models/enums';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

	private _localStorageGlobalKey = "appKey"; //this.getRandomAlphaNumeric(40);
	private _localStorage: ILocalStorage;
	private _sessionTimeoutTick: number = 0;
	private _remainingSessionTick: number = 0;
	private _activityPayload: IActivityLog;
	private _activityTypes: IActivityType[];
	public restrictStorageEvent:boolean = false;
	public _dependentId: number;
	public isEmployeeDocumentUploded: boolean = false;
	public isMarkAsIneligible: boolean = false;
	public isAnySurveyCompleted: boolean = false;
	public isDependentSelfDeclared: any = [];
	public authTokenPulisher = new Subject();
	public sessionDurationTimeoutPulisher = new Subject();

	authTokenSubscriber = this.authTokenPulisher.asObservable();
	sessionDurationTimeoutSubscriber = this.sessionDurationTimeoutPulisher.asObservable();

	constructor(public router: Router,
		private cryptService: CryptService,
		public utilityService: AppUtilityService,
		private deviceService: DeviceDetectorService) {
		this._sessionTimeoutTick = 0;
		 this.assignStorageValue();
	}

	bindStorageEventListener() {
		window.addEventListener("storage", this.storageEventListener.bind(this));
	}

	unbindStorageEventListener() {
		window.removeEventListener("storage", this.storageEventListener.bind(this));
	}

	private storageEventListener(event: StorageEvent) {
		if(this.restrictStorageEvent)
		{
			return;
		}
		if (event.newValue !== event.oldValue) {
			this.assignStorageValue();
			if (!this.isUserAuthorized) this.redirectToLoginPage('');
		}
	}

	publishAuthToken() {
		this.authTokenPulisher.next();
	}

	redirectToLoginPage(logoutUrl: string) {
		if (!logoutUrl || !logoutUrl.length) logoutUrl = this.getLogoutUrl;

		if (this.isUserAuthorized)
			this.router.navigate(['/dashboard']);
		else if (logoutUrl && logoutUrl.length)
			window.location.href = logoutUrl;
		else
			this.router.navigate(['/login']);
	}
	resetJWTInfoModel() {
		this._localStorage.jwtInfoModel = this.getInitialJWTInfoModel;
	}

	authValidation(authResult) {
		if (authResult && authResult.Token) {
			const jwtToken = authResult.Token;
			if (!this.parseJWTAuthData(jwtToken)) {
				return 'There was an error while authenticating your credential/token.<br>Please try again or contact your administrator.';
			}

			this.publishAuthToken();

			return '';
		}

		return 'There was an error while authenticating your credential.<br>Try again or contact your administrator.';
	};

	setAuthTokenStorage() {
		this._localStorage.preferredLanguage = this.getPreferredLanguageType;
		this._localStorage.authenticatedToken = this._localStorage.jwtInfoModel.jwtFullToken;
		this.setStorageValue();
	}

	setUploadGUID(setGUID) {
		this._localStorage.uploadGUID = setGUID;
		this.setStorageValue();
	}

	getUploadGUID() {
		return this._localStorage.uploadGUID;
	}

	setAuthFromStorage() {
		if (this._localStorage.authenticatedToken && this._localStorage.authenticatedToken.length) {
			let authToken = JSON.parse(this._localStorage.authenticatedToken);
			this.parseJWTAuthData(authToken);
		}
	}

	clearLocalStorage() {
		this.isEmployeeDocumentUploded = false;
		this.isDependentSelfDeclared = [];
		localStorage.clear();
		this.assignStorageValue();
	}

	parseJWTAuthData(authData) {
		if (!authData) {
			return false;
		}

		const splitJWTInfo = authData.split('.');

		if (splitJWTInfo.length !== 3) {
			this.clearLocalStorage();
			this.resetJWTInfoModel();
			return false;
		}

		this._localStorage.jwtInfoModel.jwtFullToken = authData;
		this._localStorage.jwtInfoModel.jwtHeader = JSON.parse(atob(splitJWTInfo[0]));
		this._localStorage.jwtInfoModel.jwtPayload = JSON.parse(atob(splitJWTInfo[1]));
		if (!this._localStorage.jwtInfoModel.userLastActivityOn) this._localStorage.jwtInfoModel.userLastActivityOn = new Date();
		this._localStorage.jwtInfoModel.jwtSignature = splitJWTInfo[2]; //HMACSHA256(encodedString, 'secret');

		if (this.isTokenExpired) {
			this.resetJWTInfoModel();
			this.clearLocalStorage();
			return false;
		}

		this._sessionTimeoutTick = this.isUserAuthorized ? (this.getTokenExpirationDate.getTime() - this.getTokenIssuedAtDate.getTime()) : 0;

		return true;
	}

	setActivityTypes(value: IActivityType[]) {
		this._activityTypes = value;
	}

	public get isActivityTypesAvailable(): boolean {
		return (this._activityTypes && this._activityTypes.length) ? true : false;
	}

	public get isUserAuthorized(): boolean {
		return (this._localStorage.jwtInfoModel && this._localStorage.jwtInfoModel.jwtFullToken && this._localStorage.jwtInfoModel.jwtFullToken !== '')
	}

	public get getAuthToken(): any {
		return this._localStorage.jwtInfoModel.jwtFullToken;
	}

	public get getJWTInfoModel(): JWTInfoModel {
		return this._localStorage.jwtInfoModel;
	}

	public get getLoggedInUserFirstName(): string {
		return (this._localStorage.jwtInfoModel && this._localStorage.jwtInfoModel.jwtPayload && this._localStorage.jwtInfoModel.jwtPayload.FirstName) ? this._localStorage.jwtInfoModel.jwtPayload.FirstName : '';
	}

	public get getLoggedInUserLastName(): string {
		return (this._localStorage.jwtInfoModel && this._localStorage.jwtInfoModel.jwtPayload && this._localStorage.jwtInfoModel.jwtPayload.LastName) ? this._localStorage.jwtInfoModel.jwtPayload.LastName : '';
	}

	public get getLoggedInUserDisplayName(): string {
		return (this._localStorage.jwtInfoModel && this._localStorage.jwtInfoModel.jwtPayload && this._localStorage.jwtInfoModel.jwtPayload.unique_name) ? this._localStorage.jwtInfoModel.jwtPayload.unique_name : '';
	}

	public get getEmployeeId(): string {
		return (this._localStorage.jwtInfoModel && this._localStorage.jwtInfoModel.jwtPayload && this._localStorage.jwtInfoModel.jwtPayload.Id) ? this._localStorage.jwtInfoModel.jwtPayload.Id : '';
	}

	public get getEmployeeSSN(): string {
		return (this._localStorage.jwtInfoModel && this._localStorage.jwtInfoModel.jwtPayload && this._localStorage.jwtInfoModel.jwtPayload.Ssn) ? this._localStorage.jwtInfoModel.jwtPayload.Ssn : '';
	}

	public get getClientEmailConfirmation(): string {
		return (this._localStorage.jwtInfoModel && this._localStorage.jwtInfoModel.jwtPayload && this._localStorage.jwtInfoModel.jwtPayload.EnableEmailConfirmation) ? this._localStorage.jwtInfoModel.jwtPayload.EnableEmailConfirmation : '';
	}

	public get getClientMobileConfirmation(): string {
		return (this._localStorage.jwtInfoModel && this._localStorage.jwtInfoModel.jwtPayload && this._localStorage.jwtInfoModel.jwtPayload.EnablePhoneConfirmation) ? this._localStorage.jwtInfoModel.jwtPayload.EnablePhoneConfirmation : '';
	}

	public get getClientPasswordUpdate(): string {
		return (this._localStorage.jwtInfoModel && this._localStorage.jwtInfoModel.jwtPayload && this._localStorage.jwtInfoModel.jwtPayload.EnableChangePassword) ? this._localStorage.jwtInfoModel.jwtPayload.EnableChangePassword : '';
	}

	public get getClientProfileUpdate(): string {
		return (this._localStorage.jwtInfoModel && this._localStorage.jwtInfoModel.jwtPayload && this._localStorage.jwtInfoModel.jwtPayload.EnableProfileUpdate) ? this._localStorage.jwtInfoModel.jwtPayload.EnableProfileUpdate : '';
	}

	// public get getEnableUploadDocuments(): boolean {
	// 	if (this._localStorage.jwtInfoModel && this._localStorage.jwtInfoModel.jwtPayload && this._localStorage.jwtInfoModel.jwtPayload.UploadDocuments == 'True')
	// 		return true;
	// 	else
	// 		return false;
	// }

	public get getEmployeeConsentAcceptanceStatus(): boolean {
		if (this._localStorage.jwtInfoModel && this._localStorage.jwtInfoModel.jwtPayload && this._localStorage.jwtInfoModel.jwtPayload.IsConsentAccepted === 'True')
			return true;
		else
			return false;
	}

	public get getClientId(): number {
		return (this._localStorage.jwtInfoModel && this._localStorage.jwtInfoModel.jwtPayload && this._localStorage.jwtInfoModel.jwtPayload.ClientId) ? this._localStorage.jwtInfoModel.jwtPayload.ClientId : -1;
	}

	public get getSubClientId(): number {
		return (this._localStorage.jwtInfoModel && this._localStorage.jwtInfoModel.jwtPayload && this._localStorage.jwtInfoModel.jwtPayload.SubClientId) ? this._localStorage.jwtInfoModel.jwtPayload.SubClientId : -1;
	}
	 public _tempStateToken: any;
	public get getIDPStateToken(): string {
		 if(this._tempStateToken && this._tempStateToken.length > 0)
		 	return this._tempStateToken;
		 if(localStorage.getItem("ABCD") && localStorage.getItem("ABCD").length > 0)
			return localStorage.getItem("ABCD");
		return (this._localStorage.jwtInfoModel && this._localStorage.jwtInfoModel.idpStateToken) ? this._localStorage.jwtInfoModel.idpStateToken : '';
	}

	public get getPreferredLanguageType(): number {
		return (this._localStorage.jwtInfoModel && this._localStorage.jwtInfoModel.jwtPayload && this._localStorage.jwtInfoModel.jwtPayload.LanguageTypeId) ? this._localStorage.jwtInfoModel.jwtPayload.LanguageTypeId : 0;
	}

	public setIDPStateToken(value: string) {
		// console.log(value);
		if(value && value.length > 0)
		{
			this._tempStateToken = value;
			localStorage.setItem("ABCD",value);
		}
		this._localStorage.jwtInfoModel.idpStateToken = value;
		this.setStorageValue();
	}

	public get getTokenIssuedAtDate(): Date {
		if (this._localStorage.jwtInfoModel && this._localStorage.jwtInfoModel.jwtPayload && this._localStorage.jwtInfoModel.jwtPayload.iat)
			return new Date((new Date(0)).setUTCSeconds(this._localStorage.jwtInfoModel.jwtPayload.iat));

		return null;
	}

	public get tokenNotBefore(): Date {
		if (this._localStorage.jwtInfoModel && this._localStorage.jwtInfoModel.jwtPayload && this._localStorage.jwtInfoModel.jwtPayload.nbf)
			return new Date((new Date(0)).setUTCSeconds(this._localStorage.jwtInfoModel.jwtPayload.nbf));

		return null;
	}

	public get getTokenExpirationDate(): Date {
		if (this._localStorage.jwtInfoModel && this._localStorage.jwtInfoModel.jwtPayload && this._localStorage.jwtInfoModel.jwtPayload.exp)
			return new Date((new Date(0)).setUTCSeconds(this._localStorage.jwtInfoModel.jwtPayload.exp));

		return null;
	}

	public get getUserLastActivityOn(): Date {
		return (this._localStorage.jwtInfoModel && this._localStorage.jwtInfoModel.userLastActivityOn) ? this._localStorage.jwtInfoModel.userLastActivityOn : new Date();
	}

	public get isTokenExpired(): boolean {
		let expDate = this.getTokenExpirationDate;

		if (expDate)
			return new Date().valueOf() > expDate.valueOf();

		return true;
	}

	private get getActivityLogInfo(): IActivityLog {
		if (this._activityPayload) return this._activityPayload;

		// const activityDescription = {
		// 	deviceInfo: {
		// 		browser: this.deviceService.browser,
		// 		browser_version: this.deviceService.browser_version,
		// 		device: this.deviceService.device,
		// 		os: this.deviceService.os,
		// 		os_version: this.deviceService.os_version,
		// 		userAgent: this.deviceService.userAgent
		// 	},
		// 	navigatorInfo: {
		// 		appCodeName: navigator.appCodeName,
		// 		appName: navigator.appName,
		// 		appVersion: navigator.appVersion,
		// 		cookieEnabled: navigator.cookieEnabled,
		// 		language: navigator.language,
		// 		languages: navigator.languages,
		// 		onLine: navigator.onLine,
		// 		platform: navigator.platform,
		// 		product: navigator.product,
		// 		productSub: navigator.productSub,
		// 		userAgent: navigator.userAgent
		// 	}
		// };

		this._activityPayload = {
			Id: 0,
			ApplicationName: 'iVerify',
			IpAddress: null,
			Region: null,
			BrowserLanguage: navigator.language,
			BrowserName: this.deviceService.browser,
			BrowserVersion: this.deviceService.browser_version,
			EmployeeId: this.getEmployeeId,
			ClientId: this.getClientId,
			Details: '', //JSON.stringify(activityDescription),
			ActionTypeId: -1,
			ObjectState: ObjectState.Added
		};

		return this._activityPayload;
	}

	getActivityLogPayload(activityName: string, activityDescription: string): IActivityLog {
		if (!this._activityTypes || !this._activityTypes.length) return null;

		let filteredResultList = this._activityTypes.filter((s: any) => s.Name === activityName);

		if (!filteredResultList || !filteredResultList.length) return null;

		let payload = this.getActivityLogInfo;
		payload.ActionTypeId = filteredResultList[0].Id;

		payload.Details = activityDescription;

		return payload;
	}

	setLangPreference(langCode: number) {
		this._localStorage.preferredLanguage = langCode;
		this.setStorageValue();
	}

	public get getLangPreference(): number {
		return this._localStorage.preferredLanguage ? this._localStorage.preferredLanguage : 0;
	}

	setStorageValue() {
		let val: string = JSON.stringify(this._localStorage);
		val = this.cryptService.getEncrypted(val);
		localStorage.setItem(this._localStorageGlobalKey, val);

	}

	public setLastNavigationOn(value?: Date) {
		if (this._localStorage.jwtInfoModel) {
			this._localStorage.jwtInfoModel.userLastActivityOn = value;
			this.setStorageValue();
		}
	}

	public get getRemainingSessionTick(): number {
		return this._remainingSessionTick;
	}

	public get getDisplaySessionTime(): string {
		if (!this.isUserAuthorized) {
			return '';
		}

		if (this._localStorage.jwtInfoModel && !this._localStorage.jwtInfoModel.userLastActivityOn)
			this._localStorage.jwtInfoModel.userLastActivityOn = new Date();

		this._remainingSessionTick = this._sessionTimeoutTick - ((new Date()).getTime() - (new Date(this.getUserLastActivityOn)).getTime());
		if (this._remainingSessionTick < 1) {
			const logoutUrl = this.getLogoutUrl;
			this.clearLocalStorage();
			this.resetJWTInfoModel();
			this.redirectToLoginPage(logoutUrl);
			return '';
		}

		//1000 * 60 => 1 minute
		//If session elapsed duration less than 2 minutes show renewal dialog
		const twoMinutesMilliSeconds = (1000 * 60 * 2);
		if (this._remainingSessionTick <= twoMinutesMilliSeconds) {
			this.sessionDurationTimeoutPulisher.next(this._remainingSessionTick);
		}

		return this.utilityService.getTimeTickerValue(this._remainingSessionTick);
	}

	public setClientInfo(value: any) {
		this._localStorage.clientInfo = value;
		this.setStorageValue();
	}
	public setEnableUploadDocuments(value: boolean) {
		this._localStorage.enableUploadDocument = value;
		this.setStorageValue();
	}

	public get getEnableUploadDocuments(): boolean {
		return this._localStorage.enableUploadDocument;
	}
	public setEnableGoGreen(value: boolean) {
		this._localStorage.enableGoGreen = value;
		this.setStorageValue();
	}
	public get getGoGreenCompleted(): boolean {
		return this._localStorage.goGreenCompleted;
	}
	public setGoGreenCompleted(value: boolean) {
		this._localStorage.goGreenCompleted = value;
		this.setStorageValue();
	}
	public get getPreferedEmailStatus(): boolean {
		return this._localStorage.preferedEmailStatus;
	}
	public setPreferedEmailStatus(value: boolean) {
		this._localStorage.preferedEmailStatus = value;
		this.setStorageValue();
	}
	public get getPreferedEmailId(): string {
		return this._localStorage.preferedEmailId;
	}
	public setPreferedEmailId(value: string) {
		this._localStorage.preferedEmailId = value;
		this.setStorageValue();
	}
	public get getResendMailId(): number {
		return this._localStorage.resendMailId ? this._localStorage.resendMailId : 0;
	}
	public setResendMailId(value: number) {
		this._localStorage.resendMailId = value;
		this.setStorageValue();
	}

	public get getEnableGoGreen(): boolean {
		return this._localStorage.enableGoGreen;
	}

	public get getClientName(): string {
		return this._localStorage.clientInfo.name;
	}

	public get getClientEmail(): string {
		return this._localStorage.clientInfo.email;
	}

	public get getClientServiceRepId(): number {
		return this._localStorage.clientInfo.serviceRepId;
	}

	public get getTollFreeNumber(): string {
		return this._localStorage.clientInfo.tollFreeNumber;
	}

	public get getWikiLink(): string {
		return this._localStorage.clientInfo.wikiLink;
	}

	public get getLogoutUrl(): string {
		return this._localStorage.clientInfo.logoutUrl;
	}

	public setEncryptedStorageValue(value: string) {
		localStorage.setItem(this._localStorageGlobalKey, value);
		let parsedValue = this.cryptService.getDecrypted(value);
		this._localStorage = JSON.parse(parsedValue);
	}

	public get getEncryptedStorageValue(): string {
		return localStorage.getItem(this._localStorageGlobalKey);
	}

	private assignStorageValue() {
		let locStorage: string = localStorage.getItem(this._localStorageGlobalKey);
		if (locStorage && locStorage.length) {
			let parsedLocStorage = this.cryptService.getDecrypted(locStorage);
			this._localStorage = JSON.parse(parsedLocStorage);
			this._sessionTimeoutTick = this.isUserAuthorized ? (this.getTokenExpirationDate.getTime() - this.getTokenIssuedAtDate.getTime()) : 0;
		} else {
			this._localStorage = {
				preferredLanguage: 0,
				authenticatedToken: '',
				jwtInfoModel: this.getInitialJWTInfoModel,
				clientInfo: { id: -1, name: '', email: '', serviceRepId: -1, logoutUrl: '', tollFreeNumber: '', wikiLink: '',goGreenOptOut:false },
				uploadGUID: '',
				enableUploadDocument:false,
				enableGoGreen:false,
				goGreenCompleted:false,
				preferedEmailStatus:false,
				preferedEmailId:'',
				resendMailId:0
			};

			this.setStorageValue();
		}
	}

	private get getInitialJWTInfoModel(): JWTInfoModel {
		return {
			jwtFullToken: null,
			jwtHeader: null,
			jwtPayload: null,
			jwtSignature: null,
			userLastActivityOn: null,
			idpStateToken: ''
		};
	}

	// get getDependentId() {
	// 	return this._dependentId;
	// }

	// set getDependentId(depId) {
	// 	 this._dependentId=depId;
	// }

	public get getEmailRegExp(): RegExp {
		return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	}

	public getEmpDetails(authData):any {

		var empdata = [];
		if (!authData) {
			return empdata;
		}

		const splitJWTInfo = authData.split('.');

		if (splitJWTInfo.length !== 3) {
			this.clearLocalStorage();
			this.resetJWTInfoModel();
			return empdata;
		}

		// this._localStorage.jwtInfoModel.jwtFullToken = authData;
		// this._localStorage.jwtInfoModel.jwtHeader = JSON.parse(atob(splitJWTInfo[0]));
		// this._localStorage.jwtInfoModel.jwtPayload = JSON.parse(atob(splitJWTInfo[1]));
		// if (!this._localStorage.jwtInfoModel.userLastActivityOn) this._localStorage.jwtInfoModel.userLastActivityOn = new Date();
		// this._localStorage.jwtInfoModel.jwtSignature = splitJWTInfo[2]; //HMACSHA256(encodedString, 'secret');

		// if (this.isTokenExpired) {
		// 	this.resetJWTInfoModel();
		// 	this.clearLocalStorage();
		// 	return false;
		// }

		// this._sessionTimeoutTick = this.isUserAuthorized ? (this.getTokenExpirationDate.getTime() - this.getTokenIssuedAtDate.getTime()) : 0;
		//empdata = this._localStorage.jwtInfoModel.jwtPayload;
		empdata = JSON.parse(atob(splitJWTInfo[1]));
		this.clearLocalStorage();
		return empdata;

	}

	public get getGoGreenOptOut(): boolean {
		return this._localStorage.clientInfo.goGreenOptOut;
	}
}
