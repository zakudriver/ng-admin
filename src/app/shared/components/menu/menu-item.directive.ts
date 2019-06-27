import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { ClassnameService } from '@app/core/services/classname.service';
import { MenuService } from './menu.service';
import { InputBoolean } from '@app/core/util/convert';

@Directive({
  selector: '[zMenuItem]'
})
export class MenuItemDirective implements OnInit {
  @Input()
  @InputBoolean()
  selected: boolean = false;

  @Input()
  @InputBoolean()
  disabled: boolean = false;

  private _destroy$ = new Subject();
  constructor(private _eleRef: ElementRef, private _classnameSer: ClassnameService, private _menuSer: MenuService) {}

  private _setClassName() {
    const prefix = 'zyhh-menu';
    this._classnameSer.updateClassName(this._eleRef.nativeElement, {
      [`${prefix}`]: true,
      [`${prefix}-selected`]: this.selected,
      [`${prefix}-disabled`]: this.disabled
    });
  }

  ngOnInit(): void {
    this._setClassName();
  }
}
