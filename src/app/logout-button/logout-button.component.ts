import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.css',
})
export class LogoutButtonComponent {
  constructor(private auth: AuthService) {}

  handleLogout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: environment.home_url,
      },
    });
  }
}
