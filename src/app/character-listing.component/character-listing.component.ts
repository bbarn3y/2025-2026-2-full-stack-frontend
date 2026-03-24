import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzEmptyComponent} from 'ng-zorro-antd/empty';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {CharacterCardComponent} from '../character-card.component/character-card.component';
import {CharacterService} from '../_services/character.service';
import {SelectedCharacterDirective} from '../_directives/selected-character.directive';

@Component({
  selector: 'app-character-listing',
  imports: [
    CharacterCardComponent,
    CommonModule,
    NzEmptyComponent,
    NzIconModule,
    // NgFor,
    SelectedCharacterDirective
  ],
  templateUrl: './character-listing.component.html',
  styleUrl: './character-listing.component.less',
})
export class CharacterListingComponent {

  private readonly characterService = inject(CharacterService);

  readonly characters = this.characterService.characters;

}
