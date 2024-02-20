import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '../../../core/services/translate.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ActivityService } from 'src/app/core/services/activity.service';
import { AppUtilityService } from 'src/app/core/services/app-utility.service';
import { SelectItem } from 'primeng/api';
import { RefreshService } from 'src/app/core/services/refresh.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
	selector: 'app-language-preference',
	templateUrl: './language-preference.component.html',
	styleUrls: ['./language-preference.component.scss'],
	providers: [TranslatePipe]
})
export class LanguagePreferenceComponent implements OnInit {

	@Input() showButton: boolean;
	@Input() onChange: boolean;
	@Input() isFromProfile: boolean;
	@Input() employeePreferredLanguage: number;

	@Output() languageLenght = new EventEmitter<number>();

	showLoader: boolean;
	messageHolder: any = { visible: false, messageType: '', message: '' };
	unChanged: boolean;
	selectedLanguage: number;
	selectedLang: any;
	profileLanguage: number;
	languageList: any[] = [];
	profileLanguageList: SelectItem[] = [];

	constructor(public translateServiceProfile: TranslateService,
		public translateServicePref: TranslateService,
		public authService: AuthenticationService,
		public activityService: ActivityService,
		public appUtilityService: AppUtilityService,
		private refreshService: RefreshService,
		public translatePipe:TranslatePipe) {
		}

