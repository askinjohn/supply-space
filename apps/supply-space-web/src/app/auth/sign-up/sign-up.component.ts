import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
@Component({
  selector: 'supply-space-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  disableSignUpButton: boolean;
  mobileNumber: any;
  constructor(private fb: FormBuilder, private as: AuthService,private router:Router) {
    this.windowRef = this.as.windowRef;
  }
  otpBlock = false;
  separateDialCode = true;
  PhoneNumberFormat = PhoneNumberFormat;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [
    CountryISO.India
  ];
  windowRef;
  errorMessage: string;
  user;
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
    });
    setTimeout(() => {
      // console.log('This is running');
      this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        'recaptcha-container',
        { size: 'invisible' }
      );
      this.windowRef.recaptchaVerifier.render();
    }, 500);
  }

  signUp() {
    this.mobileNumber = this.signUpForm.value.mobile['e164Number']
    this.signUpForm.value.mobile =  this.mobileNumber;
    console.log(this.signUpForm.value.mobile,'sss')
      this.as.checkIfNumberPresent( this.mobileNumber ).subscribe((user)=>{
        if(!user){
            this.sendOtp();
        }else{
          this.disableSignUpButton = true
          this.errorMessage = 'User already exists'
        }
      })
   
  
  }

  sendOtp() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    this.as
      .signInWithPhone( this.mobileNumber , appVerifier)
      .then((result) => {
        this.windowRef.confirmationResult = result;
        this.otpBlock = true;
      })
      .catch((e) => {
        this.errorMessage = 'Must Enter Valid number';
        this.signUpForm.reset();
      });
  }

  verifyOtp(otp) {
    this.windowRef.confirmationResult
      .confirm('' + otp)
      .then((result) => {
        this.user = result.user;
        console.log(this.user,'user')
        this.as.updateUserProfile(this.user.uid,this.signUpForm.value);
        this.router.navigate([''])
      })
      .catch((e) => {
        this.otpBlock = false;
      });
  }
}
