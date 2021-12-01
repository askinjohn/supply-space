import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afa: AngularFireAuth, private router: Router) {}

  login(email: string, password: string) {
    return this.afa
      .signInWithEmailAndPassword(email, password)
      .then(() => this.router.navigate(['']))
      .catch((e) => console.error());
  }
  logout() {
    return this.afa.signOut().then(() => this.router.navigate(['/login']));
  }

  forgotPassword(email) {
    return this.afa.sendPasswordResetEmail(email);
  }
  get user(){
    return this.afa.user
  }
  signUp(){

  }
}
