import { Injectable } from '@angular/core';

@Injectable()
export class LayoutService {
  useSidebar = true;

  handleSidebar() {
    this.useSidebar = !this.useSidebar;
  }

  constructor() {
  }
}
