import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {UserService} from '../services/user.service';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const loginService = inject(UserService);
  const router = inject(Router);
  const admin = sessionStorage.getItem("admin");
  if(loginService.checkLogin() && admin == "true"){
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }

};

export const authUserGuard: CanActivateFn = (route, state) => {
  const loginService = inject(UserService);
  const router = inject(Router);
  const admin = sessionStorage.getItem("admin");
  if(loginService.checkLogin() && admin == "false"){
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }

};

export const loginGuard: CanActivateFn = (route, state) => {
  const loginService = inject(UserService);
  const router = inject(Router);
  const admin = sessionStorage.getItem("admin");
  if(loginService.checkLogin()){
    admin == "true" ? router.navigate(['/admin/home']) : router.navigate(['/user/home'])
    return false;
  } else {
    return true;
  }
};
