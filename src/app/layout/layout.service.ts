import { Injectable } from '@angular/core';

@Injectable()
export class LayoutService {
  isOpen = true;
  mode = 'side';
  isCollapsed = false;

  constructor() {}

  setCollapsedState(state: boolean) {
    this.isCollapsed = state;
  }
}
