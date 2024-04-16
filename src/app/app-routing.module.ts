import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginAndRegisterComponent } from './components/loginAndRegister/login-and-register/login-and-register.component';
import { HomeComponent } from './components/home/home/home.component';
import { ListClicksComponent } from './components/home/listClicks/list-clicks.component';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { AdminPageUsersComponent } from './components/admin/admin-page-users/admin-page-users.component';
import { AdminPageClubsComponent } from './components/admin/admin-page-clubs/admin-page-clubs.component';

const routes: Routes = [
  {path: "", component: LoginAndRegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "home", component: HomeComponent },
  {path: "listClick", component: ListClicksComponent},
  {path: "admin", component: AdminPageComponent},
  {path: "admin/usuarios", component: AdminPageUsersComponent},
  {path: "admin/clubes", component: AdminPageClubsComponent},
  //{path: "/libros/{id}/details", component: ListClicksComponent}
  //{path: "admin", component: ZonaAdminComponent, canActivate: [AdminAuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,FontAwesomeModule]
})
export class AppRoutingModule { }
