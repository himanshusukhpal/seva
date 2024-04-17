import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";

import { AppService } from "../services/app.service";

export const authGaurd: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const appservice = inject(AppService);
  const isLoggedIn = appservice.isLoggedIn;
  if(!isLoggedIn) appservice.nav.navigateRoot('auth');
  return isLoggedIn;
};
export const reverseAuthGaurd: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const appservice = inject(AppService);
  const isLoggedIn = appservice.isLoggedIn;
  if(isLoggedIn) appservice.nav.navigateRoot('');
  return !isLoggedIn;
};
