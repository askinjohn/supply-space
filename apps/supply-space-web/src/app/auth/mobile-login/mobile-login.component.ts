import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
@Component({
  selector: 'supply-space-mobile-login',
  templateUrl: './mobile-login.component.html',
  styleUrls: ['./mobile-login.component.scss']
})
export class MobileLoginComponent implements OnInit {

  mobile = new FormControl('',[Validators.required])
  disableLogin;
  otpBlock = false;
  windowRef: any;
  user: any;
  separateDialCode = true;
  PhoneNumberFormat = PhoneNumberFormat;
  CountryISO = CountryISO;
  errorMessage: string;
  preferredCountries: CountryISO[] = [
    CountryISO.India
  ];
  mobileNumber;
  constructor(private as:AuthService,private router:Router) { 
    this.windowRef = this.as.windowRef
  }


  ngOnInit(): void {
    setTimeout(() => {
      // console.log('This is running');
      this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        'recaptcha-container',
        { size: 'invisible' }
      );
      this.windowRef.recaptchaVerifier.render();
    }, 500);
  }

  signIn(){
    this.disableLogin = true;
    this.mobileNumber = this.mobile.value['e164Number']
    this.as.checkIfNumberPresent(this.mobileNumber).subscribe((user)=>{
      console.log(user)
      if(user){
          this.sendOtp();
      }else{
        this.disableLogin = true
        this.errorMessage = "User doesn't exists,Sign Up to access"
      }
    })
  }

  sendOtp() {
    
    const appVerifier = this.windowRef.recaptchaVerifier;
    console.log(this.mobileNumber)
    this.as
      .signInWithPhone(this.mobileNumber, appVerifier)
      .then((result) => {
        this.windowRef.confirmationResult = result;
        this.otpBlock = true;
      })
      .catch((e) => {
        this.errorMessage = 'Must Enter Valid number';
        this.mobile.reset();
      });
  }

  verifyOtp(otp) {
    this.windowRef.confirmationResult
      .confirm('' + otp)
      .then((result) => {
        this.user = result.user;
        console.log(this.user,'user')
        this.router.navigate([''])
      })
      .catch((e) => {
        this.otpBlock = false;
      });
  }

}
