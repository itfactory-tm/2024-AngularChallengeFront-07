import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  adminLinks = [
    { name: 'Articles', path: '/admin/article', icon: 'assets/icons/articles.svg' },
    { name: 'Artists', path: '/admin/artist', icon: 'assets/icons/artists.svg' },
    { name: 'Stages', path: '/admin/stage', icon: 'assets/icons/stages.svg' },
    { name: 'Tickets', path: '/admin/ticket', icon: 'assets/icons/tickets.svg' },
    { name: 'Timeslots', path: '/admin/timeSlot', icon: 'assets/icons/timeslots.svg' },
    { name: 'Editions', path: '/admin/edition', icon: 'assets/icons/editions.svg' },
    { name: 'Sponsors', path: '/admin/sponsor', icon: 'assets/icons/sponsors.svg' },
    { name: 'Foodtrucks', path: '/admin/foodtruck', icon: 'assets/icons/foodtrucks.svg' },
  ];
}

