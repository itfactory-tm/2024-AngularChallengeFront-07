import { Component } from '@angular/core';
import { ArtistService } from '../services/artist.service';
import { ArtistComponent } from '../artist/artist.component';
import { Artist } from '../interfaces/artist';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-artist-detail',
  standalone: true,
  imports: [ArtistComponent],
  templateUrl: './artist-detail.component.html',
  styleUrl: './artist-detail.component.css'
})
export class ArtistDetailComponent {
  artist!: Artist;
  artists$: Observable<Artist> = new Observable<Artist>();


  constructor(private artistService: ArtistService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const artistId = this.route.snapshot.paramMap.get('id');
    if (artistId != null) {
      let artistTemp = this.artistService.getArtistById(+artistId) ?? null;
      if (artistTemp != null) {
        this.artists$ = artistTemp;
      }
    }
  }
}
