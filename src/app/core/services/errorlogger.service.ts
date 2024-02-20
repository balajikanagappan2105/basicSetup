import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
	providedIn: 'root'
})
export class ErrorLoggerService {

	constructor(private http: HttpService) { }

	private callErrorLogger(payload): Observable<any> {
		return this.http.post('Log/LogError', payload);
	}

	logError(payLoad) {
		this.callErrorLogger(payLoad).subscribe(errRes => {
		}, err => {
		}).add(() => {
		});
	}

}
