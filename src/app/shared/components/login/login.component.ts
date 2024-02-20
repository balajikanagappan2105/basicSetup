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
import { ITooltipView } from '../../models/tooltipview.model';
import { TooltipModule } from 'primeng/tooltip';
import { ScriptService } from 'src/app/core/services/script.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	providers: [ConfirmationService, ForgotPasswordService, TranslatePipe,ScriptService]
})
export class LoginComponent implements OnInit {
	showData: any;
	loginForm: UntypedFormGroup;
	submitted = false;
	modalMessage: any = { Message: '', CSSClass: '', Visibility: false };
	modalMessageUser: any = { Message: '', CSSClass: '', Visibility: false };
	modalMessageRestPwd: any = { Message: '', CSSClass: '', Visibility: false };
	showLoginPage: boolean = false;
	showLoader: boolean = true;
	enableMobileOTPButton: boolean = false;
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
	leftTime: number = 600;
    interval;
    startTime: any;
    startTimeCounter: any;
	passwordIncorrect :string;
	mobileOtpleftTime: number = 600;
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
	emailfailuremessage: string;
	mobilesuccessmessage: string;
	mobileerrormessage: string;
	accounterrormessage: string;
	showAccountSetupLoader: boolean;
	showaccountsetup: boolean;
	showAccountCreation: boolean;
	showemailverification: boolean;
	showmobileverification: boolean;
	showlanguage: boolean;
	showLanguagePreferenceLoader: boolean;
	showEmailVerificationLoader: boolean;
	showMobileVerificationLoader: boolean;
	loginEmployeeData: any;
	showGoGreen:boolean;
	empData:any;
	isBypassMobileNumber: boolean = false;
	showLoginFormPassword : boolean  = false;
	showAccountPassword : boolean  = false;
	showAccountConfirmPassword : boolean  = false;
	showCreateAccountVideo : boolean = false;
	showForgetPasswordVideo : boolean = false;
	showPINVideo : boolean = false;
	enableEmailConfirmation : boolean = false;
	enableMobileConfirmation : boolean = false;

