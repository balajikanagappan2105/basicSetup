import { AbstractControl } from '@angular/forms';

export class PasswordValidation {
	static MatchPassword(absCtrl: AbstractControl) {
		let password = absCtrl.get('password').value; // to get value in input tag
		let confirmPassword = absCtrl.get('confirmPassword').value; // to get value in input tag
		if (password != confirmPassword) {
			absCtrl.get('confirmPassword').setErrors({ MatchPassword: true });
		} else {
			absCtrl.get('confirmPassword').setErrors(null);
		}
	}
}
