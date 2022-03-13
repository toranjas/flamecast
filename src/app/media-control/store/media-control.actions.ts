

// ██████  ███████ ██    ██ ██  ██████ ███████ ███████ 
// ██   ██ ██      ██    ██ ██ ██      ██      ██      
// ██   ██ █████   ██    ██ ██ ██      █████   ███████ 
// ██   ██ ██       ██  ██  ██ ██      ██           ██ 
// ██████  ███████   ████   ██  ██████ ███████ ███████ 

import { createAction, props } from "@ngrx/store"
import { InputDevice, OutputDevice } from "./../../../_albedo/audio";

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