import { Component } from '@angular/core';
import { StringDecoder } from 'string_decoder';

@Component({
  selector: 'app-state-display',
  imports: [],
  templateUrl: './state-display.html',
  styleUrl: './state-display.scss',
})
export class StateDisplay {
  protected message: string = '';
}
