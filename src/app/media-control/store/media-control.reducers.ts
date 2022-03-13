import { createReducer, on } from "@ngrx/store";
import { InputDevice, OutputDevice } from "./../../../_albedo/audio";
import { refreshMediaInputsSucceededAction, changeSelectedMediaInputAction, refreshMediaOutputsSucceededAction, changeSelectedMediaOutputAction } from "./media-control.actions";

export interface MediaControlState {

  inputs: Array<InputDevice>;
  selectedInputId: string | null;

  outputs: Array<OutputDevice>;
  selectedOutputId: string | null;

}


const initialState: MediaControlState = {

  inputs: [],
  selectedInputId: null,
  
  outputs: [],
  selectedOutputId: null,

}



export const mediaControlReducer = createReducer(
  initialState,

  on(refreshMediaInputsSucceededAction, (state, { inputs }) => {
    return {
      ...state,
      inputs,
    };
  }),

  on(changeSelectedMediaInputAction, (state, { selectedId }) => {
    return {
      ...state,
      selectedInputId: selectedId,
    };
  }),

  on(refreshMediaOutputsSucceededAction, (state, { outputs }) => {
    return {
      ...state,
      outputs,
    };
  }),

  on(changeSelectedMediaOutputAction, (state, { selectedId }) => {
    return {
      ...state,
      selectedOutputId: selectedId,
    };
  }),
);