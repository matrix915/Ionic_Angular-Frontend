import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  registrationSuccessfull: boolean;
  constructor(private alert: AlertController,  private  userService: UserService) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }

    console.log(form.value);
    this.userService.newUser(form.value).subscribe(
      res => {this.showSignAlert(); },
      err => {
            if (err.status === 422) {
              const errMsg = err.error.join('<br/>');
              this.showAlertError(errMsg);
            }
        }
    );
  }
  showSignAlert() {
    this.alert.create({
      header : 'Singup Success',
      message : 'Successfully Signed up',
      buttons: [
        {
          role: 'cancel',
          text: 'Close'
        }
      ]
    }).then(m => m.present());
  }

  showAlertError(errMsg: string) {
    this.alert.create({
      header : 'Singup Failed',
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
