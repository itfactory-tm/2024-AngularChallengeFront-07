import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { map } from 'rxjs';
import { Artist } from '../../interfaces/artist';
import { ArtistService } from '../../services/artist.service';
import { BoughtTicketService } from '../../services/bought-ticket.service';
import { FoodtruckService } from '../../services/foodtruck.service';


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
  artistCount: number = 0;
  ticketCount: number = 0;
  foodTruckCount: number = 0;

  adminLinks = [
    { name: 'Articles', path: '/admin/article', icon: 'assets/icons/articles.svg' },
    { name: 'Artists', path: '/admin/artist', icon: 'assets/icons/artists.svg' },
    { name: 'Stages', path: '/admin/stage', icon: 'assets/icons/stages.svg' },
    { name: 'Tickets', path: '/admin/ticket', icon: 'assets/icons/tickets.svg' },
    { name: 'Timeslots', path: '/admin/timeSlot', icon: 'assets/icons/timeslots.svg' },
    { name: 'Editions', path: '/admin/edition', icon: 'assets/icons/editions.svg' },
    { name: 'Sponsors', path: '/admin/sponsor', icon: 'assets/icons/sponsors.svg' },
    { name: 'Foodtrucks', path: '/admin/foodtruck', icon: 'assets/icons/foodtrucks.svg' },
    { name: 'Menu items', path: '/admin/menuItems', icon: 'assets/icons/menu.svg' },
    { name: 'Locations', path: '/admin/location', icon: 'assets/icons/location.svg' },
    { name: 'Users', path: 'https://manage.auth0.com/dashboard/us/dev-o6pnv07uc6lnv4mr/users', icon: 'assets/icons/users.svg' },
  ];

  constructor(private router: Router, private artistService: ArtistService, private boughtTicketService : BoughtTicketService, private foodTruckService: FoodtruckService) {
  }
  ngOnInit() {
    this.getArtistCount();
    this.getBoughtTicketsCount();
    this.getFoodTrucksCount();
  }
  getArtistCount(){
    this.artistService.getArtists()
    .pipe(
      map(artists => artists.length)
    )
    .subscribe((countValue) => {
      this.artistCount = countValue;
    });
  }
  getBoughtTicketsCount(){
    this.boughtTicketService.getAllTickets()
    .pipe(
      map(tickets => tickets.length)
    )
    .subscribe((countValue) => {
      this.ticketCount = countValue;
    });
  }
  getFoodTrucksCount(){
    this.foodTruckService.getFoodtrucks()
    .pipe(
      map(foodTrucks => foodTrucks.length)
    )
    .subscribe((countValue) => {
      this.foodTruckCount = countValue;
    });
  }
  navigate(link: any): void {
    if (link.path.startsWith('http')) {
      window.open(link.path, '_blank');
    } else {
      this.router.navigateByUrl(link.path);
    }
  }
}

