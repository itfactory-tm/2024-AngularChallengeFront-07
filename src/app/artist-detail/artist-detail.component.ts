import { Component } from '@angular/core';
import { ArtistService } from '../services/artist.service';
import { ArtistComponent } from '../artist/artist.component';
import { Artist } from '../interfaces/artist';
import { ActivatedRoute } from '@angular/router';
import { TimeScheduleService } from '../services/time-schedule.service'; // Assuming you have this service

@Component({
  selector: 'app-artist-detail',
  standalone: true,
  imports: [ArtistComponent],
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent {
  artist!: Artist;
  timeSchedules: { artistId: number, day: string }[] = [];  // Define the timeSchedules property

  constructor(
    private artistService: ArtistService,
    private route: ActivatedRoute,
    private timeScheduleService: TimeScheduleService // Inject the time schedule service
  ) { }

  ngOnInit(): void {
    this.timeSchedules = this.timeScheduleService.getTimeSchedules();  // Get the schedules
    const artistId = this.route.snapshot.paramMap.get('id');
    if (artistId != null) {
      const artistTemp = this.artistService.getArtistById(+artistId);
      if (artistTemp != null) {
        this.artist = artistTemp;
      }
    }
  }

  getArtistDay(artistId: number): string {
    const schedule = this.timeSchedules.find(ts => ts.artistId === artistId);
    return schedule ? schedule.day : 'No schedule available';
  }
}
