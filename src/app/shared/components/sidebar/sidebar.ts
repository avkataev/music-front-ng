import {Component, computed} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../features/auth/services/auth.service';
import {log} from 'node:util';


interface RouteItem {
  label: string;
  value?: string;
  class?: string
  action?: () => void;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  constructor(public auth: AuthService, private router: Router) {
  }

  baseRoutes: RouteItem[] = [
    {label: 'Главная', value: '/'},
    {label: 'Исполнители', value: '/artists'},
  ];

  routes = computed<RouteItem[]>(() => {
    if (this.auth.isAuthenticated()) {
      const user = this.auth.user();

      return [
        ...this.baseRoutes,
        {
          label: user?.name ?? 'Профиль',
          value: '/profile',
          class: 'ml-auto',
        },
        {
          label: 'Выход',
          class: '',
          action: async () => {
            this.auth.logout()
            await this.router.navigate(['/'])
          },
        },
      ];
    }

    return [
      ...this.baseRoutes,
      {
        label: 'Вход',
        value: '/',
        class: 'ml-auto',
      },
      {
        label: 'Регистрация',
        value: '/register',
      },
    ];
  });
}
