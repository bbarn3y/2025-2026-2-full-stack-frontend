import {Component, EventEmitter, inject, input, Input, Output, output} from '@angular/core';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {Character} from '../_models/character.model';
import {NamePipe} from '../_pipes/name-pipe';
import {CharacterEditorComponent} from '../character-editor.component/character-editor.component';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {CharacterService} from '../_services/character.service';

@Component({
  selector: 'app-character-card',
  imports: [
    NzCardModule,
    NzIconModule,
    NzPopconfirmModule,
    NamePipe
  ],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.less',
})
export class CharacterCardComponent {
  // @Input() character: Character;
  character = input.required<Character>();

  // @Output() characterSelected: EventEmitter<Character> = new EventEmitter();
  characterSelected = output<Character>();

  protected readonly characterService: CharacterService = inject(CharacterService);
  private readonly modalService: NzModalService = inject(NzModalService);

  constructor() {}

  editCharacter() {
    this.modalService.create({
      nzTitle: `Edit ${this.character().name}`,
      nzContent: CharacterEditorComponent,
      nzData: {
        character: this.character()
      },
      nzFooter: null
    })
  }

}
