import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient,) { }

  configUrl = 'https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=77newbkm19tpbo&redirect_uri=http://localhost:4200/auth/linkedin/callback&state=987654321';

  getConfig() {
    return this.http.get(this.configUrl);
  }
}
