import {Component, OnInit} from '@angular/core';
import {ArticlesService} from "../services/articles.service";
import {Article} from "../interfaces/article.interface";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  constructor(
    private readonly _articlesService: ArticlesService,
  ) {
  }

  articles: Article[] = [];

  ngOnInit() {
    this._articlesService.get();
    this._articlesService.articles.subscribe((articles: any) => {
      console.log(articles)
      this.articles = articles
    });
  }
}
