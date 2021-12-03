import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthScreenComponent } from './auth-screen/auth-screen.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { OtpBlockComponent } from './otp-block/otp-block.component';
import { MobileLoginComponent } from './mobile-login/mobile-login.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

@NgModule({
  declarations: [
    LoginComponent,
    AuthScreenComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    OtpBlockComponent,
    MobileLoginComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
  ]
})
export class AuthModule { }
