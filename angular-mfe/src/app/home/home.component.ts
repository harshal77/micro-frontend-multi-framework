import { Component, OnInit } from '@angular/core';
declare const require: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  angularVersion = require('./../../../package.json').dependencies['@angular/core'];

  constructor() { }

  ngOnInit(): void {
  }

}
