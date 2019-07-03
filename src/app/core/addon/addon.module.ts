import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringTemplateOutletDirective } from './stringTemplateOutlet/string-template-outlet.directive';

@NgModule({
  declarations: [StringTemplateOutletDirective],
  imports: [CommonModule],
  exports: [StringTemplateOutletDirective]
})
export class AddonModule {}
