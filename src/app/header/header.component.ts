import { Component } from '@angular/core';
import { Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent {
  adminDropdownOpen = false;

  constructor(private auth: AuthService, private router:Router) { }

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

  leftPages = [
    { path: '/home', name: 'Home' },
    { path: '/line-up', name: 'Line-up' },
    { path: '/stage-list', name: 'Stages' },
  ];

  rightPages = [
    { path: '/tickets', name: 'Tickets' },
    { path: '/info', name: 'Info' },
    { path: '/q-and-a', name: 'Q&A' }
  ];

  isMenuOpen = false;

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
