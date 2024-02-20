import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { HttpService } from './http.service';

@Injectable({
	providedIn: 'root'
})
export class TranslateService {

	public languageList: any;
	public preferredLanguage: number;
	public data: any = {};

	constructor(private http: HttpService, private httpClient: HttpClient, private authService: AuthenticationService) {
		this.preferredLanguage = this.authService.getLangPreference ? +this.authService.getLangPreference : 0;
	}

	public use(langId: number): Promise<{}> {
		let langJson;

		let filteredLang;
		// if (this.languageList && this.languageList.length === 1)
		// 	filteredLang = this.languageList;

		filteredLang = langId === 0 ? { Name: 'English' } : this.languageList.find(x => x.LanguageTypeId == langId);
		const selectedLang = (filteredLang && filteredLang.Name) ? filteredLang.Name : (filteredLang && filteredLang.LanguageType) ? filteredLang.LanguageType.Name : '';

		switch (selectedLang) {
			case 'English':
				langJson = 'en';
				break;
			case 'Spanish':
				langJson = 'es';
				break;
			case 'French':
				langJson = 'fr';
			break;
			case 'Chinese':
				langJson = 'zh';
				break;
			case 'Filipino (Tagalog)':
				langJson = 'Fil';
				break;
			case 'Vietnamese':
				langJson = 'vi';
				break;
			default:
				langJson = 'en';
				break;
		}

		return new Promise<{}>((resolve, reject) => {
			const langPath = `assets/i18n/${langJson || 'en'}.json`;
			this.httpClient.get<{}>(langPath).subscribe(translation => {
				this.data = Object.assign({}, translation || {});
				resolve(this.data);
			}, err => {
				this.data = {};
				resolve(this.data);
			});
		});
	}

	getLanguage(payload): Observable<any> {
		return this.http.put('Employee/GetLanguage', payload);
	}

	getCommunicationLanguage(payload): Observable<any> {
		return this.http.put('Client/GetCommunicationLanguage', payload);
	}

	setEmployeeLanguage(payload) {
		return this.http.post<any>('User/SetEmployeeLanguage', payload);
	}

}
