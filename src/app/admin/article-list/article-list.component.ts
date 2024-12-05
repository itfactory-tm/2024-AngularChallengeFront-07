import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Observable } from 'rxjs';
import { Article } from '../../interfaces/article';
import { Router } from '@angular/router';
import {AsyncPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css',
})
export class ArticleListComponent implements OnInit {
  articles$: Observable<Article[]> = new Observable<Article[]>();
  errorMessage: string = '';

  constructor(private articleService: ArticleService, private router: Router) {}
  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this.articles$ = this.articleService.getArticles();
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['admin/article/form'], { state: { mode: 'add' } });
  }

  edit(id: string) {
    //Navigate to form in edit mode
    this.router.navigate(['admin/article/form'], {
      state: { id: id, mode: 'edit' },
    });
  }

  delete(id: string) {
    this.articleService.deleteArticle(id).subscribe({
      next: (v) => this.getArticles(),
      error: (e) => (this.errorMessage = e.message),
    });
  }
}
