import { Injectable } from '@angular/core';
import { Artist } from './artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private artists: Artist[] = [];

  constructor() {

  let artist1: Artist = {
    id: 1,
    name: "Chocoprins Joris",
    genre: "Steffy",
    biography: "De rijke chocolade prins van Leopoldsburg en de befaamde schoonbroer van Wesley Johan A. Meylaers (Flopper)",
  };

  let artist2: Artist = {
    id: 2,
    name: "De Kabelbaan",
    genre: "Kever",
    biography: "Vakansie Vincens",
  };

  this.artists.push(artist1);
  this.artists.push(artist2);

}
  getArtists(): Artist[] {
    return this.artists;
  }

  getArtistById(id: number) : Artist | null {
    return this.artists.find(a=>a.id === id) ?? null; //find = JavaScript method on arrays!
  }
  
}

