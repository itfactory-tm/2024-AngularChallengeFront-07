import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private apiUrl = 'https://api.spotify.com/v1/artists/';

  constructor(private http: HttpClient) {}

  getArtistsDetails(spotifyLink: string): Observable<any> {
    const artistId = this.extractArtistId(spotifyLink);
    const url = `${this.apiUrl}${artistId}`;
    const headers = {
      Authorization: `Bearer YOUR_SPOTIFY_ACCESS_TOKEN`, // Replace with actual token
    };

    return this.http.get<any>(url, { headers });
  }

  // Helper method to extract the artist ID from the Spotify link
  private extractArtistId(spotifyLink: string): string {
    const regex = /spotify\.com\/artist\/([a-zA-Z0-9]+)/;
    const match = spotifyLink.match(regex);
    return match ? match[1] : '';
  }
}
