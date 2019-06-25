import { animate, state, style, transition, trigger } from '@angular/animations';

export const menuAnimate = [
  trigger('menu', [
    transition(':enter', [style({ height: 0 }), animate('1s', style({ height: 'auto' }))]),
    transition(':leave', [animate('1s', style({ height: 0 }))])
  ])
];
