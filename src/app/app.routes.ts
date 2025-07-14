// src/app/app.routes.ts
import { Routes } from '@angular/router';
// Update the import path to the actual location of HomeComponent
// Update the import path below to the correct location of HomeComponent
// Example: import { HomeComponent } from './pages/home/home.component';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: HomeComponent },
];
