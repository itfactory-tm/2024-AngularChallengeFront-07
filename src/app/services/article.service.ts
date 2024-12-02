import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private httpClient: HttpClient) {}
  private apiUrl2 = 'https://localhost:7005/api/Articles';
  private apiUrl = 'http://localhost:8080/api/Articles';

  getArticles(): Observable<Article[]>{
    return this.httpClient.get<Article[]>(this.apiUrl);
  }

  getArticleById(id: string): Observable<Article> {
    return this.httpClient.get<Article>(`${this.apiUrl}/${id}`);
  }

  postArticle(article: Article): Observable<Article> {
    return this.httpClient.post<Article>(`${this.apiUrl}/`, article);
  }

  putArticle(id: string, article: Article): Observable<Article> {
    return this.httpClient.put<Article>(`${this.apiUrl}/${id}`, article);
  }

  deleteArticle(id: string): Observable<Article> {
    return this.httpClient.delete<Article>(`${this.apiUrl}/${id}`);
  }
}
