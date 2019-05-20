import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutMainComponent } from './main/main.component';
import { HeaderComponent } from './main/header/header.component';
import { SidebarComponent } from './main/sidebar/sidebar.component';
import { LayoutSignComponent } from './sign/sign.component';

@NgModule({
  declarations: [
    LayoutMainComponent,
    HeaderComponent,
    SidebarComponent,
    LayoutSignComponent,
  ],
  imports: [CommonModule],
})
export class LayoutModule {}
