import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'supply-space-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  email = new FormControl('');
  hideSuccessMessage;
  constructor(private as: AuthService, private router: Router) {}

  ngOnInit(): void {}

  sendResetPasswordLink() {
    const emailValue = this.email.value;
    this.as.forgotPassword(emailValue).then(() => {
      this.hideSuccessMessage = true;
      setTimeout(() => {
        this.hideSuccessMessage = false;
        this.router.navigate(['']);
      }, 4000);
    });
  }
}
