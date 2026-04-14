import {effect, Injectable, signal} from '@angular/core';
import {Character, CharacterClass} from '../_models/character.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private readonly CHARACTER_STORAGE_KEY = 'characters';

  private readonly _characters = signal<Character[]>(this.readCharactersFromStorage());

  readonly characters = this._characters.asReadonly();

  constructor() {
    effect(() => {
      const characters = this._characters();
      this.saveCharacters(characters);
    });
  }

  addCharacter(character: Character): void {
    this._characters.set([...this._characters(), character]);
    // this.saveCharacters(this._characters());
  }

  editCharacter(id: string, character: Character): void {
    this._characters.update((characters) => characters.map(c => c.id === id ? {...character, id} : c));
    // this.saveCharacters(this._characters());
  }

  removeCharacters(id: string): void {
    this._characters.update((characters) => characters.filter(c => c.id !== id));
    // this.saveCharacters(this._characters());
  }

  private readCharactersFromStorage(): Character[] {
    // @todo Remove mock implementation.
    // return [
    //   new Character('Mage Máté', '/assets/classes/mage.webp', CharacterClass.MAGE, 5),
    //   new Character('Rogue Róbert', '/assets/classes/rogue.webp', CharacterClass.ROGUE, 7),
    //   new Character('Warrior Vazul', '/assets/classes/warrior.webp', CharacterClass.WARRIOR, 10),
    // ];

    const storageString = localStorage.getItem(this.CHARACTER_STORAGE_KEY);
    return storageString ? JSON.parse(storageString) : [];
  }

  private saveCharacters(characters: Character[]): void {
    localStorage.setItem(this.CHARACTER_STORAGE_KEY, JSON.stringify(characters));
  }
}
