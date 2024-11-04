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
<<<<<<< HEAD
import { SpotifyComponent } from './spotify/spotify.component';
=======
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
>>>>>>> main

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'info', component: InfoComponent },
  { path: 'line-up', component: LineUpComponent },
  { path: 'q-and-a', component: QAndAComponent },
  { path: 'stage-list', component: StageListComponent },
  { path: 'tickets', component: TicketsComponent },
<<<<<<< HEAD
  { path: 'spotify', component: SpotifyComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', redirectTo: '/home' }, // Add this line for wildcard route
=======
>>>>>>> main
  { path: 'artist', component: ArtistComponent },
  { path: 'artist/:id', component: ArtistDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];
