import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable()
export class ClassnameService {
  private _classMap = {};
  private _renderer: Renderer2 = this._rendererFactory2.createRenderer(null, null);

  constructor(private _rendererFactory2: RendererFactory2) {}

  updateClassName(el: HTMLElement, classMap: object): void {
    this.removeClass(el, this._classMap);
    this._classMap = { ...classMap };
    this.addClass(el, this._classMap);
  }

  private addClass(el: HTMLElement, classMap: object): void {
    for (const i in classMap) {
      if (classMap.hasOwnProperty(i)) {
        if (classMap[i]) {
          this._renderer.addClass(el, i);
        }
      }
    }
  }

  private removeClass(el: HTMLElement, classMap: object): void {
    for (const i in classMap) {
      if (classMap.hasOwnProperty(i)) {
        this._renderer.removeClass(el, i);
      }
    }
  }
}
