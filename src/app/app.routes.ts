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
import { OrderTicketComponent } from './order-ticket/order-ticket.component';
import { ArtistListComponent } from './admin/artist-list/artist-list.component';
import { ArtistFormComponent } from './admin/artist-form/artist-form.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { SponsorListComponent } from './admin/sponsor-list/sponsor-list.component';
import { SponsorFormComponent } from './admin/sponsor-form/sponsor-form.component';
import { FoodtruckListComponent } from './admin/foodtruck-list/foodtruck-list.component';
import { FoodtruckFormComponent } from './foodtruck-form/foodtruck-form.component';
import { StageFormComponent } from './admin/stage-form/stage-form.component';
import { StageAdminListComponent } from './admin/stageAdmin-list/stageAdmin-list.component';
import { TicketFormComponent } from './admin/ticket-form/ticket-form.component';
import { TicketListComponent } from './admin/ticket-list/ticket-list.component';

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
  {
    path: 'admin/stage',
    component: StageAdminListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/stage/form',
    component: StageFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/ticket',
    component: TicketListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/ticket/form',
    component: TicketFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/sponsor',
    component: SponsorListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/sponsor/form',
    component: SponsorFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/foodtruck',
    component: FoodtruckListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/foodtruck/form',
    component: FoodtruckFormComponent,
    canActivate: [AuthGuard],
  },

  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'artist', component: ArtistComponent },
  { path: 'artist/:id', component: ArtistDetailComponent },
  { path: 'order-ticket', component: OrderTicketComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];
