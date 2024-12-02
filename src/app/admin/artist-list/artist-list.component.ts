import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../services/artist.service';
import { Observable } from 'rxjs';
import { Artist } from '../../interfaces/artist';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Edition } from '../../interfaces/edition';

@Component({
  selector: 'app-artist-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './artist-list.component.html',
  styleUrl: './artist-list.component.css',
})
export class ArtistListComponent implements OnInit {
  artists$: Observable<Artist[]> = new Observable<Artist[]>();
  editions$: Observable<Edition[]> = new Observable<Edition[]>();
  errorMessage: string = '';

  constructor(private artistService: ArtistService, private router: Router) {}
  ngOnInit(): void {
    this.getArtists();
  }

  getArtists() {
    this.artists$ = this.artistService.getArtists();
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['admin/artist/form'], { state: { mode: 'add' } });
  }

  edit(id: string) {
    //Navigate to form in edit mode
    this.router.navigate(['admin/artist/form'], {
      state: { id: id, mode: 'edit' },
    });
  }

  delete(id: string) {
    this.artistService.deleteArtist(id).subscribe({
      next: (v) => this.getArtists(),
      error: (e) => (this.errorMessage = e.message),
    });
  }
}
