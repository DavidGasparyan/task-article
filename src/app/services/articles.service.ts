import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, shareReplay, Subject} from "rxjs";
import {Article} from "../interfaces/article.interface";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private API: string = '/api/articles';
  private _articles: Subject<Article[]> = new Subject();
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
    return this._articles.asObservable().pipe(shareReplay(1));
  }
}
