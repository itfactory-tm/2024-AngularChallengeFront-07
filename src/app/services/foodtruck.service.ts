import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { FoodTruck } from "../interfaces/foodTruck";
import { v4 as uuidv4 } from 'uuid'; // Import the uuid function
import { environment } from '../../environments/environment'; // Import environment


@Injectable({
  providedIn: 'root'
})
export class FoodtruckService {

  constructor(private httpClient: HttpClient) { }

  private apiUrl = `${environment.api_url}/Foodtrucks`;


  getFoodtrucks(): Observable<FoodTruck[]> {
    return this.httpClient.get<FoodTruck[]>(this.apiUrl);
  }

  getFoodtruckById(id: string): Observable<FoodTruck> {
    return this.httpClient.get<FoodTruck>(`${this.apiUrl}/${id}`);
  }

  postFoodtruck(foodtruck: FoodTruck): Observable<FoodTruck> {
    foodtruck.foodTruckId = uuidv4();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<FoodTruck>(`${this.apiUrl}/`, foodtruck, { headers: headers });
  }

  putFoodtruck(id: string, foodtruck: FoodTruck): Observable<FoodTruck> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<FoodTruck>(`${this.apiUrl}/${id}`, foodtruck, { headers: headers });
  }

  deleteFoodtruck(id: string): Observable<FoodTruck> {
    return this.httpClient.delete<FoodTruck>(`${this.apiUrl}/${id}`);
  }
}
