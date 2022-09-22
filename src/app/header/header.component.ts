import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth: boolean = false;
  isAuthSub: Subscription;
  user_name: string;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.isAuthSub = this.auth.isAuth.subscribe((state) => {
      this.isAuth = state;
      this.user_name = state ? this.auth.user.name : null;
    });
  }

  onLogout() {
    this.auth.logout();
  }

  ngOnDestroy(): void {
    this.isAuthSub.unsubscribe();
  }
}
