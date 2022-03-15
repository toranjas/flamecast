import { createReducer, on } from "@ngrx/store";
import { InputDevice, OutputDevice } from "./../../../_albedo/audio";
import { refreshMediaInputsSucceededAction, changeSelectedMediaInputAction, refreshMediaOutputsSucceededAction, changeSelectedMediaOutputAction, changeInputGainAction, changeInputIsMutedAction } from "./media-control.actions";

export interface MediaControlState {

  // Input
  inputs: Array<InputDevice>;
  selectedInputId: string | null;

  inputGain: number,
  inputIsMuted: boolean;

  // Output
  outputs: Array<OutputDevice>;
  selectedOutputId: string | null;

}


const initialState: MediaControlState = {

  // Input
  inputs: [],
  selectedInputId: null,
  inputGain: 1.0,
  inputIsMuted: false,

  //Output
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


  on(changeInputGainAction, (state, { gain }) => {
    return {
      ...state,
      inputGain: gain,
    };
  }),

  on(changeInputIsMutedAction, (state, { isMuted }) => {
    return {
      ...state,
      inputIsMuted: isMuted,
    };
  }),




);