import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  reactiveForm: FormGroup;
  error: string;
  submitted = false;

  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,  
    ) { }

  onSubmit(){

    this.submitted = true;
        // stop here if form is invalid
    if (this.reactiveForm.invalid) {
        return;
    }

    let obj_this = this;

    let input_data = {
        login: this.f.username.value,
        password: this.f.password.value,            
    };
    console.log(input_data);
    input_data['app_name'] = "test";
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
  

  get f() { return this.reactiveForm.controls; }

  ngOnInit() {

    var login_info = { username : '', password: ''};
    this.reactiveForm = this.fb.group({
        username: [login_info.username, Validators.required],
        password: [login_info.password, Validators.required]
    });
  }

}
