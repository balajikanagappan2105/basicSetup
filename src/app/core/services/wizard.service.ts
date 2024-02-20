import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class WizardService {

	constructor(private http: HttpService) { }

	getEmployeeDependents(payload): Observable<any> {
		return this.http.put('Dependent/GetEmployeeDependentDetails', payload);
	}

	getRelationshipTypes(): Observable<any> {
		return this.http.get('AuthorizedCaller/GetRelationshipTypes');
	}

	getSubrelationship(payload): Observable<any> {
		return this.http.get('Dependent/GetDependentSubTypes', payload);
	}
	getWizardSlideVerbiageText(payload): Observable<any> {
		return this.http.put('Employee/GetWizardSlideVerbiage', payload);
	}

	updateSingleDependent(payload): Observable<any> {
		return this.http.post('Dependent/UpdateDependent', payload);
	}

	updateDependents(payload): Observable<any> {
		return this.http.post('Dependent/UpdateMultipleDependent', payload);
	}

	getDependentVerification(payload): Observable<any> {
		return this.http.put('Dependent/GetDependentVerification', payload);
	}

	getDependentAndVerificationRequirements(payload): Observable<any> {
		return this.http.put('Dependent/GetDependentAndVerificationRequirements', payload);
	}

	getSurveyQuestionnaire(payload): Observable<any> {
		return this.http.get('survey/GetSurveyQuestionnaire', payload);
	}

	retakeSurveyUpdate(payload): Observable<any> {
		return this.http.post('Survey/RetakeSurveyUpdate', payload);
	}

	createEmployeeQuestionnaireResponse(payload): Observable<any> {
		return this.http.post('Survey/CreateEmployeeQuestionnaireResponse', payload);
	}

	getDependentDocument(payload): Observable<any> {
		return this.http.put('Dependent/GetDependentDocument', payload);
	}

	getWizardSummary(payload): Observable<any> {
		return this.http.put('Dependent/GetWizardSummary', payload);
	}

	getWizardSlideTypes(): Observable<any> {
		return this.http.get('Employee/GetWizardSlideTypes');
	}

	getCompletedWizards(payload): Observable<any> {
		return this.http.put('Employee/GetCompletedWizards', payload);
	}

	submitWizardSlides(payload): Observable<any> {
		return this.http.post('Employee/SubmitWizardSlides', payload);
	}

	getEmployeeQuestionairres(payload): Observable<any> {
		return this.http.get('Survey/GetEmployeeQuestionairres', payload);
	}

	getPreviousSlideSurveyQuestionnaire(payload): Observable<any> {
		return this.http.get('Survey/GetPreviousSlideSurveyQuestionnaire', payload);
	}

	createEmployeePackage(payload): Observable<any> {
		return this.http.post('Employee/CreateEmployeePackage', payload);
	}


	getSelfDeclaredReasonsList(payload): Observable<any> {
		return this.http.put('Dependent/GetSelfDeclaredReasonsList',payload);
	}

	getDependentSubTypeList(): Observable<any> {
		return this.http.get('Dependent/GetDependentSubTypeList');
	}

	completeSurvey(payload): Observable<any> {
		return this.http.post('Survey/CompleteSurvey', payload);
	}

	updateEmployeeQuestionnaire(payload): Observable<any> {
		return this.http.post('Survey/UpdateEmployeeQuestionnaire', payload);
	}

	MapEmployeeQuestionnaire(payload): Observable<any> {
		return this.http.post('Survey/MapEmployeeQuestionnaire', payload);
	}

	getSurveySlideResponse(payload): Observable<any> {
		return this.http.post('Survey/GetSurveySlideResponse', payload);
	}

	getDependentSurveyQuestionnaire(payload): Observable<any> {
		return this.http.get('survey/GetDependentSurveyQuestionnaire', payload);
	}

	getClientDependentSubTypes(payload): Observable<any> {
		return this.http.put('Dependent/GetClientDependentSubTypes', payload);
	}

	getDocumentTypeRelationshipMap(payload): Observable<any> {
		return this.http.put('Dependent/GetDocumentTypeRelationshipMap', payload);
	}

	downloadSurveyAffidavit(payload): Observable<any> {
		return this.http.get('survey/DownloadSurveyAffidavit', payload);
	}

	getSurveyPDF(payload): Observable<any> {
		return this.http.post('survey/GenerateSurveyPDF', payload);
	}

	updateDependentSubType(payload): Observable<any> {
		return this.http.post('Dependent/UpdateDependentSubType', payload);
	}

	getSurveyOutcomeConfig(payload): Observable<any[]> {
		return this.http.get('survey/GetSurveyOutcomeConfig', payload);
	}

	completeQuickStart(payload): Observable<any> {
        return this.http.post('Survey/CompleteQuickStart', payload);
    }
}
