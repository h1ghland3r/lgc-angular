import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  aboutDescription: string = 'Hi, I am Railan Barbosa and I\'ve been working as a Front End Developer. In this small project I am showing off some of my knowledge developing Angular applications.';
  aboutSocial: string = 'You can find me on:';

  constructor() { }

  ngOnInit(): void {
  }

}
