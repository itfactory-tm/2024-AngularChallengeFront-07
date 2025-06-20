import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Location } from '../interfaces/location';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid function
import { environment } from '../../environments/environment'; // Import environment

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private httpClient: HttpClient) { }
  private apiUrl = `${environment.api_url}/Locations`; // Use environment variable

  getLocations(): Observable<Location[]> {
    return this.httpClient.get<Location[]>(this.apiUrl);
  }

  getLocationById(id: string): Observable<Location> {
    return this.httpClient.get<Location>(`${this.apiUrl}/${id}`);
  }

  postLocation(location: Location): Observable<Location> {
    location.locationId = uuidv4();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<Location>(`${this.apiUrl}/`, location, { headers: headers });
  }

  putLocation(id: string,location: Location): Observable<Location> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.put<Location>(`${this.apiUrl}/${id}`, location, { headers: headers });
  }

  deleteLocation(id: string): Observable<Location> {
    return this.httpClient.delete<Location>(`${this.apiUrl}/${id}`);
  }
}
