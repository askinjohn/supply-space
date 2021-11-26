import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {
  AngularFireAuthGuard,
  AngularFireAuthGuardModule,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const routes:Routes = [
{
  path:'login',
  loadChildren:()=>import('./auth/auth.module').then((m)=>m.AuthModule)
},
{
  path:'',
  canActivate:[AngularFireAuthGuard],
  data: { authGuardPipe: redirectUnauthorizedToLogin },
  loadChildren:()=>import('./store/store.module').then((m)=>m.StoreModule)
}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
