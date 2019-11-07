import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { $ } from 'protractor';
import {  AuthService,  LinkedinLoginProvider} from 'angular-6-social-login-v2';
declare var FB: any;
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
    private socialAuthService: AuthService,
    private router: Router,
    private route: ActivatedRoute, 
    
    ) { }


    username = '';
    password = '';
    res =  undefined
    
socialSignIn(socialPlatform) {
  let obj_this = this;
  let socialPlatformProvider;
  if (socialPlatform == "linkedin") {
    socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
  }
  
  
  obj_this.socialAuthService.signIn(socialPlatformProvider).then(function(userData){
      console.log(socialPlatform+" sign in data : " , userData);
      // Now sign-in with userData
      // ...
      },
      function(err){
        console.log(err);
      }
  );
  }
    
  

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

    var call_backs = {
      success: function(data){
        window['current_user'].onLogin(data);
        window.location.href= '/app1/one';
      },
      error: function(error){
        if(typeof(error) != 'string')
        {
            obj_this.error ='Could not connect to server';
        } 
        obj_this.error = error;
        setTimeout(function(){
          obj_this.error = "";
        },5000)  
      }
      };

    window['ajax_request'](input_data, call_backs);
    
    }
    submitLogin(){
      console.log("submit login to facebook");
      // FB.login();
      FB.login((response)=>
          {
            console.log('submitLogin',response);
            if (response.authResponse)
            {
              FB.api(
                '/me',
                'GET',
                {"fields":"id,name"},
                function(response) {
                  console.log(response);

                  // Insert your code here
                }
              );
              //login success
              //login success code here
              //redirect to home page
             }
             else
             {
             console.log('User login failed');
           }
        });

    }
 
  ngOnInit() {
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '2460824704240393',
        cookie     : true,
        xfbml      : true,
        version    : 'v5.0'
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));

    //  this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = (user != null);
    // });


    if(window['pathname'] == '/logout'){
      window['current_user'].logout();
      window.location.href = '/login';
    }
  }

}
