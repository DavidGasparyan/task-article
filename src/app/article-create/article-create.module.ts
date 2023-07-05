import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCreateComponent } from './article-create.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [
    ArticleCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  exports: [
    ArticleCreateComponent,
  ]
})
export class ArticleCreateModule { }
