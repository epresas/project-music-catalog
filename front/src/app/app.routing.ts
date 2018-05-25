import { ModuleWithProviders } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';


import { UserEditComponent } from './components/user-edit/user-edit.component';

const appRoutes: Routes = [
	{path: '', component: UserEditComponent},
	{path: 'user-data', component: UserEditComponent},
	{path: '**', component: UserEditComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
