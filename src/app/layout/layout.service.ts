import { Injectable } from '@angular/core';

@Injectable()
export class LayoutService {
  sidebarStatus = 'open';

  handleSidebar() {
    this.sidebarStatus = this.sidebarStatus === 'open' ? 'close' : 'open';
  }

  constructor() {}
}
