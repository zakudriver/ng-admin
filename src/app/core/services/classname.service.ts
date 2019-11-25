import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable()
export class ClassnameService {
  private classMap = {};
  private renderer: Renderer2 = this.rendererFactory2.createRenderer(null, null);

  constructor(private rendererFactory2: RendererFactory2) {}

  updateClassName(el: HTMLElement, classMap: object): void {
    this.removeClass(el, this.classMap);
    this.classMap = { ...classMap };
    this.addClass(el, this.classMap);
  }

  private addClass(el: HTMLElement, classMap: object): void {
    for (const i in classMap) {
      if (classMap.hasOwnProperty(i)) {
        if (classMap[i]) {
          this.renderer.addClass(el, i);
        }
      }
    }
  }

  private removeClass(el: HTMLElement, classMap: object): void {
    for (const i in classMap) {
      if (classMap.hasOwnProperty(i)) {
        this.renderer.removeClass(el, i);
      }
    }
  }
}
