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
    return this.httpClient.get<Artist[]>('https://localhost:7005/api/Artiests');
    //http://localhost:5283/api/Artiests
  }

  getArtistById(id: number): Observable<Artist> {
    return this.httpClient.get<Artist>('http://localhost:8080/artists/' + id);
  }

  postArtist(artist: Artist): Observable<Artist> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8'); //vervangen en headers in de api call meegeven

    return this.httpClient.post<Artist>(
      'https://localhost:7005/api/Artiests',
      artist,
      { headers: headers }
    );
  }

  putArtist(id: number, artist: Artist): Observable<Artist> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8'); //vervangen en headers in de api call meegeven

    return this.httpClient.put<Artist>(
      'https://localhost:7005/api/Artiests/' + id,
      artist,
      { headers: headers }
    );
  }

  deleteArtist(id: number): Observable<Artist> {
    return this.httpClient.delete<Artist>(
      'http://localhost:8080/artists/' + id
    );
  }
}
