import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { MainComponent } from './components/layout/main/main.component';


const routes: Routes = [
//    { path: '/login', component: LoginComponent },                    // Login screen
//    { path: '', component: MainComponent }                            // app screen
      { path: 'login', component: LoginComponent },                    // Login screen
      { path: 'welcome', component: MainComponent }                    // app screen
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
/*
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { MainComponent } from './components/layout/main/main.component';
// import { CanvasComponent } from './components/canvas/canvas.component';
// import { ErrorComponent } from './components/layout/error/error.component';


const routes: Routes = [
//    { path: '/login', component: LoginComponent },                    // Login screen
    { path: '', component: MainComponent }                              // app screen
//  { path: 'document/new', component: CanvasComponent, canActivate:[RouteGuardService] },
//  { path: '**', component: ErrorComponent 
];

//  { path: '', component: LoginComponent  },//canActivate, RouteGuardService
//  { path: 'login', component: LoginComponent },
//  { path: 'welcome/:name', component: WelcomeComponent, canActivate:[RouteGuardService]},
//  { path: 'todos', component: ListTodosComponent, canActivate:[RouteGuardService] },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
*/