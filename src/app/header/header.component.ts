import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '@auth0/auth0-angular';
import { LoginButtonComponent } from '../login-button/login-button.component';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    LoginButtonComponent,
    LogoutButtonComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  adminDropdownOpen = false;
  isMenuOpen = false;
  isAuthenticated = signal(false);

  constructor(private auth: AuthService, private router: Router) {
    this.auth.isAuthenticated$.subscribe((auth) => {
      this.isAuthenticated.set(auth);
    });
  }

  leftPages = [
    { path: '/', name: 'Home' },
    { path: '/line-up', name: 'Line-up' },
    { path: '/stage-list', name: 'Stages' },
    { path: '/time-schedule', name: 'Schedule' },

  ];

  rightPages = [
    { path: '/tickets', name: 'Tickets' },
    { path: '/food', name: 'Food' },
    { path: '/faq', name: 'FAQ' },
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
    this.toggleMenu();
    this.router.navigate([path]);
  }
}
