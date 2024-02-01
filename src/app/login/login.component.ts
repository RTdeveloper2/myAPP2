import { Component } from '@angular/core';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-auth',
  template: `
    <div *ngIf="authService.user$ | async as user; else loginButton">
      <p>Hello, {{ user.displayName }}!</p>
      <button (click)="signOut()">Sign Out</button>
    </div>
    <ng-template #loginButton>
      <button (click)="signInWithGoogle()">Sign In with Google</button>
    </ng-template>
  `,
})
export class AuthComponent {
  constructor(public authService: AuthService) {}

  async signInWithGoogle(): Promise<void> {
    try {
      await this.authService.signInWithGoogle();
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.authService.signOut();
    } catch (error) {
      console.error('Sign Out Error:', error);
    }
  }
}
