import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { MainComponent } from './components/layout/main/main.component';
import { ErrorComponent } from './components/layout/error/error.component';
import { RouteGardService } from './service/route-gard.service';


const routes: Routes = [
      { path: 'login', component: LoginComponent },                    // Login screen
      { path: '', component: MainComponent, canActivate: [RouteGardService] },                          // app screen
      { path: '**', component: ErrorComponent }                        // error page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
