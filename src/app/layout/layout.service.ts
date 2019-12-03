import { Injectable } from '@angular/core';

@Injectable()
export class LayoutService {
  mode = 'side';
  isCollapsed = false;
  sidebarWidth = '240px';
  collapsedWidth = '60px';

  constructor() {}

  setCollapsedState(state: boolean) {
    this.isCollapsed = state;
  }
}
