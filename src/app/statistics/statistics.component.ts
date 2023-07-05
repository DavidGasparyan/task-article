import {Component, OnInit} from '@angular/core';
import {ArticlesService} from "../services/articles.service";
import {Article} from "../interfaces/article.interface";
import * as Highcharts from 'highcharts';
import * as moment from "moment";

interface DateArticleMap {
  [date: string]: Article[],
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  articles: Article[] = [];
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;

  constructor(
    private readonly _articlesService: ArticlesService,
  ) {
  }


  ngOnInit() {
    this._articlesService.get();
    this._articlesService.articles
      .subscribe((articles: any) => {
        this.articles = articles;
        const sortedArticles = articles.sort((article1: Article, article2: Article) => article2.publishDate - article1.publishDate);
        const endDate = moment();
        const startDate = moment().subtract(7, 'days');
        const articlesInBetweenDates = sortedArticles.filter((article: Article) => moment(article.publishDate).isBetween(startDate, endDate));
        const formattedArticles = articlesInBetweenDates.map((article: Article) => ({
          ...article,
          publishDate: moment(article.publishDate).format('YYYY-MM-DD'),
        }))

        const articlesHashTable: DateArticleMap = {};

        for (let article of formattedArticles) {
          if(articlesHashTable.hasOwnProperty(article.publishDate)) {
            articlesHashTable[article.publishDate].push(article);
          } else {
            articlesHashTable[article.publishDate] = [article];
          }
        }

        const items = [];
        const values = []

        for (let date in articlesHashTable) {
          items.push(date);
          values.push(articlesHashTable[date].length);
        }

        this.chartOptions = {
          title: {
            text: 'Articles published by day'
          },
          yAxis: {
            title: {
              text: 'Article Count'
            }
          },
          xAxis: {
            categories: [...items],
          },
          series: [
            {
              data: [...values],
              type: 'line'
            }
          ]
        };
      });
  }

}
