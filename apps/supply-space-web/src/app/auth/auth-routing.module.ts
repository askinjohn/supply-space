import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthScreenComponent } from './auth-screen/auth-screen.component';
import { LoginComponent } from './login/login.component';

const routes:Routes=[
{
  path:'',
  component:AuthScreenComponent,
  children:[
    {
      path:'',
      component:LoginComponent
    }
  ]
}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class AuthRoutingModule { }
