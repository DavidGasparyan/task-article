import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCreateComponent } from './article-create.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ArticleCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ArticleCreateComponent,
  ]
})
export class ArticleCreateModule { }
