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
  selector: 'app-account-setup',
  templateUrl: './account-setup.component.html',
  styleUrls: ['./account-setup.component.scss'],
	providers: [ConfirmationService, ForgotPasswordService, TranslatePipe]
})
export class AccountSetupComponent implements OnInit {
	@Input() showData: any;
	accounterrormessage: string;
	showAccountSetupLoader: boolean;
	loginFormaccountsetup: UntypedFormGroup;
	showLoader: boolean;
	submitted: boolean;

	modalMessage: any = { Message: '', CSSClass: '', Visibility: false };
	modalMessageUser: any = { Message: '', CSSClass: '', Visibility: false };
	modalMessageRestPwd: any = { Message: '', CSSClass: '', Visibility: false };

	consovaPin : number;
	userName: string;
	authResponse: any;
	loginEmployee: any;
	showLoginPage: boolean;
	isSSORedirect: boolean;
	loginForm: UntypedFormGroup;

	constructor(private fb: UntypedFormBuilder,
		private router: Router,
		private authService: AuthenticationService,
		private authorizationService: AuthorizationService,
		private errorLogger: ErrorLoggerService,
		public activityService: ActivityService,
		public accountService: AccountService,
		private actRoute: ActivatedRoute,) {
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
		this.consovaPin = 0;
this.loginFormaccountsetup = this.fb.group({
			Username: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern(this.authService.getEmailRegExp)])],
			Password: ['', Validators.required],
			ConfirmPassword: ['',Validators.required]
		})
		this.showData = this.loginForm.value.ConsovaPIN;
		// console.log(this.showData);
		this.router.navigate(['accountsetup']);
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
				// this.loginFormOtp.setValue({
				// 	emailAddress: response.Email,
				// 	emailOtp : "",
				// 	greenCheckbox: false
				// })



			}
			if(response.MobileNumber != null)
			{
				//this.mobileNumber = response.MobileNumber;
				// this.loginFormMobileOtp.setValue({
				// 	MobileNumber: response.MobileNumber,
				// 	mobileOtp: ""
				// })
			}
			this.authResponse = authresponse;
			// this.ShowDataEntryDialog = true;
		}
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
	closeAuthUser() {

	}
	returndataentrypage() {

	}
	closeAuthResetPwd() {

	}
	returnsign() {

	}
}
