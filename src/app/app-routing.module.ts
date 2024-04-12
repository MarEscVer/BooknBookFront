import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginAndRegisterComponent } from './components/loginAndRegister/login-and-register/login-and-register.component';
import { HomeComponent } from './components/home/home/home.component';
import { ListClicksComponent } from './components/home/listClicks/list-clicks.component';

const routes: Routes = [
  {path: "", component: LoginAndRegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "home", component: HomeComponent },
  {path: "listClick", component: ListClicksComponent},
  //{path: "/libros/{id}/details", component: ListClicksComponent}
  //{path: "admin", component: ZonaAdminComponent, canActivate: [AdminAuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,FontAwesomeModule]
})
export class AppRoutingModule { }