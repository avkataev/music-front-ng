import {Component, computed} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
  ],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  constructor(public auth: AuthService) {

  }

  baseRoutes = [
    {
      label: 'Главная',
      value: '/',
      class: ''
    },
    {
      label: 'Исполнители',
      value: '/artists',
      class: ''
    },
  ]
  routes = computed(() => {

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
          value: '/logout',
          class: '',
        },
      ];
    }

    return [
      ...this.baseRoutes,
      {
        label: 'Вход',
        value: '/login',
        class: 'ml-auto',
      },
      {
        label: 'Регистрация',
        value: '/register',
        class: '',
      },
    ];
    }
  )
}
