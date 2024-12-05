import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { Location } from '../interfaces/location';
import { v4 as uuidv4 } from 'uuid';
import {environment} from "../../environments/environment"; // Import the uuid function

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient: HttpClient) { }

  private apiUrl = `${environment.api_url}/Locations`;

  getLocations(): Observable<Location[]>{
    return this.httpClient.get<Location[]>(this.apiUrl);
  }

  getLocationById(id: string): Observable<Location>{
    return this.httpClient.get<Location>(`${this.apiUrl}/${id}`);
  }

  postLocation(location: Location): Observable<Location>{
    location.locationId = uuidv4();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<Location>(`${this.apiUrl}/${location}`, location, { headers: headers });
  }

  putLocation(location: Location): Observable<Location>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.put<Location>(`${this.apiUrl}/${location}`, location, {headers: headers});
  }

  deleteLocation(id: string): Observable<Location>{
    return this.httpClient.delete<Location>(`${this.apiUrl}/${id}`);
  }
}
