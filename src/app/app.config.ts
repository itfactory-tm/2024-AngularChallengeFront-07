import { environmentDev } from '../environments/environment.development';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withHashLocation,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { routes } from './app.routes';
import {
  provideHttpClient,
  HTTP_INTERCEPTORS,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAuth0, AuthHttpInterceptor } from '@auth0/auth0-angular';

const domain = environmentDev.AUTH0_DOMAIN;
const clientId = environmentDev.AUTH0_CLIENT_ID;

export const appConfig: ApplicationConfig = {
  providers: [
    [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes, withEnabledBlockingInitialNavigation()), //this ensures all asynchronous guards are loaded before showing the view
      provideHttpClient(),
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthHttpInterceptor,
        multi: true,
      },
      provideHttpClient(withInterceptorsFromDi()),
      provideAuth0({
        domain: domain,
        clientId: clientId,
        authorizationParams: {
          audience: environmentDev.AUTH0_AUDIENCE,
          redirect_uri: environmentDev.redirectUri,
        },
        httpInterceptor: {
          allowedList: [{uri: `${environmentDev.api_url}/*`, allowAnonymous: true}], //List of URI links that need to be checked for authorisation
        },
      }),
    ],
  ],
};
