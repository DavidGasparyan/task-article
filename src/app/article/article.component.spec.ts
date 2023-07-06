import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleComponent } from './article.component';
import { Article } from '../interfaces/article.interface';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  const article: Article = {
    title: 'Test Article',
    author: 'John Doe',
    content: 'Lorem ipsum dolor sit amet.',
    publishDate: 1688592711950
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    component.article = article;
    fixture.detectChanges();
  });

  it('should create the article component', () => {
    expect(component).toBeTruthy();
  });

  it('should display article details correctly', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain(article.title);
    expect(compiled.querySelector('.author').textContent).toContain(`By ${article.author}`);
    expect(compiled.querySelector('.content').textContent).toContain(article.content);
    expect(compiled.querySelector('.publish-date').textContent).toContain(`Published on: ${component.publishDate}`);
  });
});
