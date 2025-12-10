import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink
  ],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  routes = [
    {
      label: 'Главная',
      value: '/',
    },
    {
      label: 'Исполнители',
      value: '/artists',
    },
  ]
}
