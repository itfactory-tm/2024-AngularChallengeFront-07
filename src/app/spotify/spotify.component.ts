import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-top-tracks',
  templateUrl: './top-tracks.component.html',
  styleUrls: ['./top-tracks.component.css']
})
export class TopTracksComponent implements OnInit {
  topTracks: any[] = [];

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.spotifyService.getTopTracks().subscribe({
      next: (data) => {
        this.topTracks = data.items;
      },
      error: (err) => {
        console.error('Error fetching top tracks', err);
      },
    });
  }
}
