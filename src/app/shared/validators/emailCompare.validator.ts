import { UntypedFormControl } from '@angular/forms';

export function EmailCompareValidator(confirmEmailInput: string) {
	let confirmEmailControl: UntypedFormControl;
	let emailControl: UntypedFormControl;

	return (control: UntypedFormControl) => {
		if (!control.parent) {
			return null;
		}

		if (!confirmEmailControl) {
			confirmEmailControl = control;
			emailControl = control.parent.get(confirmEmailInput) as UntypedFormControl;
			emailControl.valueChanges.subscribe(() => {
				confirmEmailControl.updateValueAndValidity();
			});
		}

		if (
			(emailControl.value && emailControl.value.toLocaleLowerCase()) !==
			(confirmEmailControl.value && confirmEmailControl.value.toLocaleLowerCase())
		) {
			return {
				notMatch: true
			};
		}
		return null;
	};
}
