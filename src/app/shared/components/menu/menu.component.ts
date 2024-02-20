import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { TranslateService } from 'src/app/core/services/translate.service';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
	providers: [DashboardService]
})
export class MenuComponent implements OnInit {

	constructor(
		public authService: AuthenticationService,
		public translate: TranslateService,
		public dashboardService: DashboardService,
		public authorizationService: AuthorizationService) { }

	ngOnInit() {
		if (!this.authService.getClientName.length)
			this.getClientDetails();
	}

	getClientDetails() {
		const payload = {
			clientId: this.authService.getClientId,
			employeeId: this.authService.getEmployeeId
		};

		this.dashboardService.GetClientDetails(payload).subscribe(res => {
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
		}, err => {
		});
	}

	logout() {
		const payload = {
			LastName: this.authService.getLoggedInUserLastName,
			ConsovaPIN: this.authService.getEmployeeId,
			EmployeeSSN: this.authService.getEmployeeSSN,
			Token: this.authService.getAuthToken
		};

		this.authorizationService.logoutUser(payload).subscribe(res => {
		const logoutUrl = this.authService.getLogoutUrl;
		this.authService.isEmployeeDocumentUploded = false;
		this.authService.clearLocalStorage();
		this.authService.resetJWTInfoModel();

		setTimeout(() => {
			this.authService.redirectToLoginPage(logoutUrl);
		}, 10);
		});
	}

	closeSidebar() {
		if (window.innerWidth < 768) {
			$('#sidebar').toggleClass('active');
			$('.back-layer').removeClass('visible');
			$('#sidebarCollapse').toggleClass('open');
		}
	}

	externalLink(page: string) {
		switch (page) {
			case 'KnowledgeCenter':
				window.open(this.authService.getWikiLink, '_blank');
				break;
			default:
				break;
		}
	}
}
