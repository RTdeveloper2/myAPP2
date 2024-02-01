import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import auth from 'firebase/compat/app';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<auth.User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private angularFireAuth: AngularFireAuth) {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userSubject.next(user);
      } else {
        this.userSubject.next(null);
      }
    });
  }

  signInWithGoogle(){
    const provider = new GoogleAuthProvider();
    return this.angularFireAuth.signInWithPopup(provider);
  }

  signOut(): Promise<void> {
    return this.angularFireAuth.signOut();
  }
}
