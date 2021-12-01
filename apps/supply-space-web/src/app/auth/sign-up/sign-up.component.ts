import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'supply-space-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm:FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
      this.signUpForm = this.fb.group({
          name:['',Validators.required],
          mobile:['',Validators.required],
          email:['',Validators.required],
      })
  }

  signUp(){
    
  }

}