	ngOnInit() {
		this.showButton = this.showButton || false;
		let result : any[] = [];
		result.push({
			CreatedBy: null,
			CreatedDate: null,
			Id: null,
			LanguageType: {
				CreatedBy: null,
				CreatedDate: null,
				Id: null,
				ModifiedBy: null,
				ModifiedDate: null,
				Name: "English",
				ObjectState: 0,
			},
			LanguageTypeId: 1,
			ModifiedBy: null,
			ModifiedDate: null,
			ObjectState: 0,
			SubClientId: null
		});

		const payload = {
			'employeeId':this.authService.getEmployeeId,
			'clientId': this.authService.getClientId,
			'subClientId': this.authService.getSubClientId
		};

		//this.showLoader = true;
		var languageType = 0;
		if(this.isFromProfile){
			//this.translateServicePref.getLanguage(payload).subscribe(res => {
			this.translateServicePref.getCommunicationLanguage(payload).subscribe(res => {
				this.showLoader = false;
				if(res && res.length > 0){
					res = res.sort((a,b) => a.LanguageTypeId - b.LanguageTypeId);
				}
				var language = res.filter(s => s.LanguageType.Name == 'English')
				languageType = (language && language.length) ? language[0].LanguageTypeId : result[0].LanguageType;
				let languages = (res && res.length) ? JSON.parse(JSON.stringify(res)) : JSON.parse(JSON.stringify(result));
				this.profileLanguageList = [];
				//this.translateServicePref.languageList = (res && res.length) ? JSON.parse(JSON.stringify(res)) : JSON.parse(JSON.stringify(result));
				this.profileLanguageList = [];
				for(let i=0; i<languages.length; i++){
					this.profileLanguageList.push({ label: languages[i].LanguageType.Name, value: languages[i].LanguageTypeId });
				}

				this.translateServicePref.preferredLanguage = this.employeePreferredLanguage || languageType;
				this.selectedLanguage = this.employeePreferredLanguage > 0 ? this.employeePreferredLanguage : 0;
				this.selectedLang = this.profileLanguageList.find(l => l.value == this.selectedLanguage);
				//this.profileLanguage = this.authService.getPreferredLanguageType > 0 ? this.authService.getPreferredLanguageType: 1;
				//this.onPrefLanguageChanged();
				//this.setApplicationLanguage(this.profileLanguage);
				this.unChanged = true;
				// if(this.profileLanguageList.length > 1){
				// 	this.profileLanguageList = this.profileLanguageList.sort((a, b) => a.label.localeCompare(b.label));
				// }
				this.languageLenght.emit((this.profileLanguageList && this.profileLanguageList.length)? this.profileLanguageList.length : 0);
			}, err => {
				this.showLoader = false;
			}).add(() => {

			});
			this.getIVACLanguages();
		}
		if(!this.showButton){
			this.translateServiceProfile.getLanguage(payload).subscribe(res => {
				this.showLoader = false;
				if(res && res.length > 0){
					res = res.sort((a,b) => a.LanguageTypeId - b.LanguageTypeId);
				}
				var language = res.filter(s => s.LanguageType.Name == 'English');
				languageType = (language && language.length) ? language[0].LanguageTypeId : result[0].LanguageType;
				this.translateServiceProfile.languageList = (res && res.length) ? JSON.parse(JSON.stringify(res)) : JSON.parse(JSON.stringify(result));
				this.languageList = (res && res.length) ? JSON.parse(JSON.stringify(res)) : JSON.parse(JSON.stringify(result));
				//this.translateServiceProfile.preferredLanguage = this.authService.getLangPreference || languageType;
				if(!this.profileLanguage){
					if(this.authService.getLangPreference > 0){
						const PrefLanguageTypeId = Number(this.authService.getLangPreference);
						if(this.languageList.find(x => x.LanguageTypeId == PrefLanguageTypeId)){
							this.profileLanguage = this.authService.getLangPreference;
						} else {
							if(this.languageList.find(x => x.LanguageType.Name.toString().toUpperCase() == (language && language.length > 0) ? language.Name.toString().toUpperCase():''))
							{
								this.profileLanguage = this.languageList.find(x => x.LanguageType.Name.toString().toUpperCase() == language.Name.toString().toUpperCase()).LanguageTypeId;
							} else{
								if(this.languageList && this.languageList.length > 0){
									this.profileLanguage = this.languageList[0].LanguageTypeId;
								}else{
									this.profileLanguage = languageType;
								}
							}
						}
					}else{
						if(language){
							if(this.languageList.find(x => x.LanguageType.Name.toString().toUpperCase() == (language && language.length > 0) ? language.Name.toString().toUpperCase():''))
							{
								this.profileLanguage = this.languageList.find(x => x.LanguageType.Name.toString().toUpperCase() == language.Name.toString().toUpperCase()).LanguageTypeId;
							} else{
								if(this.languageList && this.languageList.length > 0){
									this.profileLanguage = this.languageList[0].LanguageTypeId;
								}else{
									this.profileLanguage = languageType;
								}
							}
						} else{
							this.profileLanguage = languageType;
						}
					}
				}
				//this.onPrefLanguageChanged();
				this.setApplicationLanguage(this.profileLanguage);
				this.unChanged = true;
				// if(this.languageList.length > 1){
				// 	this.languageList = this.languageList.sort((a, b) => a.LanguageType.Name.localeCompare(b.LanguageType.Name));
				// }
				//this.languageLenght.emit(0);
			}, err => {
				this.showLoader = false;
			});
		}
	}

	onProfileLanguageChanged(changeEvent?: boolean) {
		if (this.onChange) {
			this.translateServiceProfile.languageList = this.languageList;
			this.authService.setLangPreference(this.profileLanguage);
			this.translateServiceProfile.use(this.profileLanguage);
		}

		if(changeEvent) {
			this.authService.setLangPreference(this.profileLanguage);
			this.translateServiceProfile.use(this.profileLanguage);
		}

		if (+this.profileLanguage === +this.authService.getLangPreference)
			this.unChanged = true;
		else
			this.unChanged = false;

		setTimeout(() => {
			this.refreshService.refresh('refreshBreadCrumbContent');
		}, 100);
	}

	setApplicationLanguage(LanguggeId: number) {
		this.authService.setLangPreference(LanguggeId);
		this.translateServiceProfile.use(LanguggeId);
		this.refreshService.refresh('refreshBreadCrumbContent');
	}

