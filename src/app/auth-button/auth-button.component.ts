import { Component } from '@angular/core';

// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth-button',
  template:
    '<button class="font-semibold text-lg text-text-light hover:text-primary hover:underline hover:scale-105 transition-transform duration-300 ease-in-out" (click)="auth.loginWithRedirect()">Log in</button>',
  standalone: true,
})
export class AuthButtonComponent {
  // Inject the authentication service into your component through the constructor
  constructor(public auth: AuthService) {}
}
