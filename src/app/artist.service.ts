import { Injectable } from '@angular/core';
import { Artist } from './artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  constructor() { }

  getArtists(): Artist[] {
    let artists: Artist[] = [];

  let artist1: Artist = {
    id: 1,
    name: "Chocoprins Joris",
    genre: "Steffy",
    biography: "De rijke chocolade prins van Leopoldsburg en de befaamde schoonbroer van Wesley Johan A. Meylaers (Flopper)",
  };

  artists.push(artist1);

  return artists;
  }
}

