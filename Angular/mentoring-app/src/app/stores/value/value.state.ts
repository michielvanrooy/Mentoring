import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UpdateValue } from './value.action';

export interface ValueStateModel {
  value: string;
}

@State<ValueStateModel>({
  name: 'value',
  defaults: {
    value: ''
  }
})
@Injectable()
export class ValueState {
  @Selector()
  static value(state: ValueStateModel): string {
    return state.value;
  }

  @Action(UpdateValue)
  updateValue(ctx: StateContext<ValueStateModel>, action: UpdateValue) {
    ctx.patchState({ value: action.value });
  }
}
