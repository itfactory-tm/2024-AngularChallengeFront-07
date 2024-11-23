import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private clientId = 'c6d074eb0a1142cb91c3638e0f91fd13'; // Replace with your Client ID
  private clientSecret = 'fa2ca585a6204453bcea42f695362225'; // Replace with your Client Secret
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  getAccessToken(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = 'grant_type=client_credentials';

    return this.http.post('https://accounts.spotify.com/api/token', body, { headers }).pipe(
      tap((response: any) => {
        this.token = response.access_token; // Store the token
        console.log('Access Token:', this.token);
      })
    );
  }

  fetchWebApi(endpoint: string, method: string, body?: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Use the stored token
      'Content-Type': 'application/json',
    });

    const options = {
      headers,
      method,
      body: body ? JSON.stringify(body) : null,
    };

    return this.http.request(method, `https://api.spotify.com/${endpoint}`, options);
  }

  getArtistsByIds(ids: string): Observable<any> {
    return this.fetchWebApi(`v1/artists?ids=${ids}`, 'GET');
  }
}
