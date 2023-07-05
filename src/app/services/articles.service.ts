import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Article} from "../interfaces/article.interface";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private API = 'https://64a57ad400c3559aa9bfc759.mockapi.io/asi/v1/articles';
  private _articles = new BehaviorSubject([] as Article[]);
  constructor(
    private readonly http: HttpClient,
  ) { }

  get() {
    return this.http.get<Article[]>(this.API)
      .subscribe((articles: Article[]) => this._articles.next(articles));
  }

  get articles() {
    return this._articles.asObservable();
  }
}
