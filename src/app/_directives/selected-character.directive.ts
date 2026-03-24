import {Directive, ElementRef, inject, input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appSelectedCharacter]',
})
export class SelectedCharacterDirective implements OnChanges {

  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  color = input<string>('red');
  selected = input<boolean>(false);

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.highlight();
  }

  private highlight() {
    if (this.selected()) {
      this.renderer.setStyle(this.el.nativeElement, 'border', `3px solid ${this.color()}`);
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'border', 'unset');
    }
  }


}
