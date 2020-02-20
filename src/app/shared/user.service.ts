import { Injectable, ɵɵresolveBody } from '@angular/core';

import { User } from './user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  myUser: User = {
    fullname: '',
    email: '',
    password: ''
  };
  apiUrl = '';
  constructor(private http: HttpClient, private userService: UserService) { this.apiUrl = environment.apiUrl + '/register'; }

  newUser(user: User) {
    return this.http.post(this.apiUrl, user);
  }

  userLogin(authCredentials) {
      return this.http.post(environment.apiUrl + '/login', authCredentials);

  }

  getusername() {
      let token = '';
      if (localStorage.getItem('rememberme') === 'true') {
         token = localStorage.getItem('token');
      } else {
         token = sessionStorage.getItem('token');
      }
        
      return this.http.get(environment.apiUrl + '/username',{
        observe: 'body',
        //params: new HttpParams().append('token', localStorage.getItem('token'))
        params: new HttpParams().append('token', token)
      });
  }
}
