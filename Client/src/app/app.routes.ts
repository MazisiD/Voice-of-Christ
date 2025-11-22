import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { BranchesComponent } from './components/branches/branches.component';
import { PastorsComponent } from './components/pastors/pastors.component';
import { TestimoniesComponent } from './components/testimonies/testimonies.component';
import { EventsComponent } from './components/events/events.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'branches', component: BranchesComponent },
  { path: 'pastors', component: PastorsComponent },
  { path: 'testimonies', component: TestimoniesComponent },
  { path: 'events', component: EventsComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
