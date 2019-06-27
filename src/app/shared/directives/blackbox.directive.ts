import { Directive, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[fmpBlackbox]'
})
export class BlackboxDirective {
  @Input('fmpBlackbox') close: boolean = false;
  @Output('fmpBlackboxChange') closeChange = new EventEmitter();

  constructor() {}

  onClose() {
    document.addEventListener('click', (e: any) => {
      if (e.target.localName !== 'span') {
        this.close = false;
        this.closeChange.emit(this.close);
      }
    });
  }

  ngOnInit() {
    this.onClose();
  }
}
