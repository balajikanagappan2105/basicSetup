import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { TranslateService } from 'src/app/core/services/translate.service';
import { AppUtilityService } from 'src/app/core/services/app-utility.service';
import { ErrorLoggerService } from 'src/app/core/services/errorlogger.service';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ActivityService } from 'src/app/core/services/activity.service';
import { ConfirmationService } from 'primeng/api';
import { ForgotPasswordService } from 'src/app/core/services/forgot-password.service';
import { AccountService } from 'src/app/core/services/account.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
	providers: [ConfirmationService, ForgotPasswordService, TranslatePipe]
})
export class CreateAccountComponent implements OnInit {
	showData: any;
	loginFormregister: UntypedFormGroup;
	showAccountCreationLoader: boolean;
	submitted: boolean;
	showLoader: boolean;
	consovaPin : number;
	modalMessage: any = { Message: '', CSSClass: '', Visibility: false };
	modalMessageUser: any = { Message: '', CSSClass: '', Visibility: false };
	loginForm: UntypedFormGroup;
	constructor(private fb: UntypedFormBuilder,
		private router: Router,
		private authService: AuthenticationService,
		private authorizationService: AuthorizationService,
		private errorLogger: ErrorLoggerService,){

	}

	ngOnInit() {
		// console.log("create Account Page", this.showData)
		this.consovaPin = 0;
		this.loginFormregister = this.fb.group({
			LastName: ['', Validators.required],
			ConsovaPIN: ['', Validators.required],
			EmployeeSSN: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
		});
	}


	onSubmitUser() {
		window.scrollTo(0,0);
		this.showAccountCreationLoader = true;
		this.submitted = true;
		this.modalMessage = { Message: '', CSSClass: '', Visibility: false };

		// stop here if form is invalid
		if (this.loginFormregister.invalid)
			return;
		const authParam = this.loginFormregister.value;
		authParam.LastName = authParam.LastName.trim();
		authParam.LastName = authParam.LastName.replace("”", '"').replace("“", '"').replace("’", "'").replace("‘", "'").replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/[\u2013\u2014]/g, '-').replace(/[\u2026]/g, '...');

		this.authorizationService.validateEmployee(authParam).subscribe(res => {

			if (!res.ResponseStatus && res.Message != '') {
				// this.validateAuthToken(res);
				// ok functionlaity;
				this.modalMessage = {Message: res.Message, CSSClass: 'text-danger', Visibility: true};

				this.showLoader = false;
				this.showAccountCreationLoader = false;
				// this.showFirstTimeRegister = false;

			}else if (res.ResponseStatus && res.Message != '')
			{
				const payload = {
					employeeId: this.authService.getEmployeeId || this.loginForm.value.ConsovaPIN || this.consovaPin || this.loginFormregister.value.ConsovaPIN
				};
				this.authorizationService.validateEmployeeLogin(payload).subscribe(r => {
					if (!res.ResponseStatus) {
						this.modalMessage = {Message: r.Message, CSSClass: 'text-danger', Visibility: true};

						this.showLoader = false;
						this.showAccountCreationLoader = false;
						// this.showFirstTimeRegister = false;
					}else{
						this.modalMessage = {Message: res.Message, CSSClass: 'text-danger', Visibility: true};

						this.showLoader = false;
						this.showAccountCreationLoader = false;
						// this.showFirstTimeRegister = false;
					}
				});
			}
			else
			{
				this.showLoader = false;
				// this.showFirstTimeRegister = false;
				this.showAccountCreationLoader = false;
				this.consovaPin = authParam.ConsovaPIN;
				// this.showAccountSetup = true;
			}
		}, err => {
			this.errorLogger.logError({ message: 'Error occured in :this.authService.login => ' + JSON.stringify(err) });
			this.modalMessageUser = { Message: 'Please check the provided details', CSSClass: 'text-danger', Visibility: true };
			this.loginFormregister.reset();
			this.showAccountCreationLoader = false;
		});
	}
	closeAuthUser() {
		this.modalMessageUser = false;
		this.showAccountCreationLoader = false;
		this.showLoader = false;
		// this.showforgetLoader = false;
		// this.showforgetuserLoader = false;
	}

	returndataentrypage() {

		// this.ShowDataEntryDialog = true;
	}
	returnsign() {
		this.modalMessage = false;
		this.showAccountCreationLoader = false;
		this.showLoader = false;
		// this.showforgetLoader = false;
		// this.showforgetuserLoader= false;
	}
}
