import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { menuAnimate } from '@app/core/animations/menu';
import { IMenuTree } from '../interface';

@Component({
  selector: 'app-submenu',
  template: `
    <button class="menubtn" matRipple (click)="handleClick()" fmpBlackbox (fmpBlackboxChange)="change()">
      <span>{{ submenu.name }}</span>
    </button>
    <ul class="ul submenu" @menu *ngIf="isOpen && submenu.children">
      <li *ngFor="let i of submenu.children">
        <a class="a" [ngClass]="{ 'selected-color': isSelect }" [routerLink]="[i.path]">{{ i.name }}</a>
      </li>
    </ul>
  `,
  styleUrls: ['./submenu.component.styl', './submenu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: menuAnimate
})
export class SubmenuComponent implements OnInit, OnChanges {
  @Input()
  submenu: IMenuTree = {} as IMenuTree;

  @Input()
  selectedMenu: string = '';

  @Input()
  openKey: string[] = [];

  isSelect = false;
  isOpen = false;

  constructor() {}

  handleClick() {
    this.isOpen = !this.isOpen;
  }

  change() {
    console.log('change');
  }

  private _handleSelected(select: string) {
    this.isSelect = this.submenu.key === select;
  }

  private _handleOpen(opens: string[]) {
    this.isOpen = opens.some(i => i === this.submenu.key);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.openKey) {
      this._handleOpen(changes.openKey.currentValue);
    }

    if (changes.selectedMenu) {
      this._handleSelected(changes.selectedMenu.currentValue);
    }
  }
}
