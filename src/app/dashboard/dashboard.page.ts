import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  loggedinuser = '';
  constructor(private router: Router, private userService: UserService) {

     
   }

  ngOnInit() {

  }
  ionViewWillEnter() {
     this.userService.getusername().subscribe(
      data => {
          this.loggedinuser = data['message']; console.log(data['message']);
      },
      err => {this.router.navigate(['../login']); }
    );
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['../login']);
  }
}
