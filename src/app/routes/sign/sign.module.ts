import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignRoutingModule } from './sign-routing.module';
import { SignComponent } from './sign.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [SignComponent],
  imports: [CommonModule, SharedModule, SignRoutingModule],
  exports: [],
})
export class SignModule {}
