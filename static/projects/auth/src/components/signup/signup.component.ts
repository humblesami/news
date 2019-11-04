import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  error: string;
  submitted = false;
  data = {
    'first_name' : '',
    'last_name' : '',
    'email' : '',
    'password' : '',
    'c_password' : ''

  }
  returnUrl: string;
  constructor() { }

  onSubmit(){
    let obj_this = this;
    obj_this.submitted = true;

    // localStorage.setItem("lastname","12");

    let params = {
        first_name: obj_this.data.first_name,
        last_name: obj_this.data.last_name,
        email : obj_this.data.email,
        password : obj_this.data.password

    };
    let args = {
      app: 'auth_app',
      model: 'Profile',
      method: 'save_profile'
    }
    var input_data = {
      args : args,
      params: params
    };

    var res =  undefined
    res = window['ajax_request'](input_data);
    if (res){
      console.log(res);
    }
    var success_cb = function (res) {
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
