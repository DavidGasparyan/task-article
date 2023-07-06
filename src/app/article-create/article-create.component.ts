import {Component, OnInit} from '@angular/core';
import {Article} from "../interfaces/article.interface";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ArticlesService} from "../services/articles.service";

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {
  article: Article = {
    title: '',
    author: '',
    content: '',
    publishDate: 123123123123,
  };

  articleForm!: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    public readonly articlesService: ArticlesService,
  ) {}

  ngOnInit() {
    this.articleForm = this._fb.group({
      title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      author: ['', Validators.required],
      content: ['', Validators.required],
      publishDate: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.articleForm.valid) {
      const date: Date = new Date(this.articleForm.get('publishDate')?.value);
      const article: Article = {
        title: this.articleForm.get('title')?.value,
        author: this.articleForm.get('author')?.value,
        content: this.articleForm.get('content')?.value,
        publishDate: date.getTime(),
      }

      this.articlesService.create(article).subscribe((article: Article) => {
        this.articleForm.reset();
      });
    }
  }

  isFieldInputInvalid(fieldName: string) {
    const formField: FormControl = this.articleForm.get(fieldName) as FormControl;
    return formField.invalid && (formField.dirty || formField.touched);
  }
}
