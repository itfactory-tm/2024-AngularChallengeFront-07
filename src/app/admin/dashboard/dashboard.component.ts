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
    {name: 'Menu items', path: '/admin/menuItems', icon: 'assets/icons/menu.svg' },
    {name: 'Locations', path: '/admin/location', icon: 'assets/icons/location.svg' },
    {name: 'Users', path: 'https://manage.auth0.com/dashboard/us/dev-o6pnv07uc6lnv4mr/users', icon: 'assets/icons/users.svg' },
  ];

  constructor(private router: Router) {
  }

  navigate(link: any): void {
    if (link.path.startsWith('http')) {
      // Open external links in a new tab
      window.open(link.path, '_blank');
    } else {
      // Navigate within the app
      this.router.navigateByUrl(link.path);
    }
  }
}

