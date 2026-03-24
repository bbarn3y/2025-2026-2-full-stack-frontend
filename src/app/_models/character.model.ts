export enum CharacterClass {
  MAGE = 'Mage',
  ROGUE = 'Rogue',
  WARRIOR = 'Warrior'
}

export class Character {
  id: string;
  name: string;
  image: string;
  characterClass: CharacterClass;
  maxHp: number;

  constructor(name: string, image: string, characterClass: CharacterClass, maxHp: number) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.image = image;
    this.characterClass = characterClass;
    this.maxHp = maxHp;
  }
}

export interface ClassDetail {
  color: string;
  maxHp: number;
}

// Pick Partial: interface User {   id: number;   name: string;   email: string;   isAdmin: boolean; } // Pick only 'id' and 'name'type UserPreview = Pick<User, 'id' | 'name'>;
// const user: UserPreview = {   id: 1,   name: "Alice"// email and isAdmin are excluded};
// Partial<{[k in CharacterClass]: ClassDetail }>
//  {[k in CharacterClass]: ClassDetail }
export const ClassDetails: Record<CharacterClass, ClassDetail> = {
  [CharacterClass.MAGE]: { color: 'blue', maxHp: 6},
  [CharacterClass.ROGUE]: { color: 'green', maxHp: 8},
  [CharacterClass.WARRIOR]: { color: 'red', maxHp: 12},
}

