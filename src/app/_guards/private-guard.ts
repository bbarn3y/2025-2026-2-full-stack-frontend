import {CanActivateFn, Router} from '@angular/router';
import {UserService} from '../_services/user.service';
import {inject} from '@angular/core';
import {APP_ROUTES} from '../app.routes';

export const privateGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  return userService.isLoggedIn()
    ? true
    : router.createUrlTree(['/', APP_ROUTES.login]);
};
