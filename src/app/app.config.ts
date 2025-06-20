import { environment } from '../environments/environment';
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

const domain = environment.AUTH0_DOMAIN;
const clientId = environment.AUTH0_CLIENT_ID;

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
    provideAuth0({
      domain: domain,
      clientId: clientId,
      authorizationParams: {
        audience: environment.AUTH0_AUDIENCE,
        redirect_uri: environment.redirectUri
      },

      httpInterceptor: {
        allowedList: [{ uri: `${environment.api_url}/*`, allowAnonymous: true }]
      }
    }),

  ],
};
