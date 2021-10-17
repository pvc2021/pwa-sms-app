import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PhoneLoginComponent } from './phone-login/phone-login.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
{path:'posts',component:PostsComponent},
{path:'phone-login',component:PhoneLoginComponent},
{path:'home',component:HomeComponent},
{path:'**',redirectTo:"home"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
