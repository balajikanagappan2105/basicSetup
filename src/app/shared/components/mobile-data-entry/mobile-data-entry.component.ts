import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
  selector: 'app-mobile-data-entry',
  templateUrl: './mobile-data-entry.component.html',
  styleUrls: ['./mobile-data-entry.component.scss'],
	providers: [ConfirmationService, ForgotPasswordService, TranslatePipe]
})
export class MobileDataEntryComponent implements OnInit {
	loginForm: UntypedFormGroup;
	submitted = false;
	modalMessage: any = { Message: '', CSSClass: '', Visibility: false };
	modalMessageUser: any = { Message: '', CSSClass: '', Visibility: false };
	modalMessageRestPwd: any = { Message: '', CSSClass: '', Visibility: false };
	showLoginPage: boolean = false;
	showLoader: boolean = true;
	entryPloicyAutocomplete: string;
	entryPloicySecret1Autocomplete: string;
	entryPloicySecret2Autocomplete: string;
	entryPloicyAutocompleteForm: string;
	isSSORedirect: boolean = false;
	showFirstTimeRegister: boolean;
	loginFormregister: UntypedFormGroup;
	ShowDataEntryDialog: boolean;
	forgotPasswordDialogVisibility: boolean;
	forgotUserDialogVisibility: boolean;
	emailAddress: string;
	showAccountCreationLoader: boolean;
	showforgetLoader: boolean;
	showforgetuserLoader: boolean;
	mobileNumber :string;
	emailOtp: string;
	mobileOtp: string;
	ShowMobileEntryDialog: boolean;
	showAccountSetup: boolean;
	emailsendresponse: string;
	mobilesendresponse: string;
	emailverifyresponse : string;
	mobileverifyresponse : string;
	loginFormOtp: UntypedFormGroup;
	loginFormMobileOtp: UntypedFormGroup;
	loginFormaccountsetup: UntypedFormGroup;
	showLanguagePreference: boolean;
	isAuthenticationCompleted : boolean;
	authResponse : any;

	isEmailOTPVerfied : boolean;
	isMobileOTPVerfied : boolean;
	isEmailOTPSent: boolean;
	isMobileOTPSent : boolean;
	consovaPin : number;
	isValidEmailId : boolean;
	isValidMobileNumber : boolean;
	isValidEmailOTP : boolean;
	isValidMobileOTP : boolean;
	gogreenCheckbox : UntypedFormControl;
	sendOTPText : string;
	sendMobileOTPText: string;
	userName: string;
	//isMobileOTPSent : boolean;
	leftTime: number = 120;
    interval;
    startTime: any;
    startTimeCounter: any;
	passwordIncorrect :string;
	mobileOtpleftTime: number = 120;
    mobileOtpinterval;
    mobileOtpstartTime: any;
    mobileOtpstartTimeCounter: any;
	isSuccessMessage : boolean;
	languageList: any[] = [];
	profileLanguageList: any[] = [];
	loginEmployee: any;
	selectedLang: any;
	employeePreferredLanguageId: number = -1;
	selectedLanguage: number;
	showLanguageLoader: boolean;

	emailsuccessmessage: string;
	emailerrormessage: string;
	mobilesuccessmessage: string;
	mobileerrormessage: string;
	accounterrormessage: string;
	showAccountSetupLoader: boolean;

