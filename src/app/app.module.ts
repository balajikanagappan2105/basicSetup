import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';

import { DeviceDetectorService } from 'ngx-device-detector';
import { HttpService } from './core/services/http.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { EmailActivationComponent } from './modules/email-activation/email-activation.component';
import { ErrorPageComponent } from './modules/error-page/error-page.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@NgModule({
	declarations: [
		AppComponent,
		EmailActivationComponent,
		ErrorPageComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		HttpClientModule,
		AppRoutingModule,
		CoreModule,
		SharedModule,
		ConfirmDialogModule,
		DialogModule,
		OverlayPanelModule,
		//DeviceDetectorModule.forRoot()
		// HttpClientXsrfModule.withOptions({
		// 	cookieName: 'XSRF-TOKEN',
		// 	headerName: 'X-XSRF-TOKEN'
		// }),
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: HttpService, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
