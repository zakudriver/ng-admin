import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesRoutingModule } from './routes-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { ArticleComponent } from './article/article.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [NotFoundComponent, ArticleComponent],
  imports     : [CommonModule, RoutesRoutingModule, SharedModule],
  exports     : [],
})
export class RoutesModule {
}
