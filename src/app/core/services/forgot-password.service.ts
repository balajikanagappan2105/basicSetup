import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class ForgotPasswordService {

	constructor(private http: HttpService) { }

	public sendPasscode(payload): Observable<any> {
		return this.http.post('ResetPassword/ForgotPassword', payload);
	}

	public newPassword(payload): Observable<any> {
		return this.http.post('ResetPassword/SubmitNewPassword', payload);
	}

	public sendPasscodeIverify(payload): Observable<any> {
		return this.http.post('ResetPassword/ForgotPasswordIverify', payload);
	}

	public newPasswordIverify(payload): Observable<any> {
		return this.http.post('ResetPassword/SubmitNewPasswordIverify', payload);
	}

	public sendForgotPasswordOtp(payload): Observable<any> {
		return this.http.post('ResetPassword/SendForgotPasswordOTP', payload);
	}

	public verifyUserName(payload): Observable<any> {
		return this.http.post('ResetPassword/VerifyUserName', payload);
	}
}
