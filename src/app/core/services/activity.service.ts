import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { IActivityLog } from 'src/app/shared/models/activity-log.model';
import { IActivityType } from 'src/app/shared/models/activity-type.model';

@Injectable({
	providedIn: 'root'
})
export class ActivityService {

	constructor(private http: HttpService) { }

	createActivity(payload: IActivityLog): Observable<any> {
		return this.http.post('Activity/CreateActivity', payload);
	}

	getActivityType(): Observable<IActivityType[]> {
		return this.http.get('Activity/GetActivityType');
	}

	getNothing(): Observable<any> {
		return this.http.get('Activity/GetNothing');
	}

	getAuthNothing(): Observable<any> {
		return this.http.get('Auth/GetNothing');
	}
}
