import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import {v4 as uuidv4} from 'uuid';

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
    article.articleId = uuidv4();
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    return this.httpClient.post<Article>(`${this.apiUrl}`, article, { headers: headers });
  }

  putArticle(id: string, article: Article): Observable<Article> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    return this.httpClient.put<Article>(`${this.apiUrl}/${id}`, article, { headers: headers });
  }

  deleteArticle(id: string): Observable<Article> {
    return this.httpClient.delete<Article>(`${this.apiUrl}/${id}`);
  }
}
