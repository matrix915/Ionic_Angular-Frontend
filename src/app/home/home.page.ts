import { Component } from '@angular/core';
import { UserService } from '../shared/user.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private userService: UserService, private http: HttpClient, private router: Router) {}
  ionViewWillEnter() {
    // this.userService.getusername(localStorage.getItem('token'))
    console.log("AAAAAAAAAAAAAAAAAa");
    let token = '';
    if (localStorage.getItem('rememberme') === 'true') {
         token = localStorage.getItem('token');
      } else {
         token = sessionStorage.getItem('token');
      }

    this.http.get(environment.apiUrl + '/username', {
        observe: 'body',
        // params: new HttpParams().append('token', localStorage.getItem('token'))
        params: new HttpParams().append('token', token)
      }).subscribe(result => {console.log(result);this.router.navigate(['/dashboard'])});
  }
}
