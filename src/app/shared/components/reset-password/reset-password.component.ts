import { Component, OnInit,Input,Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ForgotPasswordService } from 'src/app/core/services/forgot-password.service';
import { PasswordValidation } from 'src/app/core/services/passwordvalidation';
import { ITooltipView } from '../../models/tooltipview.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [ForgotPasswordService]
})
export class ResetPasswordComponent implements OnInit {

	@Input() employeeId : number;

  	resetPasswordForm: UntypedFormGroup;
	activationId: string;
	messageForUser: string;
	modalMessage: any = { Message: "", CSSClass: "", Visibility: false, ActionStatus: false };
	showLoader: boolean;
	passwordTooltip: ITooltipView = {
		MinCharacter: { Text: "Min 8 characters", Style: "", IsValid: false },
		UpperCase: { Text: "Uppercase characters (A-Z)", Style: "", IsValid: false },
		LowerCase: { Text: "Lowercase characters (a-z)", Style: "", IsValid: false },
		Numbers: { Text: "Numbers (0-9)", Style: "", IsValid: false },
		SpecialCharacters: { Text: "Special characters (e.g. , ! $ # @ %)", Style: "", IsValid: false }
	};
	showAccountPassword : boolean = false;
	showConfirmPassword : boolean = false;
  constructor(private router: Router,
		private fb: UntypedFormBuilder, public authService: AuthenticationService,
		private actRoute: ActivatedRoute, private resetPasswordService: ForgotPasswordService) {
			this.createForm();
		 }

  ngOnInit() {
	if (this.authService.isUserAuthorized) {
		this.authService.clearLocalStorage();
		this.authService.resetJWTInfoModel();
	}

	this.showLoader = false;

	// if (this.actRoute.snapshot.queryParams && this.actRoute.snapshot.queryParams.ActivationId && this.actRoute.snapshot.queryParams.ActivationId.length > 0) {
	// 	this.activationId = this.actRoute.snapshot.queryParams['ActivationId'];
	// } else {
	// 	this.modalMessage = { Message: "Reset password link is broken.\nPlease try again with correct reset link", CSSClass: "alert-danger", Visibility: true, ActionStatus: true };
	// }
  }

  createForm() {
		this.resetPasswordForm = this.fb.group({
			password: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(15)]],
			confirmPassword: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(15)]],
		}, {
			 validator: PasswordValidation.MatchPassword
		});
	}

	onPasswordTexted(targetValue: string) {
		this.passwordTooltip.MinCharacter.Style = targetValue.length >= 8 ? "success-tick" : "";
		this.passwordTooltip.UpperCase.Style = targetValue.match(/[A-Z]/) ? "success-tick" : "";
		this.passwordTooltip.LowerCase.Style = targetValue.match(/[a-z]/) ? "success-tick" : "";
		this.passwordTooltip.Numbers.Style = targetValue.match(/[0-9]/) ? "success-tick" : "";
		this.passwordTooltip.SpecialCharacters.Style = targetValue.match(/\W|_/g) ? "success-tick" : "";
	}

	redirectLogin() {
		// this.router.navigate(['/login']);
		window.location.href = window.location.origin;
	}
  onModalMessageClose() {
		if (this.modalMessage.ActionStatus) {
			this.redirectLogin();
			// window.location.reload();
		} else {
			this.modalMessage = { Message: "", CSSClass: "", Visibility: false, ActionStatus: false };
		}
	}

  onSubmit() {
    this.showLoader = true;

		const payload = {
			//CryptedActivationId: this.activationId,
			EmployeeId : this.employeeId,
			NewPassword: this.resetPasswordForm.get('password').value
		};

		this.resetPasswordService
			.newPasswordIverify(payload).subscribe(res => {
				if (res.ResponseStatus) {
					this.modalMessage = { Message: "Your password has been successfully updated.\nPlease click login using your new password.", CSSClass: "alert-success", Visibility: true, ActionStatus: true };
				} else {
					this.modalMessage = { Message: "User not found", CSSClass: "alert-danger", Visibility: true, ActionStatus: false };
				}
			}, err => {
				this.modalMessage = { Message: "User not found", CSSClass: "alert-danger", Visibility: true, ActionStatus: false };
			}).add(() => {
				this.showLoader = false;
			});
  }
}
