import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Character, CharacterClass} from '../_models/character.model';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {KeyValuePipe} from '@angular/common';
import {NzInputNumberComponent} from 'ng-zorro-antd/input-number';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {ValidatorService} from '../_services/validator.service';
import {CharacterService} from '../_services/character.service';
import {NZ_MODAL_DATA, NzModalRef} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-character-editor.component',
  imports: [
    NzFormModule,
    ReactiveFormsModule,
    NzSelectComponent,
    NzOptionComponent,
    KeyValuePipe,
    NzInputNumberComponent,
    NzButtonComponent,
    NzInputDirective
  ],
  templateUrl: './character-editor.component.html',
  styleUrl: './character-editor.component.less',
})
export class CharacterEditorComponent {

  private readonly characterService = inject(CharacterService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly nzModalData: { character?: Character } = inject(NZ_MODAL_DATA, { optional: true });
  private readonly nzModalRef = inject(NzModalRef);
  private readonly validatorService = inject(ValidatorService);

  characterForm: FormGroup<{
    name: FormControl<string>;
    image: FormControl<string>;
    characterClass: FormControl<CharacterClass>;
    maxHp: FormControl<number>;
  }>;

  private readonly originalCharacter = this.nzModalData?.character ?? null;

  constructor() {
    this.characterForm = this.fb.group({
      name: [this.originalCharacter?.name ?? '', [Validators.required, this.validatorService.fullNameValidator]],
      image: [this.originalCharacter?.image ?? '', [Validators.required]],
      characterClass: [this.originalCharacter?.characterClass ?? CharacterClass.MAGE, [Validators.required]],
      maxHp: [this.originalCharacter?.maxHp ?? 1, [Validators.required, Validators.min(1), Validators.max(12)]]
    }, {
      validators: [this.validatorService.maxHpByClassValidator]
    })
  }

  saveCharacter() {
    if (this.characterForm.invalid) {
      this.characterForm.markAllAsTouched();
      return;
    }

    const character = new Character(
      this.characterForm.controls.name.value,
      this.characterForm.controls.image.value,
      this.characterForm.controls.characterClass.value,
      this.characterForm.controls.maxHp.value,
    )

    if (this.originalCharacter) {
      this.characterService.editCharacter(this.originalCharacter.id, character);
    } else {
      this.characterService.addCharacter(character);
    }

    this.nzModalRef?.close()
  }

  protected readonly CharacterClass = CharacterClass;
}
