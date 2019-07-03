import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  SimpleChanges,
  SimpleChange,
  OnChanges,
  EmbeddedViewRef
} from '@angular/core';

@Directive({
  selector: '[zStringTemplateOutlet]'
})
export class StringTemplateOutletDirective implements OnChanges {
  @Input()
  zStringTemplateOutletContext: any = null;

  @Input()
  set zStringTemplateOutlet(v: string | TemplateRef<any>) {
    if (v instanceof TemplateRef) {
      this._isTemplate = true;
      this._inputTemplate = v;
    } else {
      this._isTemplate = false;
    }
  }

  private _isTemplate: boolean = false;
  private _inputTemplate: TemplateRef<any> | null = null;
  private _inputViewRef: EmbeddedViewRef<any> | null = null;
  private _defaultViewRef: EmbeddedViewRef<void> | null = null;
  constructor(private _viewContainer: ViewContainerRef, private _defaultTemplate: TemplateRef<void>) {}

  private _inputType(v: string | TemplateRef<any>): 'template' | 'string' {
    if (v instanceof TemplateRef) {
      return 'template';
    }
    return 'string';
  }

  private _hasContextChanged(ctxChange: SimpleChange): boolean {
    const prevCtxKeys = Object.keys(ctxChange.previousValue || {});
    const currCtxKeys = Object.keys(ctxChange.currentValue || {});

    if (prevCtxKeys.length === currCtxKeys.length) {
      for (const k of currCtxKeys) {
        if (!prevCtxKeys.includes(k)) {
          return true;
        }
      }
      return false;
    }
    return true;
  }

  private _shouldRecreateView(changes: SimpleChanges): boolean {
    const { zStringTemplateOutletContext, zStringTemplateOutlet } = changes;
    let isRecreate = false;
    if (zStringTemplateOutlet) {
      if (zStringTemplateOutlet.firstChange) {
        isRecreate = true;
      } else {
        const preType = this._inputType(zStringTemplateOutlet.previousValue);
        const curType = this._inputType(zStringTemplateOutlet.currentValue);
        isRecreate = !(preType === 'string' && curType === 'string');
      }
    }
    const isContextRecreate = zStringTemplateOutletContext && this._hasContextChanged(zStringTemplateOutletContext);
    return isContextRecreate || isRecreate;
  }

  recreateView(): void {
    if (this._isTemplate) {
      if (!this._inputViewRef) {
        if (this._inputTemplate) {
          this._inputViewRef = this._viewContainer.createEmbeddedView(
            this._inputTemplate,
            this.zStringTemplateOutletContext
          );
        }
      }
    } else {
      if (!this._defaultViewRef) {
        if (this._defaultTemplate) {
          this._defaultViewRef = this._viewContainer.createEmbeddedView(
            this._defaultTemplate,
            this.zStringTemplateOutletContext
          );
        }
      }
    }
  }

  private _updateExistingContext(v: any): void {
    for (const k of Object.keys(v)) {
      this._inputViewRef!.context[k] = this.zStringTemplateOutletContext[k];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const recreate = this._shouldRecreateView(changes);
    if (recreate) {
      if (this._viewContainer) {
        this._viewContainer.clear();
        this._defaultViewRef = null;
        this._inputViewRef = null;
      }
      this.recreateView();
    } else {
      if (this._inputViewRef && this.zStringTemplateOutletContext) {
        this._updateExistingContext(this.zStringTemplateOutletContext);
      }
    }
  }
}
