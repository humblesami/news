import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { $ } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  
  error: string;
  submitted = false;

  returnUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,  
    ) { }

    username = '';
    password = '';
  onSubmit(){

    this.submitted = true;

    let obj_this = this;
    // localStorage.setItem("lastname","12");

    let params = {
        login: this.username,
        password: this.password,            
    };
    let args = {
      app: 'auth_app',
      model: 'AuthUser',
      method: 'login_user'
    }
    var input_data = {
      args : args,
      params: params
    };

    window['ajax_request'](input_data);

    var success_cb = function (user) {
      alert("Success");

    };
    var failure_cb = function (error) {
        if(typeof(error) != 'string')
        {
            error ='Could not connect to server';
        }            
        obj_this.error = error;
      };
    }
  

  ngOnInit() {

    
  }

}
