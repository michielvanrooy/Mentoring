import { Component } from '@angular/core';
import { HeaderMenu } from '../header-menu/header-menu';
import { NonStateDisplay } from '../non-state-display/non-state-display';

@Component({
  selector: 'app-non-state-example',
  imports: [HeaderMenu, NonStateDisplay],
  templateUrl: './non-state-example.html',
  styleUrl: './non-state-example.scss',
})
export class NonStateExample {
  protected message: string = '';

  onMessageChange(event: Event): void {
    this.message = (event.target as HTMLInputElement).value;
  }
}
  