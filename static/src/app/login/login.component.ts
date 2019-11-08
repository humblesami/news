import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { $ } from 'protractor';
import {  AuthService,  LinkedinLoginProvider, GoogleLoginProvider} from 'angular-6-social-login-v2';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
declare var auth2: any;
declare var FB: any;
declare var gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: string;
  submitted = false;
  response_type: 'code'
  client_id: '78aslxtx2qqi8r'
  redirect_uri: 'https://localhost:4200'
  state: 'aRandomString'
  returnUrl: string;

  constructor(
    private socialAuthService: AuthService,
    private router: Router,
    private route: ActivatedRoute, 
    private http: HttpClient,
    private loginservice : LoginService,
    ) { }



  showConfig() {
    this.loginservice.getConfig().subscribe((data) =>  {
          console.log(data);
          
      });
  }
    username = '';
    password = '';
    res =  undefined
    
socialSignIn(socialPlatform) {
  let obj_this = this;
  let socialPlatformProvider;
  if (socialPlatform == "linkedin") {
    socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    
  }else if(socialPlatform == "google"){
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
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
    // submitLogin(){
    //   console.log("submit login to facebook");
    //   // FB.login();
    //   FB.login((response)=>
    //       {
    //         console.log('submitLogin',response);
    //         if (response.authResponse)
    //         {
    //           FB.api(
    //             '/me',
    //             'GET',
    //             {"fields":"id,name"},
    //             function(response) {
    //               console.log(response);

    //               // Insert your code here
    //             }
    //           );
    //           //login success
    //           //login success code here
    //           //redirect to home page
    //          }
    //          else
    //          {
    //          console.log('User login failed');
    //        }
    //     });

    // }
 
  ngOnInit() {
    // (window as any).fbAsyncInit = function() {
    //   FB.init({
    //     appId      : '2460824704240393',
    //     cookie     : true,
    //     xfbml      : true,
    //     version    : 'v5.0'
    //   });
    //   FB.AppEvents.logPageView();
    // };

    // (function(d, s, id){
    //    var js, fjs = d.getElementsByTagName(s)[0];
    //    if (d.getElementById(id)) {return;}
    //    js = d.createElement(s); js.id = id;
    //    js.src = "https://connect.facebook.net/en_US/sdk.js";
    //    fjs.parentNode.insertBefore(js, fjs);
    //  }(document, 'script', 'facebook-jssdk'));

    //  this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = (user != null);
      // });


    if(window['pathname'] == '/logout'){
      window['current_user'].logout();
      window.location.href = '/login';
    }
    function onSignIn(googleUser){
      alert("sdfasdfasdf");
      setTimeout(function(){
        this.onSignIn1(googleUser);
      },100);
    }

  }
  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
  onSignIn1(googleUser) {
    var profile = googleUser.getBasicProfile();
    if(profile){
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present. 
    }

  } 
 
}
