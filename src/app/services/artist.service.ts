import { Injectable } from '@angular/core';
import { Artist } from '../interfaces/artist';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  constructor(private httpClient: HttpClient) {}

  getArtists(): Observable<Artist[]> {
    return this.httpClient.get<Artist[]>('http://localhost:8080/api/Artiests');
    //http://localhost:5283/api/Artiests
  }

  getArtistById(id: string): Observable<Artist> {
    return this.httpClient.get<Artist>(
      'http://localhost:8080/api/Artiests/' + id
    );
  }

  postArtist(artist: Artist): Observable<Artist> {
    return this.httpClient.post<Artist>(
      'http://localhost:8080/api/Artiests',
      artist
    );
  }

  putArtist(id: string, artist: Artist): Observable<Artist> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8'); //vervangen en headers in de api call meegeven

    return this.httpClient.put<Artist>(
      'http://localhost:8080/api/Artiests/' + id,
      artist,
      { headers: headers }
    );
  }

  deleteArtist(id: string): Observable<Artist> {
    return this.httpClient.delete<Artist>(
      'http://localhost:8080/api/Artiests/' + id
    );
  }
}
