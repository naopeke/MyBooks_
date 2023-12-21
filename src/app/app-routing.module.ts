import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BooksComponent } from './pages/books/books.component';
import { TemperatureTestComponent } from './pages/temperature-test/temperature-test.component';

const routes: Routes = [
  {path: "", component:HomeComponent},
  {path: "home", component:HomeComponent},
  {path: "profile", component:ProfileComponent},
  {path: "register", component:RegisterComponent},
  {path: "books", component:BooksComponent},
  // {path: "temperature", component:TemperatureTestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
