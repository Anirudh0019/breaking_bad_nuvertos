import { Routes } from '@angular/router';
import { CompoundGalleryComponent } from './components/compound-gallery/compound-gallery.component';
import { CompoundDetailsComponent } from './components/compound-details/compound-details.component';
import { CompoundEditComponent } from './components/compound-edit/compound-edit.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/compounds', pathMatch: 'full' },
  { path: 'compounds', component: CompoundGalleryComponent },
  { path: 'compounds/:id', component: CompoundDetailsComponent },
  { path: 'compounds/:id/edit', component: CompoundEditComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '/compounds' }
];