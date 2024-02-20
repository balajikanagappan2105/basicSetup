import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PrivacyPolicyPageComponent } from './shared/components/privacy-policy-page/privacy-policy-page.component';
import { EmailActivationComponent } from './modules/email-activation/email-activation.component';
import { ErrorPageComponent } from './modules/error-page/error-page.component';
import { ResetPasswordComponent } from 'src/app/shared/components/reset-password/reset-password.component';
import { AccountSetupComponent } from './shared/components/account-setup/account-setup.component';
import { CreateAccountComponent } from './shared/components/create-account/create-account.component';
import { EmailDataEntryComponent } from './shared/components/email-data-entry/email-data-entry.component';
import { MobileDataEntryComponent } from './shared/components/mobile-data-entry/mobile-data-entry.component';
import { LanguagePreferenceEntryComponent } from './shared/components/language-preference-entry/language-preference-entry.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent, data: { breadcrumb: 'Login', title: '' } },
	{ path: 'privacypolicynoauth', component: PrivacyPolicyPageComponent, data: { breadcrumb: 'Privacy Policy', title: 'Privacy Policy' } },
	{ path: 'paperlessemailactivation', component: EmailActivationComponent, data: { breadcrumb: 'Paperless Activation', title: 'Paperless Activation' } },
	{
		path: '',
		loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
		canActivate: [AuthGuard],
		canActivateChild: [AuthGuard],
		data: { breadcrumb: 'Dashboard', title: 'Dashboard' }
	},
	{ path: 'error', component: ErrorPageComponent, data: { breadcrumb: "", title: '' } },
	{ path: 'resetpassword', component: ResetPasswordComponent, data: { breadcrumb: "Reset Password", title: 'Reset Password', pageName: 'Reset Password' } },
	// {
	// 	path: 'dashboard',
	// 	loadChildren: './modules/home/home.module#HomeModule',
	// 	canActivate: [AuthGuard],
	// 	canActivateChild: [AuthGuard]
	// }
	// {
	// 	path: 'account',
	// 	loadChildren: './modules/account/account.module#AccountModule',
	// 	canActivate: [AuthGuard],
	// 	canActivateChild: [AuthGuard]
	// },
	{ path: 'acctcreation', component: CreateAccountComponent },
	{ path: 'accountsetup', component : AccountSetupComponent },
	{path: 'emaildataentry', component: EmailDataEntryComponent},
	{path: 'mobiledataentry', component: MobileDataEntryComponent},
	{path: 'langugae', component: LanguagePreferenceEntryComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
