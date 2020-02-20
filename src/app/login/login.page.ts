import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isChecked = false;
  isRememberMe = false;
  constructor(private alertCtrl: AlertController, private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  onSubmitLogin(form: NgForm) {
    // console.log("Submitting");
    this.userService.userLogin(form.value).subscribe(
      data => {
          // const json = JSON.parse(data);
          console.log(data['token']);

          // this.showAlertError('Logged in Successfully!!!!');

          if(this.isChecked === true) {
           localStorage.setItem('rememberme', 'true');
           localStorage.setItem('token', data['token']);
          } else {
           localStorage.setItem('rememberme', 'false');
           sessionStorage.setItem('token', data['token']);
          }

           // Set session storage 
          // if(this.isRememberMe === true) {
             
          //    localStorage.removeItem('token');//Clear alredy stored toke locally
          //    localStorage.setItem('rememberme',isRememberMe);
          //    sessionStorage.setItem('token', data['token']); // Set session storage
          // } else {
          //     sessionStorage.removeItem('token');
          //     localStorage.setItem('token', data.token);

          // }
          this.router.navigate(['/dashboard']);
      },
      err => {
            console.log(err);
            console.log("Checked=="+this.isChecked);
            this.showAlertError(err.error);
      }
    );
  }

  onRememberMeClick(vl) {
   // console.log("value="+vl);
  }
  onLoginClick() {
    this.alertCtrl.create({
      header: 'Logn Status',
      message: 'You have been logged in successfully',
      buttons: [
        {
          text: 'Close',
          role : 'cancel'
        }
      ]
    })
    .then(ctrl => ctrl.present());
  }

   showAlertError(errMsg: string) {
    this.alertCtrl.create({
      header : 'Login Failed',
      message : errMsg,
      buttons: [
        {
          role: 'cancel',
          text: 'Close'
        }
      ]
    }).then(m => m.present());
  }
}
