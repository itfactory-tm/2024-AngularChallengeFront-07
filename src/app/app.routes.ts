import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { LineUpComponent } from './line-up/line-up.component';
import { QAndAComponent } from './q-and-a/q-and-a.component';
import { StageComponent } from './stage/stage.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { ArtistComponent } from './artist/artist.component';
import { StageListComponent } from './stage-list/stage-list.component';
import { DayListComponent } from './day-list/day-list.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { StageDetailComponent } from './stage-detail/stage-detail.component';
import { ArtistListComponent } from './admin/artist-list/artist-list.component';
import { ArtistFormComponent } from './admin/artist-form/artist-form.component';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'info', component: InfoComponent },
  { path: 'line-up', component: LineUpComponent },
  { path: 'q-and-a', component: QAndAComponent },
  { path: 'stage-list', component: StageListComponent },
  { path: 'stage/:id', component: StageDetailComponent },
  { path: 'tickets', component: DayListComponent },
  {
    path: 'admin/artist',
    component: ArtistListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/artist/form',
    component: ArtistFormComponent,
    canActivate: [AuthGuard],
  },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'artist', component: ArtistComponent },
  { path: 'artist/:id', component: ArtistDetailComponent },
];
