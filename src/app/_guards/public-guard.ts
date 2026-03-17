import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {UserService} from '../_services/user.service';
import {APP_ROUTES} from '../app.routes';

export const publicGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  return userService.isLoggedIn()
    ? router.createUrlTree(['/', APP_ROUTES.lobby])
    : true;
};
