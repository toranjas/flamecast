import { createSelector, createFeatureSelector } from '@ngrx/store';
import { compareDeviceName } from '../media-control.utils';
import { MediaControlState } from './media-control.reducers';

// ██████  ███████ ██    ██ ██  ██████ ███████ ███████
// ██   ██ ██      ██    ██ ██ ██      ██      ██
// ██   ██ █████   ██    ██ ██ ██      █████   ███████
// ██   ██ ██       ██  ██  ██ ██      ██           ██
// ██████  ███████   ████   ██  ██████ ███████ ███████

export const selectInputs = createSelector(
  createFeatureSelector('mediaControl'),
  (state: MediaControlState) =>
    state.inputs
      .map((input) => ({
        ...input,
        isSelected: input.id === state.selectedInputId,
      }))
      .sort(compareDeviceName),
);

export const selectOutputs = createSelector(
  createFeatureSelector('mediaControl'),
  (state: MediaControlState) =>
    state.outputs
      .map((output) => ({
        ...output,
        isSelected: output.id === state.selectedOutputId,
      }))
      .sort(compareDeviceName),
);

export const selectSelectedDeviceIds = createSelector(
  createFeatureSelector('mediaControl'),
  (state: MediaControlState) => ({
    selectedInputId: state.selectedInputId,
    selectedOutputId: state.selectedOutputId,
  }),
);





export const selectInputGain = createSelector(
  createFeatureSelector('mediaControl'),
  (state: MediaControlState) => ({
    gain: state.inputGain
  })
);

export const selectInputIsMuted = createSelector(
  createFeatureSelector('mediaControl'),
  (state: MediaControlState) => ({
    isMuted: state.inputIsMuted
  })
);

