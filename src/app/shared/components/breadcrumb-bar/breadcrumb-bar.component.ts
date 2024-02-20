import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { ActivityService } from 'src/app/core/services/activity.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { RefreshService } from 'src/app/core/services/refresh.service';

@Component({
	selector: 'app-breadcrumb-bar',
	templateUrl: './breadcrumb-bar.component.html',
	styleUrls: ['./breadcrumb-bar.component.scss'],
	providers: [TranslatePipe]
})
export class BreadcrumbBarComponent implements OnInit {

	menuItems: MenuItem[];
	pageTitle: string = '';
	currentPageId: string;
	currentPageUrl: string;

	constructor(public router: Router,
		public activatedRoute: ActivatedRoute,
		public activityService: ActivityService,
		public authService: AuthenticationService,
		private refreshService: RefreshService,
		public translatePipe:TranslatePipe) {
			this.setBreadcrumbValue();
			this.refreshService.refreshSubscriber.subscribe(data => {
				if (data === 'refreshBreadCrumbContent') {
					setTimeout(() => {
						this.fillMenuList(this.currentPageId, this.currentPageUrl);
					}, 1000);
				}
			});
	}

	setBreadcrumbValue() {
		this.fillMenuList('0', ('/' + this.activatedRoute.routeConfig.path));

		this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: NavigationEnd) => {
			this.fillMenuList(e.id.toString(), e.urlAfterRedirects);
		});
	}

	fillMenuList(pageId: string, pageURL: string) {
		this.currentPageId = pageId;
		this.currentPageUrl = pageURL;
		let splitBreadcrumbCaption = this.activatedRoute.snapshot.data['breadcrumb'].split('|');
		this.pageTitle = this.activatedRoute.snapshot.data['title'];
		this.menuItems = [{ label:  this.translatePipe.transform('Consova', 'PageTitle'), disabled: true, id: pageId }];
		for (let i = 0; i < splitBreadcrumbCaption.length; i++) {
			const languageText = this.translatePipe.transform(splitBreadcrumbCaption[i].replace(' ',''), 'PageTitle');
			this.menuItems.push({ label: languageText, routerLink: pageURL, id: "menu-" + i.toString(), disabled: (i < (splitBreadcrumbCaption.length - 1)) });
		}
		// console.log(this.menuItems)
	}

	ngOnInit() {

	}
}
