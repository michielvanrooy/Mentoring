import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { UpdateValue } from '../../stores/value/value.action';

@Component({
  selector: 'app-state-input',
  imports: [],
  templateUrl: './state-input.html',
  styleUrl: './state-input.scss',
})
export class StateInput {
  private readonly store = inject(Store);

  protected message: string = '';

  onMessageChange(event: Event): void {
    this.message = (event.target as HTMLInputElement).value;
    this.store.dispatch(new UpdateValue(this.message));
  }
}
