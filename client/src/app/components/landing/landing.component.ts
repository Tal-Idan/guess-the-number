import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  title: string = "Welcome to Guess-The-Number!"

  constructor() { }

  ngOnInit(): void {
  }

}
