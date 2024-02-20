import { Component, OnInit, OnDestroy,HostListener } from '@angular/core';
import { AuthenticationService } from './core/services/authentication.service';
import { Router, ChildActivationEnd } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthorizationService } from './core/services/authorization.service';
import { ErrorLoggerService } from './core/services/errorlogger.service';
import { ActivityService } from './core/services/activity.service';
import { DashboardService } from './core/services/dashboard.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [ConfirmationService]
})
export class AppComponent implements OnInit, OnDestroy {

	authTokenSubscriptionRef: Subscription;
	sessionDurationTimeoutSubscriptionRef: Subscription;

	sessionDialog: any = { Visibile: false, IsAuthRenewed: false };
	sessionRemainingDuration: string = '';

	authRenewalConfirmationDialogTimeoutRef: any;
	silentAuthRenewalTimeoutRef: any;
	sessionDurationRetrievalRef: any;
	isRefreshed = false;

	constructor(public router: Router,
		public authService: AuthenticationService,
		public authorizationService: AuthorizationService,
		public activityService: ActivityService,
		public errorLogger: ErrorLoggerService,
		public dashboardService: DashboardService) {

		this.authTokenSubscriptionRef = this.authService.authTokenSubscriber.subscribe(data => { this.initiateSilentAuthRenewal(); });
		this.sessionDurationTimeoutSubscriptionRef = this.authService.sessionDurationTimeoutSubscriber.subscribe(data => { this.showAuthRenewalConfirmationDialog(+data); });

		// this.authTokenSubscriptionRef = this.authService.authTokenSubscriber.subscribe(data => { this.initializeSessionHandler(); });

		router.events.subscribe(e => {
			if (e instanceof ChildActivationEnd) {
				this.authService.setLastNavigationOn(new Date());
			}
		});

	}

	@HostListener('window:beforeunload', ['$event'])
	beforeunloadHandler(event) {
	  event.preventDefault();
	  return 'Are you sure you want to logout?';
	}

	ngOnInit(): void {
		this.sessionDialog = { Visibile: false, IsAuthRenewed: false };
		let context = this;

		// let currentUser  = this.authService.getLoggedInUserLastName;
		//  window.addEventListener('keydown', event => {
        //      if (event.key == 'r' || event.key == 'F5') this.isRefreshed = true;
        //  });

		//  window.addEventListener("beforeunload", function (e) {
		//  	if(currentUser && !context.isRefreshed){
		//  		// context.logout();
		//  	}
		//  });
		this.authService.bindStorageEventListener();
		this.authService.setLastNavigationOn(new Date());
		this.initiateSilentAuthRenewal();
	}

	ngOnDestroy(): void {
		this.authService.unbindStorageEventListener();
		this.authTokenSubscriptionRef.unsubscribe();
		this.sessionDurationTimeoutSubscriptionRef.unsubscribe();

		clearTimeout(this.authRenewalConfirmationDialogTimeoutRef);
		this.authRenewalConfirmationDialogTimeoutRef = null;

		clearTimeout(this.silentAuthRenewalTimeoutRef);
		this.silentAuthRenewalTimeoutRef = null;

		clearInterval(this.sessionDurationRetrievalRef);
		this.sessionDurationRetrievalRef = null;
	}

	initiateSilentAuthRenewal() {
		if (!this.authService.isUserAuthorized || this.silentAuthRenewalTimeoutRef) return;

		const twoMinutesMilliSeconds = (1000 * 60 * 2);
		let sessionTimeoutTick = this.authService.getTokenExpirationDate.getTime() - (new Date()).getTime();

		//Check whether token will get expired within 2 minutes, if so, then trigger renewal process imemdiately
		sessionTimeoutTick = (sessionTimeoutTick > twoMinutesMilliSeconds) ? (sessionTimeoutTick - twoMinutesMilliSeconds) : 0;

		this.silentAuthRenewalTimeoutRef = setTimeout(() => {
			clearTimeout(this.silentAuthRenewalTimeoutRef);
			this.silentAuthRenewalTimeoutRef = null;

			if (this.authService.isUserAuthorized) {
				this.renewAuthToken(true);
			}
		}, sessionTimeoutTick);
	}

	showAuthRenewalConfirmationDialog(remainingSessionTick: number) {
		if (!this.sessionDurationRetrievalRef) {
			this.sessionDialog = { Visibile: true, IsAuthRenewed: false };

			this.sessionDurationRetrievalRef = setInterval(() => {
				this.sessionRemainingDuration = this.authService.getDisplaySessionTime;
				if (!this.sessionRemainingDuration || !this.sessionRemainingDuration.length)
					this.sessionDialog = { Visibile: false, IsAuthRenewed: false };
			}, 1000);

			this.authRenewalConfirmationDialogTimeoutRef = setTimeout(() => {
				if (this.authService.isUserAuthorized) {
					this.logout();
				}
			}, remainingSessionTick);
		}
	}

	renewAuthToken(isSilent: boolean) {
		const isSilentRenewal = isSilent;

		const payload = {
			LastName: this.authService.getLoggedInUserLastName,
			ConsovaPIN: this.authService.getEmployeeId,
			EmployeeSSN: this.authService.getEmployeeSSN,
			Token: this.authService.getAuthToken
		};

		this.authorizationService.renewToken(payload).subscribe(res => {
			//Replace existing token
			this.authService.authValidation(res);
			if (!isSilentRenewal) this.sessionDialog = { Visibile: false, IsAuthRenewed: true };
		}, err => {
			this.errorLogger.logError({ message: 'app.components.ts (this.authorizationService.renewToken) => ' + JSON.stringify(err) });
			this.logout();
		});
	}

	onSessionConfirmation(event: Event, sessionRenewalConfirmed: boolean) {
		clearTimeout(this.authRenewalConfirmationDialogTimeoutRef);
		this.authRenewalConfirmationDialogTimeoutRef = null;

		clearInterval(this.sessionDurationRetrievalRef);
		this.sessionDurationRetrievalRef = null;

		if (sessionRenewalConfirmed) {
			this.authService.setLastNavigationOn(new Date());
		} else {
			this.logout();
		}

		this.sessionDialog = { Visibile: false, IsAuthRenewed: sessionRenewalConfirmed };
	}

	onSessionDialogClose() {
		if (!this.sessionDialog.IsAuthRenewed) {
			this.logout();
		}
	}


	logout() {
		const logoutUrl = this.authService.getLogoutUrl;
		const payload = {
			LastName: this.authService.getLoggedInUserLastName,
			ConsovaPIN: this.authService.getEmployeeId,
			EmployeeSSN: this.authService.getEmployeeSSN,
			Token: this.authService.getAuthToken
		};

		this.authorizationService.logoutUser(payload).subscribe(res => {
		this.sessionRemainingDuration = '';
		this.sessionDialog = { Visibile: false, IsAuthRenewed: false };
		this.authService.clearLocalStorage();
		this.authService.resetJWTInfoModel();
		this.ngOnDestroy();
		localStorage.clear();
		setTimeout(() => {
			if (logoutUrl && logoutUrl.length) {
				window.location.href = logoutUrl;
			} else {
				this.router.navigate(['login']);
			}
		}, 10);
		}, err => {
			this.errorLogger.logError({ message: 'app.components.ts (this.authorizationService.logout) => ' + JSON.stringify(err) });
			this.logout();
		});
	}
}
function beforeunloadHandler(event: Event) {
	throw new Error('Function not implemented.');
}

