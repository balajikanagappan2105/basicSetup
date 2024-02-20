import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { TranslateService } from 'src/app/core/services/translate.service';
import { AppUtilityService } from 'src/app/core/services/app-utility.service';
import { ErrorLoggerService } from 'src/app/core/services/errorlogger.service';
import { AuthorizationService } from 'src/app/core/services/authorization.service';

@Component({
  selector: 'app-forgotuser',
  templateUrl: './forgotuser.component.html',
  styleUrls: ['./forgotuser.component.scss']
})
export class ForgotuserComponent implements OnInit {


  @Output() backToLogin: EventEmitter<any> = new EventEmitter();
  forgetUserNameForm: UntypedFormGroup;
  showForgetUsernameLoader: boolean = false;
  modalMessage: any = { Message: '', CSSClass: '', Visibility: false };

  constructor(private fb: UntypedFormBuilder,
		private router: Router,
		private authService: AuthenticationService,
		private authorizationService: AuthorizationService,
		public translate: TranslateService,
		public utilityService: AppUtilityService,
		private errorLogger: ErrorLoggerService) { }

  ngOnInit() {

	this.forgetUserNameForm = this.fb.group({
		LastName: ['', Validators.required],
		ConsovaPIN: ['', Validators.required],
		EmployeeSSN: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
	});
	this.modalMessage = { Message: '', CSSClass: '', Visibility: false };
  }



  onSubmit() {
	//window.scrollTo(0,0);
	//this.showAccountCreation = false;
	this.showForgetUsernameLoader = true;

	this.modalMessage = { Message: '', CSSClass: '', Visibility: false };

	// stop here if form is invalid
	if (this.forgetUserNameForm.invalid)
		return;
	const authParam = this.forgetUserNameForm.value;
	authParam.LastName = authParam.LastName.trim();
	authParam.LastName = authParam.LastName.replace("”", '"').replace("“", '"').replace("’", "'").replace("‘", "'").replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/[\u2013\u2014]/g, '-').replace(/[\u2026]/g, '...');

	this.authorizationService.validateEmployee(authParam).subscribe(res => {

		if (!res.ResponseStatus && res.Message != '') {
			// this.validateAuthToken(res);
			// ok functionlaity;
			var errorMessage = "User could not be found from the combination of data entered.";
			this.modalMessage = {Message: errorMessage, CSSClass: 'text-danger', Visibility: true};

			this.showForgetUsernameLoader = false;


		}else if (res.ResponseStatus)
		{
			const payload = {
				ConsovaPIN: this.authService.getEmployeeId ||  this.forgetUserNameForm.value.ConsovaPIN
			};

			this.authorizationService.sendForgetUserName(payload).subscribe(res =>
				{
					if (!res.ResponseStatus && res.Message != '') {
						// this.validateAuthToken(res);
						// ok functionlaity;
						this.modalMessage = {Message: res.Message, CSSClass: 'text-danger', Visibility: true};

						this.showForgetUsernameLoader = false;


					}else if (res.ResponseStatus)
					{
						this.showForgetUsernameLoader = false;
						this.modalMessage = {Message: res.Message, CSSClass: 'text-success', Visibility: true};
					}

				}, err => {
					this.errorLogger.logError({ message: 'Error occured in :this.authService.forgetUsername => ' + JSON.stringify(err) });
					this.modalMessage = { Message: 'Please check the provided details', CSSClass: 'text-danger', Visibility: true };
					this.forgetUserNameForm.reset();
					this.showForgetUsernameLoader = false;
				});
		}
		else
		{
			this.showForgetUsernameLoader = false;

		}
	}, err => {
		this.errorLogger.logError({ message: 'Error occured in :this.authService.forgetUsername => ' + JSON.stringify(err) });
		this.modalMessage = { Message: 'Please check the provided details', CSSClass: 'text-danger', Visibility: true };
		this.forgetUserNameForm.reset();
		this.showForgetUsernameLoader = false;
	});
}

  back() {
		this.backToLogin.emit();
	}

	hidePopup(){
		this.showForgetUsernameLoader = false;
		this.modalMessage = { Message: '', CSSClass: '', Visibility: false };
		this.forgetUserNameForm.reset();
		this.backToLogin.emit();
	}

}
