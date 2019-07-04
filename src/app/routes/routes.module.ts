import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesRoutingModule } from './routes-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, RoutesRoutingModule, SharedModule],
  exports: []
})
export class RoutesModule {}
