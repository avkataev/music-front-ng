import {Component, DOCUMENT, inject, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private document = inject(DOCUMENT);
  protected readonly title = signal('music-front-ng');
  ngOnInit() {
    const link = this.document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Alegreya+Sans:ital,wght@0,300;0,400;0,700;1,300&display=swap&subset=latin,latin-ext,cyrillic';
    this.document.head.appendChild(link);
  }
}
