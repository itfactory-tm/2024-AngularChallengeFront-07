import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Artist } from '../interfaces/artist';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private apiUrl = 'http://localhost:8080/api/artists';

  constructor(private httpClient: HttpClient) {} // Inject HttpClient

  getArtists(): Observable<Artist[]> {
    return this.httpClient.get<Artist[]>(this.apiUrl);
  }

  getArtistById(id: string): Observable<Artist> {
    return this.httpClient.get<Artist>(`${this.apiUrl}/${id}`);
  }

  postArtist(artist: Artist): Observable<Artist> {
    return this.httpClient.post<Artist>(this.apiUrl, artist);
  }

  putArtist(id: string, artist: Artist): Observable<Artist> {
    return this.httpClient.put<Artist>(`${this.apiUrl}/${id}`, artist);
  }

  deleteArtist(id: string): Observable<Artist> {
    return this.httpClient.delete<Artist>(`${this.apiUrl}/${id}`);
  }
}
