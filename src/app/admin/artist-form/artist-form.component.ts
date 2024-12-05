import { Component, OnInit } from '@angular/core';
import { Artist } from '../../interfaces/artist';
import { Router } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
import { EditionService } from '../../services/edition.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Edition } from '../../interfaces/edition';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-artist-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './artist-form.component.html',
  styleUrl: './artist-form.component.css',
})
export class ArtistFormComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  artistId: string = '';
  editions$: Edition[] = [];

  artist: Artist = {
    artistId: '',
    name: '',
    mail: '',
    description: '',
    spotifyLink: '',
    genre: '',
    apiCode: '',
    spotifyPhoto: '',
    editionId: '',
    editionName: ''

  };

  isSubmitted: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private artistService: ArtistService,
    private editionService: EditionService
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state || {};
    this.isAdd = state['mode'] === 'add';
    this.isEdit = state['mode'] === 'edit';
    this.artistId = state['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }
  }
  ngOnInit(): void {
    this.editionService.getEditions().subscribe((editions) => {
      this.editions$ = editions;
    })
    if (this.artistId != null) {
      this.artistService.getArtistById(this.artistId).subscribe((result) => {
        this.artist = result;
      });
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.artistService.postArtist(this.artist).subscribe({
        next: (v) => this.router.navigateByUrl('/admin/artist'),
        error: (e) => (this.errorMessage = e.message),
      });
    }
    if (this.isEdit) {
      this.artistService.putArtist(this.artistId, this.artist).subscribe({
        next: (v) => this.router.navigateByUrl('/admin/artist'),
        error: (e) => (this.errorMessage = e.message),
      });
    }
  }
}
