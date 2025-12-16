import {Component, Inject, PLATFORM_ID, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NotificationComponent} from './features/notifications/components/notification/notification';
import {AuthService} from './features/auth/services/auth.service';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NotificationComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('music-front-ng');
  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      if (this.authService.accessToken()) {
        this.authService.me();
      }
    }
  }
}
