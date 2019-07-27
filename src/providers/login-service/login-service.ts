import {Injectable} from "@angular/core";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase';

@Injectable()
export class LoginServiceProvider {
  constructor(private firebaseAuth: AngularFireAuth) {
  }
  registerWithEmail(email: string, password: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  loginWithEmail(email: string, password:string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }
  googlelogin() {
    return this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  getStatus() {
    return this.firebaseAuth.authState;
  }
  logout()
  {
    return this.firebaseAuth.auth.signOut()
  }
}