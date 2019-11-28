import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { FrontComponent } from './front/front.component';
import { AdminComponent } from './admin/admin.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [FrontComponent, AdminComponent],
  imports: [CommonModule, SettingRoutingModule, SharedModule]
})
export class SettingModule {}
