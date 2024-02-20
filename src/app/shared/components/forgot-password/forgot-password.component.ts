import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordService } from 'src/app/core/services/forgot-password.service';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  @Output() onClosePopup = new EventEmitter<any>();
  @Output() forgotUserPassword = new EventEmitter<any>();

	emailAddress: string;
	mobileNumber : string;
	showLoader: boolean = true;
	modalMessageRestPwd: any = { Message: "", CSSClass: "", Visibility: false };
	passwordResetForm: UntypedFormGroup;
	otpVerifyForm: UntypedFormGroup;
	usernameForm: UntypedFormGroup;
    isValidEmail : boolean = false;
	isValidMobileNumber : boolean = false;
	showVerifyPassword : boolean = false;
	showPasswordReset : boolean = false;
	isValidEmailOTP : boolean = false;
	leftTime: number = 120;
    interval;
    startTime: any;
    startTimeCounter: any;
	SendOtpText: string;
	showVerificationLoader: boolean = false;
    employeeId: number = 0;
	showResetPassword: boolean = false;
	enableResendOTP : boolean = false;
	userName : string;

  constructor(private fb: UntypedFormBuilder,public router: Router, private forgotPwd: ForgotPasswordService,
	private authService: AuthenticationService,private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.emailAddress = "";
		this.showLoader = false;
		this.modalMessageRestPwd = { Message: "", CSSClass: "", Visibility: false };

	this.usernameForm = this.fb.group({
		username: ['',Validators.required]
	});

	this.passwordResetForm = this.fb.group({
		emailAddress: ['',Validators.compose([Validators.required, Validators.email, Validators.pattern(this.authService.getEmailRegExp)])],
		mobileNumber: ['',[Validators.required,Validators.minLength(10)]]
	});

	this.otpVerifyForm = this.fb.group({
		emailOtp: ['',[Validators.required,Validators.minLength(6)]]
	});


  }

  onClose(closeParent: boolean) {
		if (closeParent)
			this.onClosePopup.emit();
		else
			this.modalMessageRestPwd = { Message: "", CSSClass: "", Visibility: false };
	}

	verifyUserName(){
		this.showLoader = true;
		this.modalMessageRestPwd = { Message: "", CSSClass: "", Visibility: false };

		this.userName = this.usernameForm.get('username').value;
		this.userName = this.userName.trim();

		const payload = {
			UserName: this.userName
		};

		this.forgotPwd.verifyUserName(payload).subscribe(res => {
			if (res.ResponseStatus) {
				this.showPasswordReset = true;
				//this.modalMessageRestPwd = { Message: "", CSSClass: "", Visibility: true };
			} else {
				this.showPasswordReset = false;
				this.modalMessageRestPwd = { Message: res.Message, CSSClass: "", Visibility: true };
			}
		}, err => {
			this.showPasswordReset = false;
			this.modalMessageRestPwd = { Message: "Provided UserName not found.", CSSClass: "", Visibility: true };
		}).add(() => {
			this.showLoader = false;
		});
	}

	forgotPassword() {
		// this.forgotUserPassword.emit(this.emailAddress);
		// this.showLoader = true;
		this.showLoader = true;
		this.modalMessageRestPwd = { Message: "", CSSClass: "", Visibility: false };

		this.emailAddress = this.passwordResetForm.get('emailAddress').value;
		this.mobileNumber = this.passwordResetForm.get('mobileNumber').value;
		var value = this.mobileNumber.replace(/\D/g, "");

		const payload = {
			email: this.emailAddress,
			MobileNumber : value,
			UserName : this.userName
		};

		this.forgotPwd.sendForgotPasswordOtp(payload).subscribe(res => {
			if (res.ResponseStatus) {
				this.showVerifyPassword = true;
				this.employeeId = res.EmployeeId;
				this.enableResendOTP = false;
				this.leftTime = 120;
				this.startTimeCounter = "02:00";
				this.timerCount("emailOTP");
				//this.modalMessageRestPwd = { Message: "", CSSClass: "", Visibility: true };
			} else {
				this.modalMessageRestPwd = { Message: res.Message, CSSClass: "", Visibility: true };
			}
		}, err => {
			this.modalMessageRestPwd = { Message: "Provide correct email id to send you the password reset link.", CSSClass: "", Visibility: true };
		}).add(() => {
			this.showLoader = false;
		});
	}

	validateCommEmail():any
	{
		if(this.passwordResetForm.get('emailAddress').valid)
		this.isValidEmail = true;
		else
		this.isValidEmail = false;
		// if(this.passwordResetForm.get('mobileNumber').valid)
		// this.isValidMobileNumber = true;
		if(this.isValidEmail || this.isValidMobileNumber)
		return true;
		else
		return false;
	}

	validateUserName():any
	{
		if(this.usernameForm.get('username').valid)
		return true;
		else
		return false;
	}

	changeField(){
		this.passwordResetForm.get('emailAddress').setValue('');
		var value = this.passwordResetForm.get('mobileNumber').value;
		if(value && value.replace(/\D/g, "").length > 9){
		  this.isValidMobileNumber = true;
		}else{
		  this.isValidMobileNumber = false;
		}
		//console.log('v1',this.isValidMobileNumber)
		// if(value.includes('_') || value == ' '){
		//   this.isValidMobileNumber = false;
		// }else{
		//   this.isValidMobileNumber = true;
		// }
		// this.changeField();
	  }
    timerCount(Type: string) {

	this.interval = setInterval(() => {
			if(this.leftTime === 0) {
			this.startTimeCounter = "00:00";
			this.enableResendOTP = true;
			} else {
			this.leftTime--;
			}
			this.startTimeCounter = this.transform(this.leftTime);

		}, 1000);
	}

	transform(value: number) {

	const hours: number = Math.floor(value/3600);

	const minutes: number = Math.floor((value % 3600)/60);

	return ('00' + minutes).slice(-2) + ':' + ('00' + Math.floor(value - minutes * 60)).slice(-2)

	}

	validateCommEmailOTP(){

		var value = this.otpVerifyForm.get('emailOtp').value;
		if(value == ' ' || value.length != 6){

		  this.isValidEmailOTP = false;

		}else{

		  this.isValidEmailOTP = true;

		}
	}

	verifyemailOtp()
	{
		this.showVerificationLoader = true;
		var otp = this.otpVerifyForm.get('emailOtp').value;
		const payload = {
			ConsovaPIN: this.employeeId,
			OTP : otp
		}
		this.authorizationService.validateOTP(payload).subscribe( res=>{
			if(res.ResponseStatus){
				this.showVerificationLoader = false;
				this.showVerifyPassword = false;
				this.showResetPassword = true;
			} else {
				this.showVerificationLoader = false;
				this.modalMessageRestPwd = { Message: res.Message, CSSClass: "", Visibility: true };
			}
		}, err => {
			this.showVerificationLoader = false;
			this.modalMessageRestPwd = { Message: "Provided correct otp to reset your password", CSSClass: "", Visibility: true };
		});
	}

	paseteEmailOTP(event: ClipboardEvent) {
		let clipboardData = event.clipboardData;
		let pastedText = clipboardData.getData('text');
		pastedText = pastedText.trim();
		this.otpVerifyForm.controls.emailOtp.setValue(pastedText);
	 	//this.validateCommEmailOTP();
	}
}

