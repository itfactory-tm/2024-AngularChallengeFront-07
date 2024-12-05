import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { environment } from "../../environments/environment";



@Injectable({
  providedIn: 'root',
})
export class ArticleService {

  constructor(private httpClient: HttpClient) { }

  private apiUrl = `${environment.api_url}/Articles`;


  getArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.apiUrl);
  }

  getArticleById(id: string): Observable<Article> {
    return this.httpClient.get<Article>(`${this.apiUrl}/${id}`);
  }

  postArticle(article: Article): Observable<Article> {
    return this.httpClient.post<Article>(`${this.apiUrl}`, article);
  }

  putArticle(id: string, article: Article): Observable<Article> {
    return this.httpClient.put<Article>(`${this.apiUrl}/${id}`, article);
  }

  deleteArticle(id: string): Observable<Article> {
    return this.httpClient.delete<Article>(`${this.apiUrl}/${id}`);
  }
}
