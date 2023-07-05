import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticleListComponent} from "./article-list.component";
import {ArticleListRoutingModule} from "./article-list-routing.module";
import {ArticleCreateModule} from "../article-create/article-create.module";
import {ArticleModule} from "../article/article.module";


@NgModule({
  declarations: [
    ArticleListComponent,
  ],
  imports: [
    CommonModule,
    ArticleCreateModule,
    ArticleListRoutingModule,
    ArticleModule,
  ],
})
export class ArticleListModule { }
