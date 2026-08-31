import { Component } from '@angular/core';

@Component({
  selector: 'app-state-input',
  imports: [],
  templateUrl: './state-input.html',
  styleUrl: './state-input.scss',
})
export class StateInput {
  protected message: string = '';

  onMessageChange(event: Event): void {
    this.message = (event.target as HTMLInputElement).value;
  }
}
