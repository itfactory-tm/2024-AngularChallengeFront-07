import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '@auth0/auth0-angular';
import { AuthButtonComponent } from '../auth-button/auth-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, AuthButtonComponent],
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class HeaderComponent {
  adminDropdownOpen = false;
  isMenuOpen = false;
  // Store the logged-in user

  constructor(public auth: AuthService, private router: Router) {}

  handleLogin(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/',
      },
      authorizationParams: {
        prompt: 'login',
      },
    });
  }

  handleLogout(): void {
    this.auth.logout({
      logoutParams: { returnTo: window.location.origin },
    });
  }

  leftPages = [
    { path: '/', name: 'Home' },
    { path: '/line-up', name: 'Line-up' },
    { path: '/stage-list', name: 'Stages' },
  ];

  rightPages = [
    { path: '/tickets', name: 'Tickets' },
    { path: '/info', name: 'Info' },
    { path: '/q-and-a', name: 'Q&A' },
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onAdminDropDownClick() {
    this.adminDropdownOpen = !this.adminDropdownOpen;
  }

  closeAdminDropDown() {
    this.adminDropdownOpen = false;
  }

  navigateTo(path: string) {
    this.closeAdminDropDown();
    this.router.navigate([path]);
  }
}
