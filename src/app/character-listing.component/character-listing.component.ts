import {
  afterNextRender,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
  ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzEmptyComponent} from 'ng-zorro-antd/empty';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {CharacterCardComponent} from '../character-card.component/character-card.component';
import {CharacterService} from '../_services/character.service';
import {SelectedCharacterDirective} from '../_directives/selected-character.directive';
import {Character, ClassDetails} from '../_models/character.model';
import {NzInputModule} from 'ng-zorro-antd/input';
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs';

@Component({
  selector: 'app-character-listing',
  imports: [
    CharacterCardComponent,
    CommonModule,
    NzEmptyComponent,
    NzIconModule,
    NzInputModule,
    // NgFor,
    SelectedCharacterDirective
  ],
  templateUrl: './character-listing.component.html',
  styleUrl: './character-listing.component.less',
})
export class CharacterListingComponent {
  // @ViewChild('searchInput') searchInputEl !: HTMLInputElement;
  readonly searchInputEl = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  // readonly characterCardEl = viewChild<CharacterCardComponent>('characterCard');

  readonly ClassDetails = ClassDetails;
  private readonly characterService = inject(CharacterService);

  readonly characters = this.characterService.characters;

  // Filtering without debounce
  // readonly searchQuery = signal('');
  // readonly filteredCharacters = computed(() => {
  //   const query = this.searchQuery().toLowerCase();
  //   if (!query) return this.characters();
  //   return this.characters().filter(character => character.name.toLowerCase().includes(query))
  // })

  // Debounced filtering
  readonly searchQuery = signal('');
  readonly debouncedSearchQuery = signal('');
  readonly filteredCharacters = computed(() => {
    const query = this.debouncedSearchQuery().toLowerCase();
    if (!query) return this.characters();
    return this.characters().filter(character => character.name.toLowerCase().includes(query))
  })

  selectedCharacter?: Character;

  constructor() {
    // effect((onCleanup) => {
    //   const query = this.searchQuery();
    //
    //   const handle = setTimeout(() => {
    //     this.debouncedSearchQuery.set(query);
    //   }, 1000)
    //
    //   onCleanup(() => clearTimeout(handle));
    // });

    toObservable(this.searchQuery)
      .pipe(
        debounceTime(1000),
        takeUntilDestroyed(),
      )
      .subscribe(query => {
        this.debouncedSearchQuery.set(query)
      })

    afterNextRender(() => {
      this.searchInputEl()?.nativeElement.focus();
    })
  }

}
