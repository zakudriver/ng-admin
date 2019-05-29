import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutMainComponent } from './main/main.component';
import { HeaderComponent } from './main/header/header.component';
import { SidebarComponent } from './main/sidebar/sidebar.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [LayoutMainComponent, HeaderComponent, SidebarComponent],
  imports: [CommonModule, SharedModule],
  exports: [LayoutMainComponent],
})
export class LayoutModule {}
