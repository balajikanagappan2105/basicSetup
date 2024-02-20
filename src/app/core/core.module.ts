import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

const COMPONENTS = [
];
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		ReactiveFormsModule,
		SharedModule
	],
	declarations: [COMPONENTS],
	exports: [COMPONENTS, CommonModule, FormsModule]
})
export class CoreModule { }
