import { Directive, ElementRef, RendererFactory2, Renderer2 } from '@angular/core';

@Directive({
  selector: '[z-vim]',
  host: {
    '(input)': 'onInput($event)'
  }
})
export class VimDirective {
  private renderer: Renderer2 = this.rendererFactory2.createRenderer(null, null);

  constructor(private eleRef: ElementRef, private rendererFactory2: RendererFactory2) {}

  private mount() {
    this.renderer.setAttribute(this.eleRef.nativeElement, 'contenteditable', 'true');
    this.renderer.addClass(this.eleRef.nativeElement, 'z-vim');
  }

  onInput(e: InputEvent) {
    console.log((e.target as any).innerText);
  }

  ngOnInit(): void {
    this.mount();
  }
}
