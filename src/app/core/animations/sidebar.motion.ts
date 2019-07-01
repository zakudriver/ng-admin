import { animate, state, style, transition, trigger } from '@angular/animations';

export const sidebarMotion = [
  trigger('sidebar', [
    state(
      'open',
      style({
        width: '220px'
      })
    ),
    state(
      'close',
      style({
        width: '64px'
      })
    ),
    transition('open <=> close', [animate(220)])
  ])
];
