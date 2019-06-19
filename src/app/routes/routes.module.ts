import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesRoutingModule } from './routes-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports     : [CommonModule, RoutesRoutingModule],
  exports     : [],
})
export class RoutesModule {
}
