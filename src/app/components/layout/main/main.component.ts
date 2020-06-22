import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from 'src/app/service/data/welcome-data.service';

/**
 * this is the main page, out of login page
 */
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private service: WelcomeDataService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  getWelcomeMessage() {
    console.log( this.service.executeHelloWorldBeanService() );
    this.service.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessfulResponse(response),    // successfull
      error => this.handleErrorResponse(error)                // error
    );
  }

  handleSuccessfulResponse(response) {
    console.log(response);
    console.log(response.message);
  }

  handleErrorResponse(error) {
    console.log(error);
  }

}
