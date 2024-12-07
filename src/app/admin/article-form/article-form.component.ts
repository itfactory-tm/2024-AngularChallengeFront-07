import { Component, OnInit } from '@angular/core';
import { Article } from '../../interfaces/article';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { EditionService } from '../../services/edition.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Edition } from '../../interfaces/edition';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [FormsModule,AsyncPipe],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.css',
})
export class ArticleFormComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  articleId: string = '';
  editions$: Observable<Edition[]> = new Observable<Edition[]>();

  article: Article = {
    articleId: '',
    title: '',
    description: '',
    date: new Date(),
    editionId: '',
  };

  isSubmitted: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private articleService: ArticleService,
    private editionService: EditionService
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state || {};
    this.isAdd = state['mode'] === 'add';
    this.isEdit = state['mode'] === 'edit';
    this.articleId = state['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }
  }
  ngOnInit(): void {
    this.editions$ = this.editionService.getEditions();


    if (this.articleId != null) {
      this.articleService.getArticleById(this.articleId).subscribe((result) => {
        this.article = result;
      });
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.articleService.postArticle(this.article).subscribe({
        next: (v) => this.router.navigateByUrl('/admin/article'),
        error: (e) => (this.errorMessage = e.message),
      });
    }
    if (this.isEdit) {
      this.articleService.putArticle(this.articleId, this.article).subscribe({
        next: (v) => this.router.navigateByUrl('/admin/article'),
        error: (e) => (this.errorMessage = e.message),
      });
    }
  }
  
  goBack() {
    window.history.back();
  }
}
