import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LobbyComponent} from './lobby/lobby.component';
import {privateGuard} from './_guards/private-guard';
import {publicGuard} from './_guards/public-guard';

export const APP_ROUTES = {
  login: 'login',
  lobby: 'lobby'
} as const;

export const routes: Routes = [
  {
    path: APP_ROUTES.login,
    component: LoginComponent,
    canActivate: [publicGuard]
  },
  {
    path: APP_ROUTES.lobby,
    component: LobbyComponent,
    canActivate: [privateGuard]
  },
  {
    path: '**',
    redirectTo: `/${APP_ROUTES.login}`
  }
];
