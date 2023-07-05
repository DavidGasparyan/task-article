import {Component, Input} from '@angular/core';
import {Article} from "../interfaces/article.interface";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
  @Input() article!: Article;

  get publishDate(): string {
    return new Date(this.article.publishDate).toISOString();
  }
}
