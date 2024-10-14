import { Component, Input, OnInit } from '@angular/core';
import { Artist } from '../artist';
import { ArtistService } from '../artist.service';
import { ArtistComponent } from '../artist/artist.component';

@Component({
  selector: 'app-line-up',
  standalone: true,
  imports: [ArtistComponent],
  templateUrl: './line-up.component.html',
  styleUrl: './line-up.component.css'
})
export class LineUpComponent {

  artists: Artist[] = [];

  constructor(private artistService: ArtistService) { }

  ngOnInit(): void {
    this.artists = this.artistService.getArtists();
  }
}
