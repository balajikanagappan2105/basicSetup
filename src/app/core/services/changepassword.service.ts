import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class ChangePasswordService {

	constructor(private http: HttpService) { }

	public changePassword(payload) {
		return this.http.post<any>('ResetPassword/ChangePasswordIverify', payload);
	}

}
