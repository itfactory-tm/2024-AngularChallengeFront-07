import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../services/artist.service';
import {map, Observable} from 'rxjs';
import { Artist } from '../../interfaces/artist';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-artist-list',
  standalone: true,
  imports: [AsyncPipe, FormsModule],
  templateUrl: './artist-list.component.html',
  styleUrl: './artist-list.component.css',
})
export class ArtistListComponent implements OnInit {
  artists$: Observable<Artist[]> = new Observable<Artist[]>();
  filteredArtists$ :Observable<Artist[]> = new Observable<Artist[]>();
  errorMessage: string = '';
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage = 10;

  constructor(private artistService: ArtistService, private router: Router) {}
  ngOnInit(): void {
    this.getArtists();
  }

  getArtists() {
    this.artists$ = this.artistService.getArtists();
    this.filteredArtists$ = this.artists$;
  }

  filteredArtists(){
    this.filteredArtists$ = this.artists$.pipe(
      map((artists: any[]) =>
      artists.filter(artist => artist.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
    ));
  }
  goBack() {
    this.router.navigate(['/admin/dashboard']);
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
