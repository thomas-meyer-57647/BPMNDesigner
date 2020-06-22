import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  loggedIn: boolean = false;
  showErrorMsg: boolean = false;
  errorMsg: string = "Username or Password invalid";
  
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * log in the app
   */
  doLogin() {
    if ( this.auth.authenticate(this.username, this.password) ) {
      this.loggedIn = true;
      this.showErrorMsg = false;
      this.router.navigate(['']);
    } else {
      this.loggedIn = false;
      this.showErrorMsg = true;
    }
  }
}
