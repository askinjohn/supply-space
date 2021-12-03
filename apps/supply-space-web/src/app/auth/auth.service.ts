import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { DatastoreService } from '@supply-space/dataservice';
import { AngularFireFunctions} from '@angular/fire/compat/functions'
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  allUsers: any;
  constructor(
    private afa: AngularFireAuth,
    private router: Router,
    private ds: DatastoreService,
    private aff:AngularFireFunctions
  ) {
    this.getAllUsers();
  }

  login(email: string, password: string) {
    return this.afa
      .signInWithEmailAndPassword(email, password)
      .then(() => this.router.navigate(['']))
      .catch((e) => console.error());
  }

  getAllUsers() {
    this.ds.getListByKey('users').subscribe((u) => {
      this.allUsers = u;
    });
  }

  logout() {
    return this.afa.signOut().then(() => this.router.navigate(['/login']));
  }

  forgotPassword(email) {
    return this.afa.sendPasswordResetEmail(email);
  }
  get user() {
    return this.afa.user;
  }

  get windowRef() {
    return window;
  }

  signInWithPhone(mobile, verifier) {
   return this.afa.signInWithPhoneNumber(mobile, verifier);
  }

  updateUserProfile(userId,value){
      this.ds.updateObjectValuesByKey(`users/${userId}`,{
        ...value,
        id:userId,
        role:'USER'
      })
  }

  checkIfNumberPresent(data) {
      return this.aff.httpsCallable('checkAuthentication')(data)
  }
}
