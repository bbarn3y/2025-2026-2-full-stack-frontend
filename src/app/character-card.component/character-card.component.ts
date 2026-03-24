import {Component, input, Input, output} from '@angular/core';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {Character} from '../_models/character.model';
import {NamePipe} from '../_pipes/name-pipe';

@Component({
  selector: 'app-character-card',
  imports: [
    NzCardModule,
    NzIconModule,
    NamePipe
  ],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.less',
})
export class CharacterCardComponent {
  // @Input() character: Character;
  character = input.required<Character>();

  characterSelected = output<Character>();

  constructor() {}

}
