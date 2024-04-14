import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomeAdminComponent } from './views/admin/home/home.component';
import { HomeUserComponent } from './views/user/home/home.component';
import { authAdminGuard, authUserGuard, loginGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [loginGuard]},
    { path: 'admin/home', component: HomeAdminComponent, canActivate: [authAdminGuard] },
    { path: 'user/home', component: HomeUserComponent, canActivate: [authUserGuard] },
    { path: '**',   redirectTo: 'login', pathMatch: 'full' },
];
