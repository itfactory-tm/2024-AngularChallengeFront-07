import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Foodtruck} from "../interfaces/foodtruck";

@Injectable({
  providedIn: 'root'
})
export class FoodtruckService {

  constructor(private httpClient: HttpClient) { }
  private apiUrl = 'https://localhost:7005/api/Foodtrucks';

  getFoodtrucks(): Observable<Foodtruck[]>{
    return this.httpClient.get<Foodtruck[]>(this.apiUrl);
  }

  getFoodtruckById(id: string): Observable<Foodtruck> {
    return this.httpClient.get<Foodtruck>(`${this.apiUrl}/${id}`);
  }

  postFoodtruck(foodtruck: Foodtruck): Observable<Foodtruck> {
    return this.httpClient.post<Foodtruck>(`${this.apiUrl}/`, foodtruck);
  }

  putFoodtruck(id: string, foodtruck: Foodtruck): Observable<Foodtruck> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Foodtruck>(`${this.apiUrl}/${id}`, foodtruck,{headers: headers});
  }

  deleteFoodtruck(id: string): Observable<Foodtruck> {
    return this.httpClient.delete<Foodtruck>(`${this.apiUrl}/${id}`);
  }
}
