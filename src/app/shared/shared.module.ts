import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PortalModule } from '@angular/cdk/portal';

import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ListboxModule } from 'primeng/listbox';
import { DialogModule } from 'primeng/dialog';
import { KeyFilterModule } from 'primeng/keyfilter';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { DateFormatPipe } from './pipes/datepipe';
import { GetIncompleteCodeDescriptionPipe } from './pipes/getIncompleteCodeDescription.pipe';
import { GetIncompleteCodesPipe } from './pipes/getIncompleteCodes.pipe';
import { GetIneligibleCodesPipe } from './pipes/getIneligibleCodes.pipe';
import { GetLetterForIncompletePipe } from './pipes/getLetterForIncomplete.pipe';
import { GetLetterForIneligiblePipe } from './pipes/getLetterForIneligible.pipe';
import { GetAuditorNamePipe } from './pipes/getAuditorName.pipe';
import { GetSelfDeclarationPipe } from './pipes/getSelfDeclaration.pipe';
import { GetRelationShipPipe } from './pipes/getRelationShip.pipe';
import { GetSurveyQuestionPipe } from './pipes/getSurveyQuestion.pipe';
import { SplitPipe } from './pipes/split.pipe';
import { TranslatePipe } from './pipes/translate.pipe';
import { RemoveDuplicatePipe } from './pipes/removeDuplicate.pipe';
import { ReplacePipe } from './pipes/replace.pipe';
import { GroupEventBenefitStatusPipe } from './pipes/group-event-benefit-status.pipe';
import { GetDocumentVerbiagePipe } from './pipes/getDocumentVerbiage.pipe';
import { GetSurveyVerbiagePipe } from './pipes/getSurveyVerbiage.pipe';
import { GetEventTypeStatusPipe } from './pipes/getEventTypeStatus.pipe';
import { GetCustomRuleStatusVerbiagePipe } from './pipes/getCustomRuleStatusVerbiage.pipe';
import { GetAnswerVerbiagePipe } from './pipes/getAnswerVerbiage.pipe';
import { FilterDocumentsByRelationtypePipe } from './pipes/filterDocumentsByRelationtype.pipe';
import { FilterDocumentsByRelationtypeMapPipe } from './pipes/filterDocumentsByRelationtypeMap.pipe';
import { CheckValuePipe } from './pipes/CheckValue.pipe';
import { SecureByPass } from './pipes/securebypass.pipe';
import { GetIncompleteCodeVerbiagePipe } from './pipes/getIncompleteCodeVerbiage.pipe';
import { GetPhoneNumberFormatPipe } from './pipes/getPhoneNumberFormat.pipe';
import { IncompleteVeribageByLanguagePipe } from './pipes/incompleteVeribageByLanguage.pipe';
import { ConvertFileSize } from './pipes/convertFileSize.pipe';

import { TableComponent } from './components/table/table.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MessageComponent } from './components/message/message.component';
import { LanguagePreferenceComponent } from './components/language-preference/language-preference.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { MenuComponent } from './components/menu/menu.component';
import { PrivacyPolicyPageComponent } from './components/privacy-policy-page/privacy-policy-page.component';
import { EmailViewComponent } from './components/email-view/email-view.component';
import { PrintViewComponent } from './components/print-view/print-view.component';
import { BreadcrumbBarComponent } from './components/breadcrumb-bar/breadcrumb-bar.component';
import { GetIneligibleCodeVerbiagePipe } from './pipes/getIneligibleCodeVerbiage.pipe';
import { GetClientEventTypeVerbiage } from './pipes/getClientEventTypeVerbiage.pipe';
import { GetBenefitVerbiage } from './pipes/getBenefitVerbiage.pipe';
import { GetStatusVerbiagePipe } from './pipes/getStatusVerbiage.pipe';
import { DropdownModule } from 'primeng/dropdown';
import { DateLanguagePipe } from './pipes/convertDateLanguage.pipe';
import { GetWizardVerbiagePipe } from './pipes/getWizardVerbiage.pipe';
import { GetDependentDefinitionVerbiagePipe } from './pipes/getDependentDefinitionVerbiage.pipe';
import { GetClientBenefitTypeVerbiage } from './pipes/getClientBenefitTypeVerbiage.pipe';
import { GetIneligibleCodeIdVerbiagePipe } from './pipes/getIneligibleCodeIdVerbiage.pipe';
import { GetRelationshipVerbiage } from './pipes/getRelationshipVerbiage.pipe';
import { GetSurveyStatusVerbiagePipe } from './pipes/getSurveyStatusVerbiage.pipe';
import { FilterIneligibleClientEventTypeMapsPipe } from './pipes/filterIneligibleClientEventTypeMaps.pipe';
import { GroupByPipe } from './pipes/group-by.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { MapArrayPropertyPipe } from './pipes/map-array-property.pipe';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ForgotuserComponent } from './components/forgotuser/forgotuser.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AccountSetupComponent } from './components/account-setup/account-setup.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { EmailDataEntryComponent } from './components/email-data-entry/email-data-entry.component';
import { MobileDataEntryComponent } from './components/mobile-data-entry/mobile-data-entry.component';
import { LanguagePreferenceEntryComponent } from './components/language-preference-entry/language-preference-entry.component';
import { NotificationComponent } from '../modules/home/notification/notification.component';


