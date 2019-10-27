import { Component } from '@angular/core';
import {UserService} from 'projects/tools/src/lib/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'auth';
  constructor(helloWorld: UserService) {
    this.title = helloWorld.message;
  }
}
