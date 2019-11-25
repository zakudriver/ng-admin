import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VimDirective } from './vim.directive';

@NgModule({
  declarations: [VimDirective],
  imports: [CommonModule],
  exports: [VimDirective]
})
export class VimModule {}
