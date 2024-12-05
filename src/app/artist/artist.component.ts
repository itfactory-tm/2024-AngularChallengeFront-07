import { Component, Input, OnInit } from '@angular/core';
import { Artist } from '../interfaces/artist';
import { Router } from '@angular/router';
import { TimeSlotService } from '../services/timeSlot.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.css',
})
export class ArtistComponent implements OnInit {
  @Input() artist!: Artist;
  @Input() isDetail: boolean = false;
  playtime: string = '';
  stage: string = '';

  constructor(
    private router: Router,
    private timeSlotService: TimeSlotService 
  ) {}

  ngOnInit(): void {
    if (this.artist && this.artist.artistId) {
      this.calculatePlaytime();
    }
  }

  calculatePlaytime(): void {
    this.timeSlotService.getTimeSlots().subscribe((timeslots) => {
      const artistTimeslots = timeslots.filter((slot) => slot.artistId === this.artist.artistId);

      if (artistTimeslots.length > 0) {
        artistTimeslots.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

        const stageName = artistTimeslots[0].stageName;
        this.stage = stageName;

        const startTime = artistTimeslots[0].startTime;
        const endTime = artistTimeslots[0].endTime;

        const startDate = new Date(startTime);
        const endDate = new Date(endTime);
        if (
          startDate.getFullYear() === endDate.getFullYear() &&
          startDate.getMonth() === endDate.getMonth() &&
          startDate.getDate() === endDate.getDate()
        ) {
          
          this.playtime = `${this.formatDay(startTime)} from ${this.formatTime(
            startTime
          )} until ${this.formatTime(endTime)}`;
        } else {
          this.playtime = `${this.formatDateTime(startTime)} until ${this.formatDateTime(endTime)}`;
        }
      }
    });
  }

  formatDay(time: string): string {
    const date = new Date(time);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    return date.toLocaleDateString('en-US', options); 
  }

  formatTime(time: string): string {
    const date = new Date(time);
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    return date.toLocaleTimeString('en-US', options);
  }

  formatDateTime(time: string): string {
    const date = new Date(time);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  }

  detail(id: string): void {
    this.router.navigate(['/artist', id]);
  }

  goBack(): void {
    window.history.back();
  }
}
