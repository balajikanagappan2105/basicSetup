import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard  {

	constructor(private router: Router, public authService: AuthenticationService) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		return this._canActivate(next, state);
	}

	canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		return this._canActivate(childRoute, state);
	}

	private _canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		if (!this.authService.isUserAuthorized) {
			this.router.navigate(['/login']);
			window["isLoginSuccess"] = "false";
			// setTimeout(() => {
			// 	window.location.reload();
			// }, 3000);
		}

		return this.authService.isUserAuthorized;
	}
}
