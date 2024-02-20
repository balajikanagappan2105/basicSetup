import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidation } from 'src/app/core/services/passwordvalidation';
import { ITooltipView } from '../../models/tooltipview.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ChangePasswordService } from 'src/app/core/services/changepassword.service';
//import { typeWithParameters } from '@angular/compiler/esm2020/src/compiler_util';
import { Employee } from '../../models/employee.model';
import { Auditor } from '../../models/auditor';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ActivityService } from 'src/app/core/services/activity.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  providers: [ChangePasswordService]
})
export class ChangePasswordComponent implements OnInit {
  @Output() closePopup: EventEmitter<any> = new EventEmitter();

  changePasswordForm: UntypedFormGroup;
	modalMessage: any = { Message: "", CSSClass: "", Visibility: false };
	passwordTooltip: ITooltipView = {
		MinCharacter: { Text: "Min 8 characters", Style: "", IsValid: false },
		UpperCase: { Text: "Uppercase characters (A-Z)", Style: "", IsValid: false },
		LowerCase: { Text: "Lowercase characters (a-z)", Style: "", IsValid: false },
		Numbers: { Text: "Numbers (0-9)", Style: "", IsValid: false },
		SpecialCharacters: { Text: "Special characters (e.g. , ! $ # @ %)", Style: "", IsValid: false }
	};
  prevPWD: string = '';
  newPWD: string = '';
  confirmPWD: string = '';
  isPWDNotMatch: string = '';
	employee:Employee;
	account: any;
	users: any;
	showLoader: boolean;
	public get getPWDRegExp(): RegExp {
		return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
	}

  auditor: any;
  auditors: Auditor[];
	userName: string;
	resetlogin: any;

  showOldPassword : boolean = false;
  showNewPassword : boolean = false;
  showConfirmPassword : boolean = false;

  constructor(public router: Router,
		private fb: UntypedFormBuilder, private changePasswordService: ChangePasswordService,
		private authService: AuthenticationService,
		public accountService: AccountService,
		private authorizationService: AuthorizationService,
		private activityService : ActivityService) {
            this.createForm();
        }

  ngOnInit() {
    this.prevPWD = "";
    this.newPWD = "";
    this.confirmPWD = "";
	this.activityService.getAuthNothing().subscribe(res => {}).add(()=>{
		const payload1 = {
			//UserName: this.loginForm.get('Username').value,
			employeeId : this.authService.getEmployeeId,
			// newPassword: this.prevPWD,
			// oldPassword: this.newPWD
		};
		this.authorizationService.GetEmployeeUser(payload1).subscribe(res => {
			this.resetlogin = res;
			// console.log(this.resetlogin);
		});
	});
	}