	constructor(private fb: UntypedFormBuilder,
		private router: Router,
		private authService: AuthenticationService,
		private authorizationService: AuthorizationService,
		public translate: TranslateService,
		public utilityService: AppUtilityService,
		private actRoute: ActivatedRoute,
		private errorLogger: ErrorLoggerService,
		public activityService: ActivityService,
		public accountService: AccountService,
		private confirmationService: ConfirmationService,
		private forgotPwd: ForgotPasswordService, public translateServicePref: TranslateService, public translatePipe: TranslatePipe) {

		const UserName = this.actRoute.snapshot.queryParams.username;
		const Password = this.actRoute.snapshot.queryParams.password;

		if ((this.actRoute.snapshot.queryParams && this.actRoute.snapshot.queryParams.token && this.actRoute.snapshot.queryParams.token.length > 0) ||
			(UserName != null && Password != null)) {
			this.showLoginPage = false;
			let paramVal = { Token: this.actRoute.snapshot.queryParams.token };

			this.isSSORedirect = true;
			this.errorLogger.logError({ message: 'Token Param Received: ' + this.actRoute.snapshot.queryParams.token });

			if(paramVal.Token == undefined)
			{
				this.userName = UserName;
				const payload = {
					UserName: UserName,
					Password: Password
				};

				this.authorizationService.login(payload).subscribe(res => {
					if(!res.Status){
						this.modalMessage = { Message: res.Token, CSSClass: 'text-danger', Visibility: true };
					}else{
						this.userName = this.loginForm.get('Username').value;
						this.validateAuthenticationDetails(res)
					}
				}, err => {
				});

			}
			else{
				setTimeout(() => {
					//this.validateAuthToken(paramVal);
					this.validateAuthenticationDetails(paramVal);
				}, 10);
			}


			this.showLoader = false;
		} else {
			this.showLoginPage = true;
		}


	}

