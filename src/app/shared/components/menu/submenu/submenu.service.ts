import { Injectable, SkipSelf, Optional } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class SubmenuService {
  disabled = false;
  level$ = new BehaviorSubject<number>(1);
  // subMenuOpen$ = new BehaviorSubject<boolean>(false);
  open$ = new BehaviorSubject<boolean>(false);
  mouseEnterLeave$ = new Subject<boolean>();
  subIndent$ = new BehaviorSubject<number>(16);
  constructor(@SkipSelf() @Optional() private _hostSubmenuSer: SubmenuService) {
    if (_hostSubmenuSer) {
      this._setLevel(_hostSubmenuSer.level$.value + 1);
    }
  }

  private _setLevel(value: number): void {
    this.level$.next(value);
  }

  setOpenState(state: boolean) {
    this.open$.next(state);
  }

  setMouseEnterState(value: boolean): void {
    if (!this.disabled) {
      this.mouseEnterLeave$.next(value);
    }
  }

  setSubIndent(v: number): void {
    this.subIndent$.next(v);
  }
}
