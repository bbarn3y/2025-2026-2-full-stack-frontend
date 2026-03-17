import { Component } from '@angular/core';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {CommonModule, NgFor} from '@angular/common';
import {NzEmptyComponent} from 'ng-zorro-antd/empty';
import {NzIconModule} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-character-listing',
  imports: [
    CommonModule,
    NzCardComponent,
    NzCardMetaComponent,
    NzEmptyComponent,
    NzIconModule,
    // NgFor
  ],
  templateUrl: './character-listing.component.html',
  styleUrl: './character-listing.component.less',
})
export class CharacterListingComponent {

  mockCharacters: { name: string }[] = [
    {
      name: 'Mage Máté'
    },
    {
      name: 'Warrior Vazul'
    }
  ]

}