	onPrefLanguageChanged() {
		if (this.onChange) {
			//this.authService.setLangPreference(this.selectedLanguage);
			this.authService.setLangPreference((this.selectedLang && this.selectedLang.value)? this.selectedLang.value: this.profileLanguage);
			//this.profileLanguage = (this.selectedLang && this.selectedLang.value)? this.selectedLang.value: 0;
			this.translateServicePref.use(this.authService.getPreferredLanguageType);
		}

		if (+(this.selectedLang && this.selectedLang.value) === +this.authService.getPreferredLanguageType)
			this.unChanged = true;
		else
			this.unChanged = false;
	}

	changeSelectedLang() {
		this.showLoader = true;

		if (!this.authService.isUserAuthorized)
			return;

		const payload = {
			ClientId: this.authService.getClientId,
			EmployeeId: this.authService.getEmployeeId,
			LanguageTypeId: (this.selectedLang && this.selectedLang.value)
		};

		if (this.authService.getEmployeeId) {
			this.translateServicePref.setEmployeeLanguage(payload).subscribe(res => {
				this.translateServicePref.preferredLanguage = this.selectedLang && this.selectedLang.value;
				this.onChange = !this.onChange;
				let lang = this.selectedLang ? this.selectedLang.label : '';
				let details = '<ul class="list-unstyled">'
				details += '<p>Preferred language selected: '+ lang +'</p>';
				details += '</ul>';
				const activityLogPayload = this.authService.getActivityLogPayload('Preferred Language Selected', details);
				if (activityLogPayload)
					this.activityService.createActivity(activityLogPayload).subscribe(res => { }, err => { });

				//this.onPrefLanguageChanged();
				this.employeePreferredLanguage = this.selectedLang && this.selectedLang.value;
				this.onChange = !this.onChange;
				this.unChanged = true;
				if(this.languageList.find(x => x.LanguageTypeId == this.employeePreferredLanguage)){
					this.profileLanguage = this.employeePreferredLanguage;
					this.onProfileLanguageChanged(true);
					this.refreshService.refresh('refreshLanguageDropdown');
				}
				setTimeout(() => {
					this.messageHolder = { visible: true, messageType: 'success', message: this.translatePipe.transform('LanguageUpdateSuccess', 'Contact') };
					this.showLoader = false;
				}, 1000);

			}, err => {
				this.messageHolder = { visible: true, messageType: 'error', message: 'Language not updated!' };
			}).add(() => {
				this.showLoader = false;
			});
		}
	}

	hideMessage() {
		this.messageHolder = { visible: false, messageType: '', message: '' };
	}

	getIVACLanguages() {
		const payload = {
			'employeeId' : this.authService.getEmployeeId,
			'clientId': this.authService.getClientId,
			'subClientId': this.authService.getSubClientId
		};
		// let languageType = null;
		let result : any[] = [];
		result.push({
			CreatedBy: null,
			CreatedDate: null,
			Id: null,
			LanguageType: {
				CreatedBy: null,
				CreatedDate: null,
				Id: null,
				ModifiedBy: null,
				ModifiedDate: null,
				Name: "English",
				ObjectState: 0,
			},
			LanguageTypeId: 1,
			ModifiedBy: null,
			ModifiedDate: null,
			ObjectState: 0,
			SubClientId: null
		});
		this.translateServiceProfile.getLanguage(payload).subscribe(res => {
			if(res && res.length > 0){
				res = res.sort((a,b) => a.LanguageTypeId - b.LanguageTypeId);
			}
			// var language = res.filter(s => s.LanguageType.Name == 'English');
			// languageType = (language && language.length) ? language[0].LanguageTypeId : result[0].LanguageType;
			this.translateServiceProfile.languageList = (res && res.length) ? JSON.parse(JSON.stringify(res)) : JSON.parse(JSON.stringify(result));
			this.languageList = (res && res.length) ? JSON.parse(JSON.stringify(res)) : JSON.parse(JSON.stringify(result));
			// if(this.languageList.length > 1){
			// 	this.languageList = this.languageList.sort((a, b) => a.LanguageType.Name.localeCompare(b.LanguageType.Name));
			// }
		}, err => {
			this.showLoader = false;
		});
	}
}
