import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Article} from "../interfaces/article.interface";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private API = 'http://localhost:3000/api/articles';
  private _articles = new BehaviorSubject([] as Article[]);
  constructor(
    private readonly http: HttpClient,
  ) { }

  get() {
    return this.http.get<Article[]>(this.API)
      .subscribe((articles: Article[]) => this._articles.next(articles));
  }

  create(article: Article): Observable<Article> {
    return this.http.post<Article>(`${this.API}`, article);
  }

  get articles() {
    return this._articles.asObservable();
  }
}
