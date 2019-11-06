import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  cookie = undefined;

  constructor() { }

  ngOnInit() {
    this.cookie = window['current_user'].cookie
    console.log(this.cookie);
  }

}
