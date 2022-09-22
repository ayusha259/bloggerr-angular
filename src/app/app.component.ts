import { ViewportScroller } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event, Router, Scroll } from '@angular/router';
import { filter, Subscription, take } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { IsLoadingService } from './loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isAuth: boolean = false;
  isAuthSub: Subscription;
  constructor(
    private auth: AuthService,
    router: Router,
    viewportScroller: ViewportScroller,
    isLoading: IsLoadingService
  ) {
    router.events
      .pipe(filter((event: Event): event is Scroll => event instanceof Scroll))
      .subscribe((e) => {
        if (e.position) {
          const loading = isLoading.loading.getValue();
          if (!loading) {
            setTimeout(() => {
              viewportScroller.scrollToPosition(e.position);
            }, 100);
          }
        }
      });
  }

  ngOnInit(): void {
    this.auth.autoLogin();
    this.isAuthSub = this.auth.isAuth.subscribe((state) => {
      this.isAuth = state;
    });
  }

  ngOnDestroy(): void {
    this.isAuthSub.unsubscribe();
  }
}