  createForm() {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword
    })
  }

  onModalMessageClose() {
		if (this.modalMessage.CSSClass === "alert-success") {
			this.router.navigate(['/login']);
		} else {
			this.modalMessage.Visibility = false;
		}
	}
  onCancelClick() {
		this.changePasswordForm.reset();
		this.closePopup.emit();
	}
  onSubmit() {

    // this.auditor.Password = this.newPWD;

		this.showLoader = true;
		const payload = {
			clientId: this.authService.getClientId,
			employeeId: this.authService.getEmployeeId,
			oldPassword: this.prevPWD,
			newPassword: this.newPWD
			// oldPassword: this.changePasswordForm.get('oldPassword').value,
			// newPassword: this.changePasswordForm.get('password').value
		};
		const payloadLogout = {
			LastName: this.authService.getLoggedInUserLastName,
			ConsovaPIN: this.authService.getEmployeeId,
			EmployeeSSN: this.authService.getEmployeeSSN,
			Token: this.authService.getAuthToken
		};
		this.changePasswordService.changePassword(payload).subscribe(res => {
			if (res.ResponseStatus) {
				this.authorizationService.logoutUser(payloadLogout);
				this.authService.resetJWTInfoModel();
				this.authService.clearLocalStorage();
				this.router.navigate(['/login']);
			// if(this.password == this.confirmPassword) {
			// 	this.isPWDNotMatch = 'Your password has been successfully updated';
			// } else {
			// 	if(this.oldPassword) {
			// 	this.isPWDNotMatch = 'The current password you have entered is incorrect';
			// }
			// }
		}
			// 	if(this.oldPassword != '') {
			// 		this.isPWDNotMatch = 'Entered current password is wrong';
			// 	} else{
			// 		if(this.password !== this.confirmPassword){
			// 			this.isPWDNotMatch = 'Passwords do not match';
			// 		} else{
			// 			this.isPWDNotMatch = '';
			// 			if(this.oldPassword === this.password){
			// 				this.isPWDNotMatch = 'Current and new passwords should not be the same';
			// 			} else{
			// 				this.isPWDNotMatch = '';
			// 			}
			// 		}
			// 	}
			// }
		}, err => {
			this.isPWDNotMatch = 'Change password not completed';
			this.showLoader = false;
		})
  }

	comparePwd(){
    if(this.prevPWD != '' && this.resetlogin.Password !== this.prevPWD) {
      this.isPWDNotMatch = 'Entered current password is wrong';
    } else{
      if(this.newPWD !== this.confirmPWD){
        this.isPWDNotMatch = 'Passwords do not match';
      } else{
        this.isPWDNotMatch = '';
        if(this.prevPWD === this.newPWD){
          this.isPWDNotMatch = 'Current and new passwords should not be the same';
        } else{
          this.isPWDNotMatch = '';
        }
      }
    }
  }
	isPWDValid(password: string): boolean{
    if (!this.getPWDRegExp.test(password)){
      return false;
    } else {
      return true;
    }
  }
	cancelFunction() {
		this.closePopup.emit();
    this.isPWDNotMatch='';
    this.prevPWD='';
    this.newPWD='';
    this.confirmPWD='';

    this.passwordTooltip.MinCharacter.IsValid = false;
    this.passwordTooltip.MinCharacter.Style = '';
    this.passwordTooltip.UpperCase.IsValid = false;
    this.passwordTooltip.UpperCase.Style = '';
    this.passwordTooltip.LowerCase.IsValid = false;
    this.passwordTooltip.LowerCase.Style = '';
    this.passwordTooltip.Numbers.IsValid = false;
    this.passwordTooltip.Numbers.Style = '';
    this.passwordTooltip.SpecialCharacters.IsValid = false;
    this.passwordTooltip.SpecialCharacters.Style = '';

  }
	getAuditDetails(){
		const payload = {
			employeeId: this.authService.getEmployeeId,
			clientId: this.authService.getClientId,
			SubClientList: []
		};

			this.accountService.getAccountDetail(payload).subscribe(data => {
				if (data) {
					this.auditors = data.Auditors;
				}
			})
	}

  getAuditors(id: number): string{
    if(id){
      const auditor = this.auditors && this.auditors.find(x => x.Id == id);
      if(auditor){
        return auditor.FirstName + ' ' + auditor.LastName;
      }else{
        return "";
      }
    }else{
      return "";
    }
  }

	getAccountDetails() {
		const payload = {
			employeeId: this.authService.getEmployeeId,
			clientId: this.authService.getClientId,
			SubClientList: []
		};
		this.accountService.getAccountDetail(payload).subscribe(data => {
			this.account = data;
			this.employee = data.Employee;
			this.auditors = data.Auditors;
		}, error => {});
	}
	onPasswordTexted(targetValue: string) {
		this.passwordTooltip.MinCharacter.Style = targetValue.length >= 8 ? "success-tick" : "";
		this.passwordTooltip.UpperCase.Style = targetValue.match(/[A-Z]/) ? "success-tick" : "";
		this.passwordTooltip.LowerCase.Style = targetValue.match(/[a-z]/) ? "success-tick" : "";
		this.passwordTooltip.Numbers.Style = targetValue.match(/[0-9]/) ? "success-tick" : "";
		this.passwordTooltip.SpecialCharacters.Style = targetValue.match(/\W|_/g) ? "success-tick" : "";
	}

}
