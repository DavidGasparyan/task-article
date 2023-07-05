import {Component, OnInit} from '@angular/core';
import {Article} from "../interfaces/article.interface";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      author: ['', Validators.required],
      content: ['', Validators.required],
      publishDate: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.articleForm.valid) {
      // Perform form submission logic here
      console.log('Form submitted:', this.articleForm.value);
    }
  }

  isFieldInputInvalid(fieldName: string) {
    const formField = this.articleForm.get(fieldName) as FormControl;

    return formField.invalid && (formField.dirty || formField.touched);
  }
}
