import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorNumber: string = '404';
  errorMessage: string = 'Page not found';
  backLinkText: string = 'Go to Designer';

  constructor() { }

  ngOnInit(): void {
  }

}
