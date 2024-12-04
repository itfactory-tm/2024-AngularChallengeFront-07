import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const BASE_URL = environment.api_url;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  // Generic GET request for a resource (e.g., Artists, FoodTrucks)
  get<T>(endpoint: string): Observable<T> {
    const url = `${BASE_URL}/${endpoint}`;
    return this.httpClient.get<T>(url);
  }

  // Generic GET request with an ID (e.g., get a specific artist by ID)
  getById<T>(endpoint: string, id: string): Observable<T> {
    const url = `${BASE_URL}/${endpoint}/${id}`;
    return this.httpClient.get<T>(url);
  }

  // Generic POST request (e.g., create a new Artist, FoodTruck)
  post<T>(endpoint: string, data: T): Observable<T> {
    const url = `${BASE_URL}/${endpoint}`;
    return this.httpClient.post<T>(url, data);
  }

  // Generic PUT request (e.g., update an existing Artist)
  put<T>(endpoint: string, id: string, data: T): Observable<T> {
    const url = `${BASE_URL}/${endpoint}/${id}`;
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    return this.httpClient.put<T>(url, data, { headers: headers });
  }

  // Generic DELETE request (e.g., delete an Artist, FoodTruck)
  delete<T>(endpoint: string, id: string): Observable<T> {
    const url = `${BASE_URL}/${endpoint}/${id}`;
    return this.httpClient.delete<T>(url);
  }
}
