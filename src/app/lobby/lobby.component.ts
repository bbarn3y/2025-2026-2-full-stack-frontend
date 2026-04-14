import {Component, inject} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {UserService} from '../_services/user.service';
import {routeToLogin} from '../_helpers/routing.helper';
import {Router} from '@angular/router';
import {CharacterListingComponent} from '../character-listing.component/character-listing.component';
import {NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import {CharacterEditorComponent} from '../character-editor.component/character-editor.component';

@Component({
  selector: 'app-lobby',
  imports: [
    CharacterListingComponent,
    NzButtonComponent,
    NzModalModule,
  ],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.less',
})
export class LobbyComponent {

  private readonly modalService: NzModalService = inject(NzModalService);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);

  logout() {
    this.userService.removeToken();
    routeToLogin(this.router);
  }

  openCharacterEditor() {
    this.modalService.create({
      nzTitle: 'Character creator',
      nzContent: CharacterEditorComponent,
      nzFooter: null
    })
  }

}
