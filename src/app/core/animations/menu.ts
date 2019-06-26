import { animate, state, style, transition, trigger } from '@angular/animations';

export const menuAnimate = [
  trigger('menu', [
    transition(':enter', [style({ height: '0', overflow: 'hidden' }), animate(200, style({ height: 'auto' }))]),
    transition(':leave', [animate(300, style({ height: 0 }))])
  ])
];
