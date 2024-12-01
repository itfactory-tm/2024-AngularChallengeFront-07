import { Injectable } from '@angular/core';
import { Artist } from '../interfaces/artist';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  constructor(private apiService: ApiService) {}

  getArtists(): Observable<Artist[]> {
    // return this.httpClient.get<Artist[]>('http://localhost:8080/api/Artists');
    return this.apiService.get<Artist[]>('Artists');
    //http://localhost:5283/api/Artiests
  }

  getArtistById(id: string): Observable<Artist> {
    return this.apiService.getById<Artist>('Artists', id);
  }

  postArtist(artist: Artist): Observable<Artist> {
    return this.apiService.post<Artist>('Artists', artist);
  }

  putArtist(id: string, artist: Artist): Observable<Artist> {
    return this.apiService.put<Artist>('Artists', id, artist);
  }

  deleteArtist(id: string): Observable<Artist> {
    return this.apiService.delete<Artist>('Artists', id);
  }
}
