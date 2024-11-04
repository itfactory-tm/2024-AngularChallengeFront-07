import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { PrivacyComponent } from './app/privacy/privacy.component';
import { TermsComponent } from './app/terms/terms.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
