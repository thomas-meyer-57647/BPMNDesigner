import { Component, OnInit } from '@angular/core';

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
  errorMsg: string = "Input not correct";
  
  constructor() { }

  ngOnInit(): void {
  }

  /**
   * login the app
   */
  doLogin() {
    if ( this.username == "thomas" && this.password == "meyer" ) {
      this.loggedIn = true;
      this.showErrorMsg = false;
    } else {
      this.loggedIn = false;
      this.showErrorMsg = true;
    }
  }
}
