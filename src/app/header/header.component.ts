import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent {
  pages = [
    { path: '/home', name: 'Home' },
    { path: '/line-up', name: 'Line-up' },
    { path: '/stage', name: 'Stages' },
    { path: '/tickets', name: 'Tickets' },
    { path: '/info', name: 'Info' },
  ];

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