	passwordTooltip: ITooltipView = {
		MinCharacter: { Text: "Min 8 characters", Style: "", IsValid: false },
		UpperCase: { Text: "Uppercase characters (A-Z)", Style: "", IsValid: false },
		LowerCase: { Text: "Lowercase characters (a-z)", Style: "", IsValid: false },
		Numbers: { Text: "Numbers (0-9)", Style: "", IsValid: false },
		SpecialCharacters: { Text: "Special characters (e.g. , ! $ # @ %)", Style: "", IsValid: false }
	};

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
		private forgotPwd: ForgotPasswordService, public translateServicePref: TranslateService, public translatePipe: TranslatePipe, public scriptService : ScriptService ) {

		// const UserName = this.actRoute.snapshot.queryParams.username;
		// const Password = this.actRoute.snapshot.queryParams.password;

		if ((this.actRoute.snapshot.queryParams && this.actRoute.snapshot.queryParams.token && this.actRoute.snapshot.queryParams.token.length > 0)) {
			this.showLoginPage = false;
			let paramVal = { Token: this.actRoute.snapshot.queryParams.token };

			this.isSSORedirect = true;
			this.errorLogger.logError({ message: 'Token Param Received: ' + this.actRoute.snapshot.queryParams.token });

			setTimeout(() => {
				//this.validateAuthToken(paramVal);
				this.validateAuthenticationDetails(paramVal);
			}, 10);

			// if(paramVal.Token == undefined)
			// {
			// 	this.userName = UserName;
			// 	const payload = {
			// 		UserName: UserName,
			// 		Password: Password
			// 	};

			// 	this.authorizationService.login(payload).subscribe(res => {
			// 		if(!res.Status){
			// 			this.modalMessage = { Message: res.Token, CSSClass: 'text-danger', Visibility: true };
			// 		}else{
			// 			//this.userName = this.loginForm.get('Username').value;
			// 			this.validateAuthenticationDetails(res)
			// 		}
			// 	}, err => {
			// 	});

			// }
			// else{

			// }


			this.showLoader = false;
		} else {
			this.showLoginPage = true;
		}

		this.showLoginFormPassword = false;
		this.showAccountPassword = false;
		this.showAccountConfirmPassword = false;
	}

	ngOnInit() {
		window["isLoginSuccess"] = "false";
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
		this.startTimeCounter = "10:00";
		this.isValidEmailId = true;
		this.mobileOtpstartTimeCounter= "10:00";
		this.sendOTPText = "Send Authentication Code";
		this.sendMobileOTPText = "Send Authentication Code";
		this.isSuccessMessage = false;
		this.emailsuccessmessage = "";
		this.emailerrormessage ="";
		this.emailfailuremessage = "";
		this.mobilesuccessmessage = "";
		this.mobileerrormessage ="";
		this.accounterrormessage ="";
		this.showGoGreen = false;

		if (this.authService.isUserAuthorized)
		{
			window["isLoginSuccess"] = "true";
			// console.log(window["isLoginSuccess"])
			this.router.navigate(['dashboard']);
		}
		else
		{
			// window["isChatbotMinimised"] = "false";
			// window["isLoginSuccess"] = "false";

			// var head = document.getElementById("spd-busns-spt");
			// if(head)
			// {
			// 	if(head.hasAttribute("data-bot-hash"))
			// 	{
			// 		var attr = head.getAttribute("data-bot-hash");
			// 		if(attr == "a802430f3980829107d2a31227e19f791d23fbcb")
			// 		{
			// 			location.reload()
			// 		}
			// 	}
			// }
			//location.reload()
			this.scriptService.loadScript('preloginbot');
		}
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
			Username: ['', Validators.required],
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
			bypassMobileCheckbox : ['',Validators.required]
			// MobileNumber: ['', Validators.required],

		})
		this.loginFormaccountsetup = this.fb.group({
			Username: ['', Validators.required],
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
			UserName: this.loginForm.get('Username').value.trim(),
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
				this.userName = this.loginForm.get('Username').value.trim();
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
		{
			window["isLoginSuccess"] = "true";
			this.router.navigate(['dashboard']);
			// setTimeout(() => {
			// 	window.location.reload();
			// }, 3000);
		}
	}

	createForm() {
		// this.loginForm = this.fb.group({
		// 	Username: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern(this.authService.getEmailRegExp)])]
		// })
		this.loginForm = this.fb.group({
			Username: ['', Validators.required],
			Password: ['', Validators.required]
		});
	}
	showFirstTimeUser() {
		// this.showFirstTimeRegister = true;
		// this.showLoader = false;
		this.showLoginPage = false;
		this.showFirstTimeRegister = true;
		this.loginFormregister.reset();

	}

	onSubmitUser() {
		//window.scrollTo(0,0);
		//this.showAccountCreation = false;
		this.showAccountCreationLoader = true;
		// this.showaccountsetup = true;
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

			}else if (res.ResponseStatus)
			{
				const payload = {
					employeeId: this.authService.getEmployeeId || this.loginForm.value.ConsovaPIN || this.consovaPin || this.loginFormregister.value.ConsovaPIN
				};
				this.authorizationService.validateEmployeeLogin(payload).subscribe(r => {
					if (!r.ResponseStatus) {
						this.modalMessage = {Message: r.Message, CSSClass: 'text-danger', Visibility: true};

						this.showLoader = false;
						this.showAccountCreationLoader = false;
						this.showFirstTimeRegister = false;
					}else if(res.ResponseStatus && res.Message != ''){
						this.modalMessage = {Message: res.Message, CSSClass: 'text-danger', Visibility: true};

						this.showLoader = false;
						this.showAccountCreationLoader = false;
						this.showFirstTimeRegister = false;
					}else{
						this.showLoader = false;
						this.showAccountCreationLoader = false;
						this.showFirstTimeRegister = false;
						this.consovaPin = authParam.ConsovaPIN;
						this.showAccountSetup = true;
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
		this.loginEmployee = [];
		this.loginEmployee =  this.authService.getEmpDetails(response.Token);

		if(this.loginEmployee.Id > 0)
		{
			const payload = {
				ConsovaPIN: this.loginEmployee.Id
			};

			this.authorizationService.validateAuthDeatils(payload).subscribe(res => {

				var empdata = this.authService.getEmpDetails(response.Token);
				this.enableEmailConfirmation = empdata.EnableEmailConfirmation === 'true' ? true : false;
				this.enableMobileConfirmation = empdata.EnablePhoneConfirmation === 'true' ? true : false;
				this.checkEmployeeGoGreen(empdata);

				if(this.enableEmailConfirmation == false && this.enableMobileConfirmation == false)
				{
					this.validateAuthToken(response);
				}
				else
				{
					this.updateAuthenticationDetails(res,response);
				}

			}, err => {

			})
		}

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
			this.authResponse = authresponse;

			this.loginFormOtp.setValue({
				emailAddress: this.loginEmployeeData && this.loginEmployeeData.ContactEmail ? this.loginEmployeeData.ContactEmail : '',
				emailOtp : "",
				greenCheckbox: true
			});

			this.loginFormMobileOtp.setValue({
				MobileNumber: this.loginEmployeeData && this.loginEmployeeData.CellPhone ? this.loginEmployeeData.CellPhone : '',
				mobileOtp: "",
				bypassMobileCheckbox : false
			});

			if(response.isEmailVerified == true || this.enableEmailConfirmation == false)
			{
				this.showMobileDataEntry();
			}
			else{
				this.loginFormOtp.setValue({
					emailAddress: response.Email ? response.Email : '',
					emailOtp : "",
					greenCheckbox: true
				});

				this.loginFormMobileOtp.setValue({
					MobileNumber: response.MobileNumber ? response.MobileNumber : '',
					mobileOtp: "",
					bypassMobileCheckbox : false
				});
				this.ShowDataEntryDialog = true;
			}

			this.showAccountSetup = false;
			this.showLoginPage = false;
			this.showAccountSetupLoader = false;
		}
	}


	sendEmailOtp()
	{
		this.showEmailVerificationLoader = true;
		this.emailsuccessmessage = "";
		this.emailerrormessage = "";
		this.emailfailuremessage = "";
		var email = this.loginFormOtp.get('emailAddress').value;
		// const payload = {
		// 	UserName: this.loginForm.get('Username').value || this.userName || this.actRoute.snapshot.queryParams.username,
		// 	//UserName: this.loginFormOtp.get('emailAddress').value,
		// 	Email : this.loginFormOtp.get('emailAddress').value
		// }
		const payload = {
			ConsovaPIN: this.loginEmployee.Id,
			Email : this.loginFormOtp.get('emailAddress').value
		}
		this.authorizationService.sendEmailOTP(payload).subscribe( res=>{
			if(res.Message == 'Please check the entered Email Address') {
				this.emailfailuremessage = res.Message;
			} else {
			this.emailsuccessmessage = res.Message;
			this.isValidEmailId = false;
			this.validateCommEmail();
			this.leftTime = 600;
			this.startTimeCounter = "10:00";
			this.timerCount("emailOTP");
			}
			this.showEmailVerificationLoader = false;
		}), err => {
			this.showEmailVerificationLoader = false;
			this.emailerrormessage = err.Message;
		}
	}

	resendEmailOtp()
	{
		this.showEmailVerificationLoader = true;
		const payload = {
			//UserName: this.loginForm.get('Username').value,
			//UserName: this.userName || this.actRoute.snapshot.queryParams.username,
			ConsovaPIN: this.loginEmployee.Id,
			Email : this.loginFormOtp.get('emailAddress').value
		}
		this.authorizationService.resendEmailOTP(payload).subscribe( res=>{
			this.emailsendresponse = res.Message;
			this.showEmailVerificationLoader = false;
		}), err => {
			this.showEmailVerificationLoader = false;
		}
	}

	sendMobileOtp()
	{
		this.showMobileVerificationLoader = true;
		this.mobilesuccessmessage = "";
		this.mobileerrormessage = "";

		const payload = {
			//UserName: this.loginForm.get('Username').value,
			//UserName: this.userName || this.actRoute.snapshot.queryParams.username,
			ConsovaPIN: this.loginEmployee.Id,
			MobileNumber : this.loginFormMobileOtp.get('MobileNumber').value
		}
		this.authorizationService.sendMobileOTP(payload).subscribe( res=>{

			this.mobilesuccessmessage = res.Message;
			this.isMobileOTPSent = true;
			this.mobileOtpleftTime = 600;
			this.mobileOtpstartTimeCounter = "10:00";
			this.mobiletimerCount('mobileotp');
			this.enableMobileButton();
			this.showMobileVerificationLoader = false;
			//this.changeField();
		}), err => {
			this.showMobileVerificationLoader = false;
			this.mobileerrormessage = err.Message;
		}
	}

	resendMobileOtp()
	{
		this.showMobileVerificationLoader = true;
		const payload = {
			//UserName: this.loginForm.get('Username').value,
			//UserName: this.userName,
			ConsovaPIN: this.loginEmployee.Id,
			MobileNumber : this.loginFormMobileOtp.get('MobileNumber').value
		}
		this.authorizationService.resendMobileOTP(payload).subscribe( res=>{
			this.mobilesendresponse = res.Message;
			this.showMobileVerificationLoader = false;
		}), err => {
			this.showMobileVerificationLoader = false;
		}
	}


	verifyemailOtp()
	{
		this.showEmailVerificationLoader = true;
		this.emailsuccessmessage = "";
		this.emailerrormessage ="";
		//var OTP = this.loginFormMobile.get('EmailOtp').value;
		//var email = this.emailAddress;
		var OTP = this.emailOtp;
		const payload = {
			//UserName: this.loginForm.get('Username').value,
			//UserName: this.userName || this.actRoute.snapshot.queryParams.username,
			ConsovaPIN: this.loginEmployee.Id,
			OTP : this.loginFormOtp.get('emailOtp').value
		}
		this.authorizationService.validateOTP(payload).subscribe( res=>{
			//this.emailverifyresponse = res.Message;
				this.loginFormMobileOtp.setValue({
					MobileNumber:  this.loginEmployeeData && this.loginEmployeeData.CellPhone ? this.loginEmployeeData.CellPhone : '',
					mobileOtp: null,
					bypassMobileCheckbox : false
				});

				if(this.loginEmployeeData && this.loginEmployeeData.CellPhone){
					this.isValidMobileNumber = true;
					this.isMobileOTPSent = false;
				}


			if(res.ResponseStatus == true)
			{
				this.emailsuccessmessage = res.Message;
				this.isEmailOTPVerfied = true;
				this.updateEmail();
				//this.showMobileDataEntry();
			}
			else
			{
				this.emailerrormessage = res.Message;

			}
			//this.ShowMobileEntryDialog = true;
			this.showEmailVerificationLoader = false;
		}), err => {
			this.showEmailVerificationLoader = false;
			this.emailerrormessage   = err.Message;
		}
	}

	verifyemobileOtp()
	{
		this.showMobileVerificationLoader = true;
		this.mobilesuccessmessage = "";
		this.mobileerrormessage = "";

		var OTP = this.loginFormMobileOtp.get('mobileOtp').value;
		const payload = {
			//UserName: this.loginForm.get('Username').value,
			//UserName: this.userName,
			ConsovaPIN: this.loginEmployee.Id,
			OTP : OTP
		}
		this.authorizationService.validateOTP(payload).subscribe( res=>{
			//this.mobileverifyresponse = res.Message;
			if(res.ResponseStatus == true)
			{
				// this.mobilesuccessmessage = res.Message;
				this.isMobileOTPVerfied = true;
				this.updateUserDetails();
			}
			else
			{
				this.mobileerrormessage = res.Message;
			}
			this.showMobileVerificationLoader = false;
		}), err => {
			this.showMobileVerificationLoader = false;
			this.mobileerrormessage = err.Message;
		}
	}
	showMobileDataEntry()
	{
		// this.showmobileverification = true;
		// this.ShowDataEntryDialog = false;

		var checkboxValue = this.loginFormOtp.get('greenCheckbox').value;
		if( this.showGoGreen == true)
		{
			const payload = {
				//UserName : this.userName,
				EmployeeId : this.loginEmployee.Id,
				Email : this.loginFormOtp.get('emailAddress').value
			}

			this.authorizationService.updatePaperLessOption(payload).subscribe( res=>{
				if(res.ResponseStatus ==  true)
				{
					this.ShowDataEntryDialog = false;
					this.showAccountSetup = false;
					if(this.enableMobileConfirmation == true){
						this.ShowMobileEntryDialog = true;
					}
					else
					{
						this.validateAuthToken(this.authResponse);
					}
				}
			}), err => {

			}
		}
		else
		{
			this.ShowDataEntryDialog = false;
			this.showAccountSetup = false;
			if(this.enableMobileConfirmation == true){
				this.ShowMobileEntryDialog = true;
			}
			else
			{
				this.validateAuthToken(this.authResponse);
			}
		}

	}

	updateUserDetails()
	{
		// this.showlanguage = true;
		// this.ShowMobileEntryDialog = false;
		this.showLanguageLoader = true;
		var mobileNumber = this.loginFormMobileOtp.get('MobileNumber').value
		var value = mobileNumber.replace(/\D/g, "");
		const payload = {
			ConsovaPIN: this.loginEmployee.Id,
			//Email : this.loginFormOtp.get('emailAddress').value,
			MobileNumber : value
		}
		this.authorizationService.updateMobileNumer(payload).subscribe( res=>{
			// this.mobilesuccessmessage = res.Message;
			this.isAuthenticationCompleted = res.ResponseStatus;
			//this.ShowMobileEntryDialog = false;

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
		this.showFirstTimeRegister = false;
		this,this.showLoginPage = true;
	}

	createAccount(){
		this.showAccountSetupLoader = true;
		// this.ShowDataEntryDialog = true;
		// this.showAccountSetup = false;
		this.accounterrormessage = "";
		var password = this.loginFormaccountsetup.get('Password').value;
		var ConfirmPassword = this.loginFormaccountsetup.get('ConfirmPassword').value;

		if(password === ConfirmPassword)
		{
			const payload ={
				EmployeeId : this.consovaPin ,
				UserName : this.loginFormaccountsetup.get('Username').value.trim(),
				Password : password
			}

			this.authorizationService.createNewAccount(payload).subscribe( res=>{
				if(res.ResponseStatus ==true)
				{
					this.loginForm.setValue({
						Username: this.loginFormaccountsetup.get('Username').value,
						Password : this.loginFormaccountsetup.get('Password').value
					})
					const payload1 = {
						ConsovaPIN: this.authService.getEmployeeId || this.loginForm.value.ConsovaPIN || this.consovaPin || this.loginFormregister.value.ConsovaPIN
					};
					this.authorizationService.getLoginEmployee(payload1).subscribe(res => {
						this.loginEmployeeData = res;
						this.loginFormOtp.setValue({
							emailAddress: this.loginEmployeeData && this.loginEmployeeData.ContactEmail ? this.loginEmployeeData.ContactEmail : '',
							emailOtp: null,
							greenCheckbox: true
						});
						this.onSubmit();
					})

				}
				else
				{
					this.accounterrormessage = res.Message;
					this.showAccountSetupLoader = false;
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
		this.showLanguagePreferenceLoader = true;
		var empdata = this.authService.getEmpDetails(this.authResponse.Token);
		const payload = {
			// ClientId: this.loginEmployee.ClientId.toString(),
			// EmployeeId: this.loginEmployee.EmployeeId.toString(),
			ClientId: empdata.ClientId.toString(),
			EmployeeId: empdata.Id.toString(),
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

					this.showLanguagePreferenceLoader = false;
				}, err => { });
				//this.loginNewUser();
				this.validateAuthToken(this.authResponse);

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
			this.showLanguagePreferenceLoader = false;
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

		var empdata = this.authService.getEmpDetails(this.authResponse.Token);

		const payload = {
			'employeeId' : empdata.Id,
			'clientId': empdata.ClientId,
			'subClientId': empdata.SubClientId ? empdata.SubClientId : 0
		};
		var languageType = 0;

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
			for(let i=0; i<languages.length; i++){
				this.profileLanguageList.push({ label: languages[i].LanguageType.Name, value: languages[i].LanguageTypeId });
			}

			if(this.profileLanguageList.length > 1)
			{
				this.getPreferredLanguage();
			}
			else{
				this.validateAuthToken(this.authResponse);
			}

		}, err => {
			this.showLanguageLoader = false;
		});

		// this.authorizationService.getLoginEmployeeDetails(payload1).subscribe(res => {
		// 	this.loginEmployee = res;
		// 	const payload = {
		// 		'clientId': this.loginEmployee.ClientId,
		// 		'subClientId': this.loginEmployee.SubClientId ? this.loginEmployee.SubClientId : 0
		// 	};
		// 	var languageType = 0;

		// 	//this.translateServicePref.getLanguage(payload).subscribe(res => {
		// 	this.translateServicePref.getCommunicationLanguage(payload).subscribe(res => {
		// 		this.showLoader = false;
		// 		if(res && res.length > 0){
		// 			res = res.sort((a,b) => a.LanguageTypeId - b.LanguageTypeId);
		// 		}
		// 		var language = res.filter(s => s.LanguageType.Name == 'English')
		// 		languageType = (language && language.length) ? language[0].LanguageTypeId : result[0].LanguageType;
		// 		let languages = (res && res.length) ? JSON.parse(JSON.stringify(res)) : JSON.parse(JSON.stringify(result));
		// 		this.profileLanguageList = [];
		// 		for(let i=0; i<languages.length; i++){
		// 			this.profileLanguageList.push({ label: languages[i].LanguageType.Name, value: languages[i].LanguageTypeId });
		// 		}

		// 		if(this.profileLanguageList.length > 1)
		// 		{
		// 			this.getPreferredLanguage();
		// 		}
		// 		else{
		// 			this.loginNewUser();
		// 		}

		// 	}, err => {
		// 		this.showLanguageLoader = false;
		// 	});
		// }, err => {
		// 	this.errorLogger.logError({ message: 'home-router.components.ts onAllDisclaimerAccepted() => ' + JSON.stringify(err) });
		// })
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

	enableMobileButton(){
		if((this.isValidMobileNumber && !this.isMobileOTPSent) && !this.isBypassMobileNumber)
		{
			this.enableMobileOTPButton = false;
		}
		else
			this.enableMobileOTPButton = true;

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
		if(value && value.replace(/\D/g, "").length > 9){
		  this.isValidMobileNumber = true;
		}else{
		  this.isValidMobileNumber = false;
		}

		// if(value.includes('_') || value == ' '){
		//   this.isValidMobileNumber = false;
		// }else{
		//   this.isValidMobileNumber = true;
		// }
		// this.changeField();
		this.enableMobileButton();
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
			clearInterval(this.interval);
			if(Type == "emailOTP")
			{
				this.emailsendresponse = "";
				this.startTimeCounter = "00:00";
				this.isValidEmailId = true;
				this.sendOTPText = "Resend Authentication Code"
				this.validateCommEmail();
			}
			else{
				this.mobilesendresponse = "";
				this.startTimeCounter = "00:00";
				this.isValidEmailId = true;
				this.sendMobileOTPText = "Resend Authentication Code"
				this.validateCommEmail();
			}
        } else {

          this.leftTime--;
		  this.startTimeCounter = this.transform(this.leftTime);
        }
      }, 1000)

    }

	mobiletimerCount(Type: string) {

		this.mobileOtpinterval = setInterval(() => {

		  if(this.mobileOtpleftTime === 0) {
			  clearInterval(this.mobileOtpinterval);
			  this.mobilesendresponse = "";
			  this.startTimeCounter = "00:00";
			  this.isMobileOTPSent = false;
			  this.sendMobileOTPText = "Resend Authentication Code"
			  this.enableMobileButton();
			  //this.changeField();

		  } else {
			this.mobileOtpleftTime--;
			this.mobileOtpstartTimeCounter = this.transform(this.mobileOtpleftTime);
		  }

		}, 1000)

	  }

    transform(value: number) {
      const hours: number = Math.floor(value/3600);
      const minutes: number = Math.floor((value % 3600)/60);
      return ('00' + minutes).slice(-2) + ':' + ('00' + Math.floor(value - minutes * 60)).slice(-2);
    }

	closeAuthResetPwd() {
		this.modalMessageRestPwd = false;
	}

	getPreferredLanguage(){
		this.activityService.getAuthNothing().subscribe(res => {
		}).add(() => {
		var empdata = this.authService.getEmpDetails(this.authResponse.Token);
		const payload = {
			employeeId: empdata.Id
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

	disableNext(){
		let isDisable = true;
		var userName = this.loginFormaccountsetup.get('Username').value
		var password = this.loginFormaccountsetup.get('Password').value;
		var ConfirmPassword = this.loginFormaccountsetup.get('ConfirmPassword').value;
		if(password === ConfirmPassword)
		{
			isDisable = false;
		}
		if(!password || !ConfirmPassword || !userName)
		{
			isDisable = true;
		}
		if(this.loginFormaccountsetup.invalid){
			isDisable = true;
		}
		return isDisable;
	}

	onPasswordTexted(targetValue: string) {
		this.passwordTooltip.MinCharacter.Style = targetValue.length >= 8 ? "success-tick" : "";
		this.passwordTooltip.UpperCase.Style = targetValue.match(/[A-Z]/) ? "success-tick" : "";
		this.passwordTooltip.LowerCase.Style = targetValue.match(/[a-z]/) ? "success-tick" : "";
		this.passwordTooltip.Numbers.Style = targetValue.match(/[0-9]/) ? "success-tick" : "";
		this.passwordTooltip.SpecialCharacters.Style = targetValue.match(/\W|_/g) ? "success-tick" : "";
	}

	checkEmployeeGoGreen(empdata:any) {

		const payload = {
			employeeId: empdata.Id,
			clientId: empdata.ClientId
		};

		this.accountService.checkEmployeeGoGreen(payload).subscribe(arg => {
			this.showGoGreen = arg.ResponseStatus;
		}, err => {
		})

	}

	bypassMobileNumber()
	{
		var checkboxValue = this.loginFormMobileOtp.get('bypassMobileCheckbox').value;
		if(!checkboxValue)
		{
			this.isBypassMobileNumber = true;
		}
		else
		{
			this.isBypassMobileNumber = false;
		}
	}

	updateEmail()
	{
		// this.showlanguage = true;
		// this.ShowMobileEntryDialog = false;
		const payload = {
			ConsovaPIN: this.loginEmployee.Id,
			Email : this.loginFormOtp.get('emailAddress').value,
			MobileNumber : ""
		}
		this.authorizationService.updateEmail(payload).subscribe( res=>{
			// this.mobilesuccessmessage = res.Message;
			this.showMobileDataEntry();
		}), err => {
			this.showLoader = false;
			this.mobileerrormessage = err.Message;
		}
	}

	paseteMobileOTP(event: ClipboardEvent) {
		let clipboardData = event.clipboardData;
		let pastedText = clipboardData.getData('text');
		pastedText = pastedText.trim();
		this.loginFormMobileOtp.controls.mobileOtp.setValue(pastedText);
		this.validateCommMobileOTP();
	}

	paseteEmailOTP(event: ClipboardEvent) {
		let clipboardData = event.clipboardData;
		let pastedText = clipboardData.getData('text');
		pastedText = pastedText.trim();
		this.loginFormOtp.controls.emailOtp.setValue(pastedText);
	 	this.validateCommEmailOTP();
	}

	// paseteEmail(event: ClipboardEvent) {
	// 	let clipboardData = event.clipboardData;
	// 	let pastedText = clipboardData.getData('text');
	// 	pastedText = pastedText.trim();
	// 	this.loginFormOtp.controls.emailAddress.setValue(pastedText);
	// }

	texttrim(value)
	{
		let pastedText = value.trim();
		this.loginFormOtp.get('emailAddress').setValue(pastedText);
	}

	// showLoginPassword()
	// {
	// 	this.showLoginFormPassword = true;
	// }
}

