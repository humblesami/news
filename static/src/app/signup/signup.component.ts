import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { $ } from 'protractor';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  error: string;
  error_type : string;
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
      if(!obj_this.data.first_name || !obj_this.data.last_name || !obj_this.data.email || !obj_this.data.password || !obj_this.data.c_password){
        obj_this.error_type = "danger"
        obj_this.error = "Please fill all required fields";
        setTimeout(function(){
          obj_this.error_type = ""
          obj_this.error = "";      
        },3000);
        return;
      }
      if(obj_this.data.password != obj_this.data.c_password){
        obj_this.error_type = "danger"
        obj_this.error = "Password not match";
        // $('#password').values("");
        // $('#c_password').values("");
        setTimeout(function(){
          obj_this.error_type = ""
          obj_this.error = "";      
        },3000);
        return;
      }


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
      obj_this.error = "";
      obj_this.error_type = "";
      var call_backs = {
        success: function(data){
          obj_this.error = "User Created Successfully";
          obj_this.error_type = "success"
          setTimeout(function(){
            window.location.href = '/login';
          },100)
          // window.location.href= '';
        },
        error: function(error){
          if(typeof(error) != 'string')
          {
              obj_this.error ='Could not connect to server';
          }
          obj_this.error = error;
          obj_this.error_type = "danger"
          }
        };
      window['ajax_request'](input_data, call_backs);
      
    }

    username_validate(){
      let obj_this = this;

      let params = {
        email : obj_this.data.email  
      };

      let args = {
        app : 'auth_app',
        model : 'AuthUser',
        method : 'email_verify'
      }
      var input_data = {
        args : args,
        params : params
      }

      var call_backs = {
        success : function(data){
          obj_this.error = "Email is valid";
          obj_this.error_type = "success"
          
        },
        error: function(error){
          if(typeof(error) != 'string')
          {
              obj_this.error ='Could not connect to server';
          }
          obj_this.error = error;
          obj_this.error_type = "danger";
          obj_this.data.email = "";  
        }

        }

        
        window['ajax_request'](input_data, call_backs);
        setTimeout(function(){
          obj_this.error_type = ""
          obj_this.error = "";      
        },3000);
    }


  ngOnInit() {
  }

}
