import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Sidebar} from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.html',
  imports: [
    RouterOutlet,
    Sidebar
  ],
})
export class MainLayout {}
