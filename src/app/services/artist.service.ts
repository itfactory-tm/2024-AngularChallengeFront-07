import { Injectable } from '@angular/core';
import { Artist } from '../interfaces/artist';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid function

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  constructor(private httpClient: HttpClient) {}
  private apiUrl = 'https://localhost:7005/api/Artists';
  getArtists(): Observable<Artist[]> {
    return this.httpClient.get<Artist[]>(this.apiUrl);
  }

  getArtistById(id: string): Observable<Artist> {
    return this.httpClient.get<Artist>(`${this.apiUrl}/${id}`);
  }

  postArtist(artist: Artist): Observable<Artist> {
    artist.artistId = uuidv4(); // Generate a new UUID for the artist
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<Artist>(`${this.apiUrl}/`, artist, {
      headers: headers,
    });
  }

  putArtist(id: string, artist: Artist): Observable<Artist> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.put<Artist>(`${this.apiUrl}/${id}`, artist, {
      headers: headers,
    });
  }

  deleteArtist(id: string): Observable<Artist> {
    return this.httpClient.delete<Artist>(`${this.apiUrl}/${id}`);
  }
}