const COMPONENTS = [
	DateFormatPipe,
	ReplacePipe,
	GetIncompleteCodeDescriptionPipe,
	RemoveDuplicatePipe,
	GetIncompleteCodesPipe,
	GetIneligibleCodesPipe,
	GetLetterForIncompletePipe,
	GetLetterForIneligiblePipe,
	GetAuditorNamePipe,
	GroupEventBenefitStatusPipe,
	GetSelfDeclarationPipe,
	GetRelationShipPipe,
	GetSurveyQuestionPipe,
	SplitPipe,
	GetDocumentVerbiagePipe,
	TranslatePipe,
	TableComponent,
	LoaderComponent,
	MessageComponent,
	LanguagePreferenceComponent,
	GetSurveyVerbiagePipe,
	GetAnswerVerbiagePipe,
	GetEventTypeStatusPipe,
	GetCustomRuleStatusVerbiagePipe,
	CheckValuePipe,
	FilterDocumentsByRelationtypePipe,
	FilterDocumentsByRelationtypeMapPipe,
	FilterIneligibleClientEventTypeMapsPipe,
	GetIncompleteCodeVerbiagePipe,
	GetPhoneNumberFormatPipe,
	IncompleteVeribageByLanguagePipe,
	GetIneligibleCodeVerbiagePipe,
	GetStatusVerbiagePipe,
	DateLanguagePipe,
	SecureByPass,
	ConvertFileSize,
	GetWizardVerbiagePipe,
	GetDependentDefinitionVerbiagePipe,
	TopBarComponent,
	MenuComponent,
	FooterComponent,
	LoginComponent,
	PrivacyPolicyPageComponent,
	EmailViewComponent,
	PrintViewComponent,
	BreadcrumbBarComponent,
	GetClientEventTypeVerbiage,
	GetBenefitVerbiage,
	GetClientBenefitTypeVerbiage,
	GetIneligibleCodeIdVerbiagePipe,
	GetRelationshipVerbiage,
	GetSurveyStatusVerbiagePipe,
	GroupByPipe,
	FilterPipe,
	MapArrayPropertyPipe,
	CreateAccountComponent,
	AccountSetupComponent,
	EmailDataEntryComponent,
	MobileDataEntryComponent,
	LanguagePreferenceEntryComponent,
	NotificationComponent
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		ReactiveFormsModule,
		TableModule,
		InputTextModule,
		InputMaskModule,
		TooltipModule,
		ListboxModule,
		KeyFilterModule,
		DialogModule,
		BreadcrumbModule,
		PortalModule,
		DropdownModule,
		ConfirmDialogModule,
		OverlayPanelModule
	],
	declarations: [COMPONENTS, ResetPasswordComponent, ForgotPasswordComponent, ForgotuserComponent, ChangePasswordComponent, CreateAccountComponent, AccountSetupComponent, EmailDataEntryComponent, MobileDataEntryComponent, LanguagePreferenceEntryComponent],
	exports: [COMPONENTS, CommonModule, FormsModule]
})
export class SharedModule { }
