import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import { ArticleCreateComponent } from './article-create.component';
import {Observable, of} from "rxjs";
import {Article} from "../interfaces/article.interface";
import {ArticlesService} from "../services/articles.service";
import {RouterModule} from "@angular/router";

class MockArticlesService {
  create(article: Article): Observable<Article> {
    return of(article);
  }
}

describe('ArticleCreateComponent', () => {
  let component: ArticleCreateComponent;
  let fixture: ComponentFixture<ArticleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleCreateComponent],
      imports: [ReactiveFormsModule, RouterModule.forRoot([])],
      providers: [
        { provide: ArticlesService, useClass: MockArticlesService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the articleForm', () => {
    expect(component.articleForm).toBeDefined();
    expect(component.articleForm.get('title')).toBeDefined();
    expect(component.articleForm.get('author')).toBeDefined();
    expect(component.articleForm.get('content')).toBeDefined();
    expect(component.articleForm.get('publishDate')).toBeDefined();
  });

  it('should set the articleForm as invalid when empty', () => {
    expect(component.articleForm.valid).toBeFalse();
  });

  it('should set the articleForm as valid when all fields are filled', () => {
    const form = component.articleForm;
    form.patchValue({
      title: 'Test Title',
      author: 'Test Author',
      content: 'Test Content',
      publishDate: '2022-01-01',
    });

    expect(form.valid).toBeTrue();
  });

  it('should reset the form after successful submission', () => {
    spyOn(component.articlesService, 'create').and.returnValue(of({} as Article));

    const form = component.articleForm;
    form.patchValue({
      title: 'Test Title',
      author: 'Test Author',
      content: 'Test Content',
      publishDate: '2022-01-01',
    });

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();

    expect(component.articleForm.pristine).toBeTrue();
  });

  it('should return true for invalid form field', () => {
    const fieldName = 'title';
    component.articleForm.get(fieldName)?.markAsDirty();

    expect(component.isFieldInputInvalid(fieldName)).toBeTrue();
  });

  it('should return false for valid form field', () => {
    const fieldName = 'title';

    expect(component.isFieldInputInvalid(fieldName)).toBeFalse();
  });
});
