import { Component, Input, OnInit } from '@angular/core';
import { Artist } from '../artist';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.css'
})
export class ArtistComponent implements OnInit {
  @Input() artist!: Artist;
  @Input() isDetail: boolean = false;
  
  constructor(private router: Router) { }
  
  ngOnInit(): void {
  }

  detail(id: number) {
    this.router.navigate(['/artist', id]);
  }

  goBack() {
    window.history.back();
}
}
