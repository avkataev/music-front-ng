import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NotificationService, Notification} from '../../services/notifications.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  templateUrl: './notification.html',
})
export class NotificationComponent implements OnInit {
  notifications: Array<{ id: number; data: Notification; fading: boolean }> = [];
  counter = 0;

  constructor(private ns: NotificationService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.ns.notifications$.subscribe(n => this.addNotification(n));
  }

  private addNotification(n: Notification) {
    const id = ++this.counter;
    this.notifications.push({ id, data: n, fading: false });
    const timeout = n.timeout ?? 3000;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.notifications = this.notifications.map(x => x.id === id ? { ...x, fading: true } : x);

      setTimeout(() => {
        this.notifications = this.notifications.filter(x => x.id !== id);
        this.cdr.detectChanges();
      }, 100);

    }, timeout);
  }
}