	ngOnInit() {
		this.emailAddress = "";
		this.entryPloicyAutocompleteForm = this.utilityService.generateRandomText();
		this.entryPloicyAutocomplete = this.utilityService.generateRandomText();
		this.entryPloicySecret1Autocomplete = this.utilityService.generateRandomText();
		this.entryPloicySecret2Autocomplete = this.utilityService.generateRandomText();
		this.translate.use(0);
		this.showLoader = false;
		this.emailAddress = "";
		this.emailOtp = "";
		this.mobileOtp = "";
		this.isAuthenticationCompleted = false;
		this.isEmailOTPVerfied = false;
		this.isMobileOTPVerfied = false;
		this.isEmailOTPSent = false;
		this.isMobileOTPSent = false;
		this.consovaPin = 0;
		this.isValidMobileNumber = false;
		this.startTimeCounter = "02:00";
		this.isValidEmailId = true;
		this.mobileOtpstartTimeCounter= "02:00";
		this.sendOTPText = "Send OTP";
		this.sendMobileOTPText = "Send OTP";
		this.isSuccessMessage = false;
		this.emailsuccessmessage = "";
		this.emailerrormessage ="";
		this.mobilesuccessmessage = "";
		this.mobileerrormessage ="";
		this.accounterrormessage ="";

		if (this.authService.isUserAuthorized)
			this.router.navigate(['dashboard']);

		// this.loginForm = this.fb.group({
		// 	LastName: ['', Validators.required],
		// 	ConsovaPIN: ['', Validators.required],
		// 	EmployeeSSN: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
		// });
		this.loginFormregister = this.fb.group({
			LastName: ['', Validators.required],
			ConsovaPIN: ['', Validators.required],
			EmployeeSSN: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
		});

		this.loginForm = this.fb.group({
			Username: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern(this.authService.getEmailRegExp)])],
			Password: ['', Validators.required]
		});

		this.loginFormOtp = this.fb.group({
			emailAddress: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern(this.authService.getEmailRegExp)])],
			emailOtp: ['', Validators.required],
			greenCheckbox : ['',Validators.required]
			// mobileNumber: ['', Validators.required],

		})
		this.loginFormMobileOtp = this.fb.group({
			MobileNumber: ['', Validators.required],
			mobileOtp: ['', Validators.required],
			// MobileNumber: ['', Validators.required],

		})
		this.loginFormaccountsetup = this.fb.group({
			Username: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern(this.authService.getEmailRegExp)])],
			Password: ['', Validators.required],
			ConfirmPassword: ['',Validators.required]
		})

		//this.gogreenCheckbox = this.loginFormOtp.get('greenCheckbox') as FormControl;

		this.createForm();
		this.showLoader = false;
	}

	onSubmit() {
		window.scrollTo(0,0);
		this.showLoader = true;
		this.submitted = true;
		this.modalMessage = { Message: '', CSSClass: '', Visibility: false };

		// stop here if form is invalid
		// if (this.loginForm.invalid)
		// 	return;

		// const authParam = this.loginForm.value;
		// authParam.LastName = authParam.LastName.trim();
		// authParam.LastName = authParam.LastName.replace("”", '"').replace("“", '"').replace("’", "'").replace("‘", "'").replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/[\u2013\u2014]/g, '-').replace(/[\u2026]/g, '...');

		const payload = {
			UserName: this.loginForm.get('Username').value,
			Password: this.loginForm.get('Password').value
		};

		this.authorizationService.login(payload).subscribe(res => {
			//if (res.Status)
				//this.validateAuthToken(res);
			// else
			// {
			// 	this.modalMessage = { Message:res.Token, CSSClass: 'text-danger', Visibility: true };
			// 	this.showLoader = false;
			// }

			if(!res.Status){
				this.modalMessage = { Message: res.Token, CSSClass: 'text-danger', Visibility: true };
			}else{
				this.userName = this.loginForm.get('Username').value;
				this.validateAuthenticationDetails(res)
			}
		}, err => {
			this.errorLogger.logError({ message: 'Error occured in :this.authService.login => ' + JSON.stringify(err) });
			this.modalMessage = { Message: 'The username or password you entered is incorrect', CSSClass: 'alert-danger', Visibility: true };
			//this.modalMessage = { Message: 'Please check the provided details', CSSClass: 'text-danger', Visibility: true };
			this.loginForm.reset();
			this.showLoader = false;
		});
	}

	validateAuthToken(authToken: any) {
		this.modalMessage = { Message: '', CSSClass: '', Visibility: false };
		this.modalMessage.Message = this.authService.authValidation(authToken);

		if (this.modalMessage.Message.length === 0) {
			this.authService.setAuthTokenStorage();
			setTimeout(() => {
				this.activityService.getActivityType().subscribe(res => {
					this.authService.setActivityTypes(res);
				}, err => {
				}).add(() => {
					//this.validateAuthenticationDetails();
					this.validateEmployeeHasActiveAudit();
				});
			}, 10);
		} else {
			this.errorLogger.logError({ message: 'validateAuthToken Error Message: ' + this.modalMessage.Message });
			this.modalMessage = { Message: this.modalMessage.Message, CSSClass: 'text-danger', Visibility: true };
			this.showLoader = false;
		}
	}

	validateEmployeeHasActiveAudit() {
		const goGreenPayload = {
			employeeId: this.authService.getEmployeeId || this.loginForm.value.ConsovaPIN || this.loginEmployee.EmployeeId,
			clientId: this.authService.getClientId || this.loginEmployee.ClientId
		};
		this.accountService.checkEmployeeGoGreen(goGreenPayload).subscribe(arg => {
			if(arg && arg.ResponseStatus)
				this.getEmployeePreferedEmailStatus();
		}, err => {
		});
		const payload = {
			employeeId: this.authService.getEmployeeId || this.loginForm.value.ConsovaPIN
		};
		const docPayload = {
			employeeId: this.authService.getEmployeeId || this.loginForm.value.ConsovaPIN || this.loginEmployee.EmployeeId,
			clientId: this.authService.getClientId || this.loginEmployee.ClientId
		};
		this.authorizationService.validateEmployeeLogin(payload).subscribe(res => {
			if (res.ResponseStatus) {
				setTimeout(() => {
					const activityLogPayload = this.authService.getActivityLogPayload('User Login', 'User Login');
					if (activityLogPayload)
						this.activityService.createActivity(activityLogPayload).subscribe(res => {
						}, err => {
						}).add(() => {
							this.onLoginSuccess();
						});
				}, 10);
				this.authorizationService.getEmployeeUploadDocumentStatus(docPayload).subscribe(res => {
					this.authService.setEnableUploadDocuments(res.ResponseStatus);
					this.authService.setGoGreenCompleted(false);
				});
			} else {
				let errMessage = res && res.Message ? res.Message : 'validateEmployeeHasActiveAudit() failed without any valid message';
				this.errorLogger.logError({ message: errMessage });
				this.authService.clearLocalStorage();
				if (this.isSSORedirect) {
					this.errorLogger.logError({ message: 'Error Redirect occured at SSORedirect and the error message is : '+ errMessage});
					this.router.navigate(['error'])
				} else {
					this.errorLogger.logError({ message: 'Error Redirect occured at direct login and the error message is : '+ errMessage});
					this.modalMessage = { Message: (res && res.Message), CSSClass: 'text-danger', Visibility: true };
					this.showLoader = false;
				}
			}
		}, err => {
			this.errorLogger.logError({ message: 'this.authService.validateEmployeeLogin: FAILED: ' + JSON.stringify(err) });
			this.authService.clearLocalStorage();
			this.modalMessage = { Message: "Oops! Something went wrong! Help us to improve by sending your error report to us.", CSSClass: 'text-danger', Visibility: true };
			this.showLoader = false;
		});
	}
	getEmployeePreferedEmailStatus() {
		this.showLoader = true;
		const payload = {
			EmployeeId: this.authService.getEmployeeId || this.loginForm.value.ConsovaPIN || (this.loginEmployee && this.loginEmployee.EmployeeId),
			ClientId: this.authService.getClientId || (this.loginEmployee && this.loginEmployee.ClientId)
		};

		this.accountService.getEmployeePreferedEmailStatus(payload).subscribe((res) => {
			setTimeout(() => {
				if (res) {
					if(res.IsActive)
						this.authService.setEnableGoGreen(false);
					else
					{
						this.authService.setEnableGoGreen(true);
						this.authService.setPreferedEmailStatus(res.IsActive);
						this.authService.setPreferedEmailId(res.EmailId);
						this.authService.setResendMailId(res.Id);
					}
				}
				else
				{
					this.authService.setEnableGoGreen(true);
					this.authService.setPreferedEmailStatus(false);
					this.authService.setPreferedEmailId('');
					this.authService.setResendMailId(0);
				}
			}, 10);
		}, err => {
		}).add(() => {
			this.showLoader = false;
		});
	}

	onLoginSuccess() {
		if (this.authService.isUserAuthorized)
			this.router.navigate(['dashboard']);
	}

	createForm() {
		// this.loginForm = this.fb.group({
		// 	Username: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern(this.authService.getEmailRegExp)])]
		// })
		this.loginForm = this.fb.group({
			Username: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern(this.authService.getEmailRegExp)])],
			Password: ['', Validators.required]
		});
	}
	showFirstTimeUser() {
		// this.showFirstTimeRegister = true;
		this.router.navigate(['acctcreation'])
		this.loginFormregister.reset();
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
				this.showFirstTimeRegister = false;

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
						this.showFirstTimeRegister = false;
					}else{
						this.modalMessage = {Message: res.Message, CSSClass: 'text-danger', Visibility: true};

						this.showLoader = false;
						this.showAccountCreationLoader = false;
						this.showFirstTimeRegister = false;
					}
				});
			}
			else
			{
				this.showLoader = false;
				this.showFirstTimeRegister = false;
				this.showAccountCreationLoader = false;
				this.consovaPin = authParam.ConsovaPIN;
				this.showAccountSetup = true;
			}
		}, err => {
			this.errorLogger.logError({ message: 'Error occured in :this.authService.login => ' + JSON.stringify(err) });
			this.modalMessageUser = { Message: 'Please check the provided details', CSSClass: 'text-danger', Visibility: true };
			this.loginFormregister.reset();
			this.showAccountCreationLoader = false;
		});
	}


	back() {
		this.forgotUserDialogVisibility = false;
	}

	forgotPassword(event: any) {
		this.showLoader = true;
		this.showforgetLoader = true;
		this.modalMessageRestPwd = { Message: "", CSSClass: "", Visibility: false };

		const payload = {
			email: event
		};

		this.forgotPwd.sendPasscodeIverify(payload).subscribe(res => {
			if (res.ResponseStatus) {
				this.modalMessageRestPwd = { Message: "", CSSClass: "", Visibility: true };
			} else {
				this.modalMessageRestPwd = { Message: res.Message, CSSClass: "text-danger", Visibility: true };
		}
		this.showLoader=false;
		}, err => {
			this.modalMessageRestPwd = { Message: "Provide correct email id to send you the password reset link.", CSSClass: "", Visibility: true };
		}).add(() => {
			this.showLoader = false;
			this.showforgetLoader = false;
		});
	}

	showDataEntry() {
				this.showAccountSetup = true;
    }

		opendataentry() {
			this.ShowDataEntryDialog = true;
		}


	validateAuthenticationDetails(response : any)
	{
		this.modalMessageRestPwd = { Message: "", CSSClass: "", Visibility: false };
		const payload = {
			//UserName: this.loginForm.get('Username').value,
			UserName: this.userName
		};

		this.authorizationService.validateAuthDeatils(payload).subscribe(res => {
			//this.authService.setActivityTypes(res);
			// if(!res.ResponseStatus){
			// 	this.modalMessage = { Message: res.Message, CSSClass: 'text-danger', Visibility: true };
			// }else{
			// 	this.updateAuthenticationDetails(res,response);
			// }
			this.updateAuthenticationDetails(res,response);

			//this.validateEmployeeHasActiveAudit();
		}, err => {

		})
	}

	updateAuthenticationDetails(response : any, authresponse: any)
	{
		if(response.ResponseStatus == true)
		{
			//this.validateEmployeeHasActiveAudit();
			this.validateAuthToken(authresponse);
		}
		else
		{
			this.showLoader = false;
			if(response.Email != null)
			{
				//this.emailAddress = response.Email;
				this.loginFormOtp.setValue({
					emailAddress: response.Email,
					emailOtp : "",
					greenCheckbox: false
				})



			}
			if(response.MobileNumber != null)
			{
				//this.mobileNumber = response.MobileNumber;
				this.loginFormMobileOtp.setValue({
					MobileNumber: response.MobileNumber,
					mobileOtp: ""
				})
			}
			this.authResponse = authresponse;
			this.ShowDataEntryDialog = true;
		}
	}

	sendEmailOtp()
	{
		this.emailsuccessmessage = "";
		this.emailerrormessage = "";
		var email = this.loginFormOtp.get('emailAddress').value;
		const payload = {
			//UserName: this.loginForm.get('Username').value,
			UserName: this.userName,
			Email : this.loginFormOtp.get('emailAddress').value
		}
		this.authorizationService.sendEmailOTP(payload).subscribe( res=>{
			this.emailsuccessmessage = res.Message;
			this.isValidEmailId = false;
			this.validateCommEmail();
			this.leftTime = 120;
			this.startTimeCounter = "02:00";
			this.timerCount("emailOTP");
		}), err => {
			this.emailerrormessage = err.Message;
		}
	}

	resendEmailOtp()
	{
		const payload = {
			//UserName: this.loginForm.get('Username').value,
			UserName: this.userName,
			Email : this.loginFormOtp.get('emailAddress').value
		}
		this.authorizationService.resendEmailOTP(payload).subscribe( res=>{
			this.emailsendresponse = res.Message;
		}), err => {
		}
	}

	sendMobileOtp()
	{
		this.mobilesuccessmessage = "";
		this.mobileerrormessage = "";

		const payload = {
			//UserName: this.loginForm.get('Username').value,
			UserName: this.userName,
			MobileNumber : this.loginFormMobileOtp.get('MobileNumber').value
		}
		this.authorizationService.sendMobileOTP(payload).subscribe( res=>{

			this.mobilesuccessmessage = res.Message;
			this.isMobileOTPSent = true;
			this.mobileOtpleftTime = 120;
			this.mobileOtpstartTimeCounter = "02:00";
			this.mobiletimerCount('mobileotp');
			this.enableMobileButton();
			//this.changeField();
		}), err => {
			this.mobileerrormessage = err.Message;
		}
	}

	resendMobileOtp()
	{
		const payload = {
			//UserName: this.loginForm.get('Username').value,
			UserName: this.userName,
			MobileNumber : this.loginFormMobileOtp.get('MobileNumber').value
		}
		this.authorizationService.resendMobileOTP(payload).subscribe( res=>{
			this.mobilesendresponse = res.Message;
		}), err => {
		}
	}


	verifyemailOtp()
	{
		this.emailsuccessmessage = "";
		this.emailerrormessage ="";
		//var OTP = this.loginFormMobile.get('EmailOtp').value;
		//var email = this.emailAddress;
		var OTP = this.emailOtp;
		const payload = {
			//UserName: this.loginForm.get('Username').value,
			UserName: this.userName,
			OTP : this.loginFormOtp.get('emailOtp').value
		}
		this.authorizationService.validateOTP(payload).subscribe( res=>{
			//this.emailverifyresponse = res.Message;

			if(res.ResponseStatus == true)
			{
				this.emailsuccessmessage = res.Message;
				this.isEmailOTPVerfied = true;

			}
			else
			{
				this.emailerrormessage = res.Message;

			}
			//this.ShowMobileEntryDialog = true;
		}), err => {
			this.emailerrormessage   = err.Message;
		}
	}

	verifyemobileOtp()
	{
		this.mobilesuccessmessage = "";
		this.mobileerrormessage = "";

		var OTP = this.loginFormMobileOtp.get('mobileOtp').value;
		const payload = {
			//UserName: this.loginForm.get('Username').value,
			UserName: this.userName,
			OTP : OTP
		}
		this.authorizationService.validateOTP(payload).subscribe( res=>{
			//this.mobileverifyresponse = res.Message;
			if(res.ResponseStatus == true)
			{
				this.mobilesuccessmessage = res.Message;
				this.isMobileOTPVerfied = true;
			}
			else
			{
				this.mobileerrormessage = res.Message;
			}
		}), err => {
			this.mobileerrormessage = err.Message;
		}
	}
	showMobileDataEntry()
	{

		var checkboxValue = this.loginFormOtp.get('greenCheckbox').value;
		if( checkboxValue == true)
		{
			const payload = {
				UserName : this.userName,
				EmployeeId : this.consovaPin,
				Email : this.loginFormOtp.get('emailAddress').value
			}

			this.authorizationService.updatePaperLessOption(payload).subscribe( res=>{
				if(res.ResponseStatus ==  true)
				{
					this.ShowDataEntryDialog = false;
					this.showAccountSetup = false;
					this.ShowMobileEntryDialog = true;
				}
			}), err => {

			}
		}
		else
		{
			this.ShowDataEntryDialog = false;
			this.showAccountSetup = false;
			this.ShowMobileEntryDialog = true;
		}

	}
	updateUserDetails()
	{
		const payload = {
			UserName: this.userName,
			Email : this.loginFormOtp.get('emailAddress').value,
			MobileNumber : this.loginFormMobileOtp.get('MobileNumber').value
		}
		this.authorizationService.updateEmail(payload).subscribe( res=>{
			this.mobilesuccessmessage = res.Message;
			this.isAuthenticationCompleted = res.ResponseStatus;
			//this.ShowMobileEntryDialog = false;
			this.showLanguageLoader = true;
			this.onNextLangPref();
		}), err => {
			this.showLoader = false;
			this.mobileerrormessage = err.Message;
		}
	}

	onClose() {
		this.ShowMobileEntryDialog = true;
	}
	closeAuthUser() {
		this.modalMessageUser = false;
		this.showAccountCreationLoader = false;
		this.showLoader = false;
		this.showforgetLoader = false;
		this.showforgetuserLoader = false;
	}
	returnsign() {
		this.modalMessage = false;
		this.showAccountCreationLoader = false;
		this.showLoader = false;
		this.showforgetLoader = false;
		this.showforgetuserLoader= false;
	}

	createAccount(){
		this.showAccountSetupLoader = true;
		this.accounterrormessage = "";
		var password = this.loginFormaccountsetup.get('Password').value;
		var ConfirmPassword = this.loginFormaccountsetup.get('ConfirmPassword').value;

		if(password === ConfirmPassword)
		{
			const payload ={
				EmployeeId : this.consovaPin ,
				UserName : this.loginFormaccountsetup.get('Username').value,
				Password : password
			}

			this.authorizationService.createNewAccount(payload).subscribe( res=>{
				if(res.ResponseStatus ==true)
				{
					this.loginForm.setValue({
						Username: this.loginFormaccountsetup.get('Username').value,
						Password : this.loginFormaccountsetup.get('Password').value
					})

					this.onSubmit();
				}
				else
				{
					this.accounterrormessage = res.Message;
				}

			}), err => {
			}
		}
		else
		{
			this.accounterrormessage = "Password should match with Confirm Password";
			this.showAccountSetupLoader = false;
		}

	}

	onPrefLanguageChanged(data: any){
		this.selectedLang = data.value;
	}

	languagePrefSubmit() {
		const payload = {
			ClientId: this.loginEmployee.ClientId.toString(),
			EmployeeId: this.loginEmployee.EmployeeId.toString(),
			LanguageTypeId: (this.selectedLang && this.selectedLang.value)
		};

		this.authorizationService.setEmployeeLanguage(payload).subscribe(res => {
			this.translateServicePref.preferredLanguage = this.selectedLang && this.selectedLang.value;
			let lang = this.selectedLang ? this.selectedLang.label : '';
			let details = '<ul class="list-unstyled">'
			details += '<p>Preferred language selected: '+ lang +'</p>';
			details += '</ul>';
			const activityLogPayload = this.authService.getActivityLogPayload('Preferred Language Selected', details);
			if (activityLogPayload)

				this.activityService.createActivity(activityLogPayload).subscribe(res => {

					this.showLoader = false;
				}, err => { });
				this.loginNewUser();

		}, err => {
			this.modalMessage = { visible: true, messageType: 'error', message: 'Language not updated!' };
		})
	}

	loginNewUser(){
		const UserName = this.actRoute.snapshot.queryParams.username;
		const Password = this.actRoute.snapshot.queryParams.password;
		const payload = {
			UserName: this.loginForm.get('Username').value || UserName,
			Password: this.loginForm.get('Password').value || Password
		};

		this.authorizationService.login(payload).subscribe(res => {
			if(!res.Status){
				this.modalMessage = { Message: res.Token, CSSClass: 'text-danger', Visibility: true };
			}else{
				this.userName = this.loginForm.get('Username').value;
				this.validateAuthenticationDetails(res)
			}
		}, err => {
			this.loginForm.reset();
			this.showLoader = false;
		});
	}

	onNextLangPref() {
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

		const payload1 = {
			//UserName: this.loginForm.get('Username').value,
			UserName: this.userName
		};

		this.authorizationService.getLoginEmployeeDetails(payload1).subscribe(res => {
			this.loginEmployee = res;
			const payload = {
				'clientId': this.loginEmployee.ClientId,
				'subClientId': this.loginEmployee.SubClientId ? this.loginEmployee.SubClientId : 0
			};
			var languageType = 0;

			this.translateServicePref.getCommunicationLanguage(payload).subscribe(res => {
				this.showLoader = false;
				if(res && res.length > 0){
					res = res.sort((a,b) => a.LanguageTypeId - b.LanguageTypeId);
				}
				var language = res.filter(s => s.LanguageType.Name == 'English')
				languageType = (language && language.length) ? language[0].LanguageTypeId : result[0].LanguageType;
				let languages = (res && res.length) ? JSON.parse(JSON.stringify(res)) : JSON.parse(JSON.stringify(result));
				this.profileLanguageList = [];
				for(let i=0; i<languages.length; i++){
					this.profileLanguageList.push({ label: languages[i].LanguageType.Name, value: languages[i].LanguageTypeId });
				}
				this.getPreferredLanguage();

			}, err => {
				this.showLanguageLoader = false;
			});
		}, err => {
			this.errorLogger.logError({ message: 'home-router.components.ts onAllDisclaimerAccepted() => ' + JSON.stringify(err) });
		})
	}

	validateCommEmail():any
	{
		if(this.loginFormOtp.get('emailAddress').valid && this.isValidEmailId)
		return true;
	}

	validateCommMobile():any
	{
		return this.loginFormMobileOtp.get('MobileNumber').valid;
	}

	enableMobileButton():any{
		if(this.isValidMobileNumber && !this.isMobileOTPSent)
		{
			return false;
		}
		else return true
	}
	// validateCommEmailOTP():any
	// {
	// 	return this.loginFormOtp.get('emailOtp').valid;
	// }

	// validateCommMobileOTP():any
	// {
	// 	return this.loginFormMobileOtp.get('mobileOtp').valid;
	// }


	validateCommEmailOTP(){

		var value = this.loginFormOtp.get('emailOtp').value;
		var emailId = this.loginFormOtp.get('emailAddress').valid;
		if(value == ' ' || value.length != 6 || !emailId){

		  this.isValidEmailOTP = false;

		}else{

		  this.isValidEmailOTP = true;

		}

	  }

	validateCommMobileOTP(){

		var value = this.loginFormMobileOtp.get('mobileOtp').value;

		if(value == ' ' || value.length != 6 || !this.isValidMobileNumber){

		  this.isValidMobileOTP = false;

		}else{

		  this.isValidMobileOTP = true;

		}

	  }

	changeField(){

		var value = this.loginFormMobileOtp.get('MobileNumber').value;

		if(value.includes('_') || value == ' '){

		  this.isValidMobileNumber = false;

		}else{

		  this.isValidMobileNumber = true;

		}

	  }

		returndataentrypage() {

			this.ShowDataEntryDialog = true;
		}

		closeForgetPassword() {
			this.forgotPasswordDialogVisibility = false;
		}
		closeForgetUsername() {
			this.forgotUserDialogVisibility = false;
		}

	// Timer


    timerCount(Type: string) {

      this.interval = setInterval(() => {

        if(this.leftTime === 0) {

        //   this.leftTime--;

        //   var today = new Date();

        //   this.startTime = today.getMinutes() + ':' + today.getSeconds();
		if(Type == "emailOTP")
		{
			this.emailsendresponse = "";
			this.startTimeCounter = "00:00";
			this.isValidEmailId = true;
			this.sendOTPText = "Resend OTP"
			this.validateCommEmail();
		}
		else{
			this.mobilesendresponse = "";
			this.startTimeCounter = "00:00";
			this.isValidEmailId = true;
			this.sendMobileOTPText = "Resend OTP"
			this.validateCommEmail();
		}
        } else {

          this.leftTime--;

        }

        this.startTimeCounter = this.transform(this.leftTime);

      }, 1000)

    }

	mobiletimerCount(Type: string) {

		this.mobileOtpinterval = setInterval(() => {

		  if(this.mobileOtpleftTime === 0) {

			  this.mobilesendresponse = "";
			  this.startTimeCounter = "00:00";
			  this.isMobileOTPSent = false;
			  this.sendMobileOTPText = "Resend OTP"
			  this.enableMobileButton();
			  //this.changeField();

		  } else {

			this.mobileOtpleftTime--;

		  }

		  this.mobileOtpstartTimeCounter = this.transform(this.mobileOtpleftTime);

		}, 1000)

	  }

    transform(value: number) {

      const hours: number = Math.floor(value/3600);

      const minutes: number = Math.floor((value % 3600)/60);

      return ('00' + minutes).slice(-2) + ':' + ('00' + Math.floor(value - minutes * 60)).slice(-2)

    }

	closeAuthResetPwd() {
		this.modalMessageRestPwd = false;
	}

	getPreferredLanguage(){
		this.activityService.getNothing().subscribe(res => {
		}).add(() => {
		const payload = {
			employeeId: this.loginEmployee.EmployeeId
		};
		this.accountService.getNewPreferredLanguage(payload).subscribe(res => {
			this.employeePreferredLanguageId = res;
			this.selectedLanguage = this.employeePreferredLanguageId > 0 ? this.employeePreferredLanguageId : 0;
			this.selectedLang = this.profileLanguageList.find(l => l.value == this.selectedLanguage);
			this.ShowMobileEntryDialog = false;
			this.showLanguageLoader = false;
			this.showLanguagePreference = true;
		}, error => {
			this.employeePreferredLanguageId = 0;
		});
	});
	}
}
