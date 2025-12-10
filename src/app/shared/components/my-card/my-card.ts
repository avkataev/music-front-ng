import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-my-card',
  imports: [],
  templateUrl: './my-card.html',
})
export class MyCard {
  @Input() header: string | null = null
  @Input() headerAfter: string | null = null
}
