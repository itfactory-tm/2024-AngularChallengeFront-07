import { Component, Input } from '@angular/core';
import { Artist } from '../artist';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.css'
})
export class ArtistComponent {
  @Input() artist!: Artist;

  constructor() { }

  ngOnInit(): void {
  }
}
