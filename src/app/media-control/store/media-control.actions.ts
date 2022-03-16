import { createAction, props } from "@ngrx/store"
import { InputDevice, OutputDevice } from "./../../../_albedo/audio";

// Input

export const refreshMediaInputsAction = createAction(
  '[Media Control] Refresh Inputs'
)

export const changeSelectedMediaInputAction = createAction(
  '[Media Control] Change Selected Input',
  props<{selectedId: string | null}>()
)

export const refreshMediaInputsSucceededAction = createAction(
  '[Media Control] Refresh Inputs Succeeded',
  props<{inputs: Array<InputDevice>}>()
)

export const changeInputGainAction = createAction(
  '[Media Control] Change Input Gain',
  props<{gain: number}>()
)

export const changeInputIsMutedAction = createAction(
  '[Media Control] Change Input Is Muted',
  props<{isMuted: boolean}>()
)

// Output

export const refreshMediaOutputsAction = createAction(
  '[Media Control] Refresh Outputs'
)

export const changeSelectedMediaOutputAction = createAction(
  '[Media Control] Change Selected Output',
  props<{selectedId: string | null}>()
)

export const refreshMediaOutputsSucceededAction = createAction(
  '[Media Control] Refresh Outputs Succeeded',
  props<{outputs: Array<OutputDevice>}>()
)