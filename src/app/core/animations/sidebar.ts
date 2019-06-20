import { animate, state, style, transition, trigger } from '@angular/animations';

export const sidebarAnimate = [trigger('logoKine', [
  state('open', style({
    width: '200px'
  })),
  state('close', style({
    width: '64px'
  })),
  transition('open <=> close', [
    animate(220)
  ])
])];
