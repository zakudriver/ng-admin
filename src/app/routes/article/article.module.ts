import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { ArticleRoutingModule } from './article-routing.module';

@NgModule({
  declarations: [ArticleComponent],
  imports: [CommonModule, ArticleRoutingModule]
})
export class ArticleModule {}
