import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable()
export class ClassnameService {
  private _classMap = {};
  private _renderer: Renderer2 = this._rendererFactory2.createRenderer(null, null);

  constructor(private _rendererFactory2: RendererFactory2) {}

  updateClassName(el: HTMLElement, classMap: object): void {
    this._removeClass(el, this._classMap, this._renderer);
    this._classMap = { ...classMap };
    this._addClass(el, this._classMap, this._renderer);
  }

  private _addClass(el: HTMLElement, classMap: object, renderer: Renderer2): void {
    for (const i in classMap) {
      if (classMap.hasOwnProperty(i)) {
        if (classMap[i]) {
          renderer.addClass(el, i);
        }
      }
    }
  }

  private _removeClass(el: HTMLElement, classMap: object, renderer: Renderer2): void {
    for (const i in classMap) {
      if (classMap.hasOwnProperty(i)) {
        renderer.removeClass(el, i);
      }
    }
  }
}
