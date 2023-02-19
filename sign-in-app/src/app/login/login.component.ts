import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { AuthService } from '../logout/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private service: AuthService,
    private _ngZone: NgZone
  ) {}

  ngOnInit(): void {
    //@ts-ignore
    window.onGoogleLibraryLoad = () => {
      //@ts-ignore
      google.accounts.id.initialize({
        client_id:
          '1090664328754-8bobfc3pat785enf9n0p1i9r9hjfopbd.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      //@ts-ignore
      google.accounts.id.renderButton(
        //@ts-ignore
        document.getElementById('buttonDiv'),
        { theme: 'outline', size: 'large', width: '100%' }
      );
      //@ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => {});
    };
  }

  async handleCredentialResponse(response: CredentialResponse) {
    await this.service.loginWithGoogle(response.credential).subscribe(
      (x: any) => {
        localStorage.setItem('token', x.token);
        this._ngZone.run(() => {
          this.router.navigate(['/loggedIn']);
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
