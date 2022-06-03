import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DienstleistungComponent } from './myDienstleistung/dienstleistung.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './common/auth.guard';
import { HomeComponent } from './home/home.component';
import { DienstDetailComponent } from './dienst-detail/dienst-detail.component';
import {AboutUsComponent} from "./about-us/about-us.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: ':userEmail/myDienstleistungen',
    component: DienstleistungComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':userEmail/home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':userEmail/:dienstId/detail',
    component: DienstDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponents = [AppComponent, DienstleistungComponent];
