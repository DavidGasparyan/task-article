import {Component, OnInit} from '@angular/core';
import {ArticlesService} from "../services/articles.service";
import {Article} from "../interfaces/article.interface";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articlesPerPage = 3;
  currentPage = 1

  constructor(
    private readonly _articlesService: ArticlesService,
    public readonly _userService: UserService,
  ) {
  }

  articles: Article[] = [];
  displayedArticles: Article[] = [];

  ngOnInit() {
    this._articlesService.get();
    this._articlesService.articles
      .subscribe((articles: any) => {
        this.articles = articles;
        this.displayArticles(this.currentPage);
      });
  }

  get totalPages(): number[] {
    return Array(Math.ceil(this.articles.length / this.articlesPerPage))
      .fill(0)
      .map((_, index) => index + 1);
  }

  displayArticles(page: number) {
    const startIndex = (page - 1) * this.articlesPerPage;
    const endIndex = startIndex + this.articlesPerPage;
    this.displayedArticles = this.articles.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.displayArticles(this.currentPage);
  }
}
