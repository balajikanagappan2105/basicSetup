import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { TranslateService } from 'src/app/core/services/translate.service';
import { RefreshService } from 'src/app/core/services/refresh.service';
import { ErrorLoggerService } from 'src/app/core/services/errorlogger.service';
import { AuthorizationService } from 'src/app/core/services/authorization.service';

@Component({
	selector: 'app-top-bar',
	templateUrl: './top-bar.component.html',
	styleUrls: ['./top-bar.component.scss'],
	providers: [DashboardService]
})
export class TopBarComponent implements OnInit, OnDestroy {

	@Output() uploadEvent = new EventEmitter();
	logoutUrl: any;
	clientLogoData: any;
	elapsedTimeDisplay: string = '';
	elapsedTimerRef: any;
	base64DataContent: string;
	refreshLanguageDropdown: boolean = false;
	changepassword: boolean;
	isshownotificationCount: boolean = false;
	notificationCount: number;
	showVideo : boolean = false;
	notifications: any;
	enableChangePassword : boolean = false;

	constructor(private router: Router,
		public authService: AuthenticationService,
		public translate: TranslateService,
		public dashboardService: DashboardService,
		private refreshService: RefreshService,
		public errorLogger: ErrorLoggerService,
		public authorizationService: AuthorizationService) {
			this.refreshService.refreshSubscriber.subscribe(data => {
				if (data === 'refreshLanguageDropdown') {
					this.refreshLanguageDropdown = true;
					setInterval(() => {
						this.refreshLanguageDropdown = false;
					}, 1);
				}
			});
		}

	ngOnInit() {
		//if (!this.authService.getClientName.length)
		this.getNotifications();
		this.getClientDetails();

		var chnagepassword = this.authService.getClientPasswordUpdate;
		if(chnagepassword === 'true')
			this.enableChangePassword = true;
		else
			this.enableChangePassword = false;

		//this.loadLogo();
		this.initializeDisplaySessionTime();
		this.elapsedTimerRef = setInterval(() => {
			this.initializeDisplaySessionTime();
		}, 1000);
	}



	ngOnDestroy(): void {
		clearInterval(this.elapsedTimerRef);
		this.elapsedTimerRef = null;
	}

	initializeDisplaySessionTime() {
		this.elapsedTimeDisplay = this.authService.getDisplaySessionTime;
	}

	getClientDetails() {
		const payload = {
			clientId: this.authService.getClientId,
			employeeId: this.authService.getEmployeeId
		};

		this.dashboardService.GetClientDetails(payload).subscribe(res => {
			this.clientLogoData = res;
			this.logoutUrl = res.LogoutUrl;
			//  "data:image/png;base64," + res.Logo;

			this.authService.setClientInfo({
				id: res.Id,
				name: res.Name,
				email: res.Email,
				serviceRepId: res.ClientServiceRepId,
				tollFreeNumber: res.TollFreeNumber,
				wikiLink: res.ClientSiteUrl,
				logoutUrl: res.LogoutUrl,
				goGreenOptOut : res.GoGreenOptOut
			});
			this.loadLogo();
		}, err => {
		});
	}

	loadLogo() {
		const payload = {
		  ClientId: this.authService.getClientId ? this.authService.getClientId: this.clientLogoData.Id,
		  EmployeeId: this.authService.getEmployeeId,
		  subClientList: []
		}
		this.dashboardService.getClientLogo(payload).subscribe((res) => {
		  let docPath = '';
		  switch (res.Extension.toLowerCase()) {
			case '.pdf':
			  docPath = 'data:application/pdf;base64,';
			  break;
			case '.png':
			  docPath = 'data:image/png;base64,';
			case '.jpg':
			case '.jpeg':
			case '.heic':
			  docPath = 'data:image/jpeg;base64,';
			  break;
		  }
		  this.base64DataContent = docPath + res.DataFile;
		//this.base64DataContent = this.base64DataContent || this.clientLogoData? this.clientLogoData.ContentType: '' + this.clientLogoData.Logo;
			if(this.base64DataContent){
				this.base64DataContent = this.base64DataContent
			}else{
				if(this.clientLogoData && this.clientLogoData.ContentType){
					this.base64DataContent = this.clientLogoData.ContentType + this.clientLogoData.Logo;
				}else{
					this.base64DataContent = "";
				}
			}
		});
	  }

	menuCollapse() {
		$('#sidebar').toggleClass('active');
		$('.content').toggleClass('active');
		$('#sidebarCollapse').toggleClass('open');

		if (window.innerWidth <= 767) {
			$('.back-layer').toggleClass('visible');
		}
	}
	logout() {
		const payload = {
			LastName: this.authService.getLoggedInUserLastName,
			ConsovaPIN: this.authService.getEmployeeId,
			EmployeeSSN: this.authService.getEmployeeSSN,
			Token: this.authService.getAuthToken
		};

		this.authorizationService.logoutUser(payload).subscribe(res => {
		this.authService.isEmployeeDocumentUploded = false;
		this.authService.clearLocalStorage();
		this.authService.resetJWTInfoModel();

		setTimeout(() => {
			if (this.logoutUrl) {
				window.location.href = this.logoutUrl;
				window["isLoginSuccess"] = "false";
			} else {
				this.router.navigate(['login']);
				window["isLoginSuccess"] = "false";
				setTimeout(() => {
					window.location.reload();
				}, 3000);
			}
		}, 10);
		});
	}
	uploadDocument() {
		this.uploadEvent.emit();
	}

	hideChangePassword() {
		this.changepassword = false;
	}
	changePasswordDialogOnHide() {
		if(!this.authService.isUserAuthorized) {
			this.authService.redirectToLoginPage(this.authService.getLogoutUrl)
		}
	}

	showChangePassword() {
		// if(!this.authService.isUserAuthorized) {
			this.changepassword = true;
		// }
	}
	showNotificaionCount() {
		// console.log(this.notificationCount);
	}

	getNotifications(){

		const payload = {
			employeeId: this.authService.getEmployeeId,
			languageTypeId: this.authService.getLangPreference
		};

		this.dashboardService.getNotifiation(payload).subscribe(arg => {
			this.notifications = arg;
			this.notifications = this.notifications.sort((a,b) => new Date(a.Deadline).getTime() - new Date(b.Deadline).getTime());
			let onlyUnreadNotifications = this.notifications.filter((x: any) => x.HasActionCompleted == false && x.NotificationMessage.length > 0); //Added additionall by Rahul
			// console.log('----->>>'+this.notifications.HasActionCompleted);
			if(onlyUnreadNotifications.length > 0 )
			{
				this.isshownotificationCount = true;
				this.notificationCount = onlyUnreadNotifications.length;

            }
		}, err => {
			this.errorLogger.logError({ message: 'home-router.components.ts onAllDisclaimerAccepted() => ' + JSON.stringify(err) });
		});
	}
	notificationIconClick() { //Added by R Rahul
		let unreadNotifications = this.notifications.filter((x: any) => !x.HasActionCompleted);
		// console.log(unreadNotifications);
			this.dashboardService.updateNotification(unreadNotifications).subscribe(arg => {

			}, err => {
				this.errorLogger.logError({ message: 'home-router.components.ts onAllDisclaimerAccepted() => ' + JSON.stringify(err) });
			});
		this.isshownotificationCount = false;
		this.notificationCount = 0;
	}

}
