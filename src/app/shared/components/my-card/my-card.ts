import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'app-my-card',
  imports: [],
  templateUrl: './my-card.html',
})
export class MyCard {
  @Input() header: string | null = null
  @Input() headerAfter: string | null = null
  @HostBinding('class') hostClass = 'bg-white p-5 rounded-xl shadow-sm block';
}
