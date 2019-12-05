import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { FrontComponent } from './front/front.component';
import { AdminComponent } from './admin/admin.component';
import { SharedModule } from '@app/shared/shared.module';
import { UserComponent } from './admin/user/user.component';

@NgModule({
  declarations: [FrontComponent, AdminComponent, UserComponent],
  imports: [CommonModule, SettingRoutingModule, SharedModule]
})
export class SettingModule {}
