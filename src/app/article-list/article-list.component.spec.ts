import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ArticleListComponent } from './article-list.component';
import { ArticlesService } from '../services/articles.service';
import { UserService } from '../services/user.service';
import { ArticleComponent } from '../article/article.component';
import {Observable, of} from 'rxjs';
import {Article} from "../interfaces/article.interface";
import {RouterModule} from "@angular/router";

class MockArticlesService {
  create(article: Article): Observable<Article> {
    return of(article);
  }

  get articles() {
    return of([]);
  }
  get() {
    return of({}).subscribe();
  }
}

class MockUserService {
  isAdmin(): boolean {
    return true;
  }
}

describe('ArticleListComponent', () => {
  let component: ArticleListComponent;
  let fixture: ComponentFixture<ArticleListComponent>;
  let articlesService: ArticlesService;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleListComponent, ArticleComponent],
      imports: [RouterTestingModule, RouterModule.forRoot([])],
      providers: [
        { provide: ArticlesService, useClass: MockArticlesService },
        { provide: UserService, useClass: MockUserService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleListComponent);
    component = fixture.componentInstance;
    articlesService = TestBed.inject(ArticlesService);
    userService = TestBed.inject(UserService);
    spyOn(articlesService, 'get');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call articlesService.get() on component initialization', () => {
    fixture.detectChanges();
    expect(articlesService.get).toHaveBeenCalled();
  });

  it('should calculate totalPages correctly based on articles length and articlesPerPage', () => {
    component.articles = [
      {
        id: 1,
        title: 'Article 1',
        author: 'Test Author',
        content: 'Test Content',
        publishDate: 1688592711950,
      },
      {
        id: 2,
        title: 'Article 2',
        author: 'Test Author',
        content: 'Test Content',
        publishDate: 1688592711950,
      },
      {
        id: 3,
        title: 'Article 3',
        author: 'Test Author',
        content: 'Test Content',
        publishDate: 1688592711950,
      },
      {
        id: 4,
        title: 'Article 4',
        author: 'Test Author',
        content: 'Test Content',
        publishDate: 1688592711950,
      },
      {
        id: 5,
        title: 'Article 5',
        author: 'Test Author',
        content: 'Test Content',
        publishDate: 1688592711950,
      },
    ];

    expect(component.totalPages).toEqual([1, 2]);
  });

  it('should display correct articles when calling displayArticles', () => {
    component.articles = [
      {
        id: 1,
        title: 'Article 1',
        author: 'Test Author',
        content: 'Test Content',
        publishDate: 1688592711950,
      },
      {
        id: 2,
        title: 'Article 2',
        author: 'Test Author',
        content: 'Test Content',
        publishDate: 1688592711950,
      },
      {
        id: 3,
        title: 'Article 3',
        author: 'Test Author',
        content: 'Test Content',
        publishDate: 1688592711950,
      },
      {
        id: 4,
        title: 'Article 4',
        author: 'Test Author',
        content: 'Test Content',
        publishDate: 1688592711950,
      },
      {
        id: 5,
        title: 'Article 5',
        author: 'Test Author',
        content: 'Test Content',
        publishDate: 1688592711950,
      },
    ];

    component.displayArticles(2);

    expect(component.displayedArticles).toEqual([
      {
        id: 4,
        title: 'Article 4',
        author: 'Test Author',
        content: 'Test Content',
        publishDate: 1688592711950,
      },
      {
        id: 5,
        title: 'Article 5',
        author: 'Test Author',
        content: 'Test Content',
        publishDate: 1688592711950,
      },
    ]);
  });

  it('should change the current page and display correct articles when calling changePage', () => {
    component.articles = [
      {
        id: 1,
        title: 'Article 1',
        author: 'Test Author',
        content: 'Test Content',
        publishDate: 1688592711950,
      },
      {
        id: 2,
        title: 'Article 2',
        author: 'Test Author',
        content: 'Test Content',
        publishDate: 1688592711950,
      },
      {
        id: 3,
        title: 'Article 3',
        author: 'Test Author',
        content: 'Test Content',
        publishDate: 1688592711950,
      },
      {
        id: 4,
        title: 'Article 4',
        author: 'Test Author',
        content: 'Test Content',
        publishDate: 1688592711950,
      },
      {
        id: 5,
        title: 'Article 5',
        author: 'Test Author',
        content: 'Test Content',
        publishDate: 1688592711950,
      },
    ];

    component.changePage(2);

    expect(component.currentPage).toEqual(2);
    expect(component.displayedArticles).toEqual([
      {
        id: 4,
        title: 'Article 4',
        author: 'Test Author',
        content: 'Test Content',
        publishDate: 1688592711950,
      },
      {
        id: 5,
        title: 'Article 5',
        author: 'Test Author',
        content: 'Test Content',
        publishDate: 1688592711950,
      },
    ]);
  });
});
