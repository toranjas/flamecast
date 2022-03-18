import { Injectable, Inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Devices } from "../../../_albedo/audio"
import { from, EMPTY } from "rxjs";
import { tap, mergeMap, map, catchError } from "rxjs/operators";
import { refreshMediaInputsAction, refreshMediaInputsSucceededAction, refreshMediaOutputsAction, refreshMediaOutputsSucceededAction, changeSelectedMediaInputAction, changeSelectedMediaOutputAction, changeInputGainAction, changeInputIsMutedAction } from "./media-control.actions";
import { MediaControlProvider } from '../../../_albedo/audio';

@Injectable()
export class MediaControlEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    @Inject('MediaControlProvider')
    private mediaControlProvider: MediaControlProvider

  ) {

    // Fire-and-forget setup of the audio graph with default values.
    // Not sure if this is the best way or the best place.
    // Maybe there is a way to pull the initial value from the store? 
    // Or from configuration?
    // For now, this is probably okay but won't be good enough for RTM.
    this.mediaControlProvider.setupAudioGraph();

  }

  // ██      ██ ███████ ████████
  // ██      ██ ██         ██
  // ██      ██ ███████    ██
  // ██      ██      ██    ██
  // ███████ ██ ███████    ██

  refreshMediaInputs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(refreshMediaInputsAction),
      tap((action) => {
        console.log('Refresh media inputs.');
      }),
      mergeMap((action) =>
        from(Devices.getAvailableInputs()).pipe(
          map((inputs) => refreshMediaInputsSucceededAction({ inputs })),
          tap(inputs => console.log("Refreshed media inputs.", inputs)),
          catchError((e) => {
            console.log('Failed to refresh media inputs.');
            console.log(e);
            return EMPTY;
          })
        )
      )
    )
  );

  refreshMediaOutputs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(refreshMediaOutputsAction),
      tap((action) => {
        console.log('Refresh media outputs.');
      }),
      mergeMap((action) =>
        from(Devices.getAvailableOutputs()).pipe(
          map((outputs) => refreshMediaOutputsSucceededAction({ outputs })),
          tap(outputs => console.log("Refreshed media outputs.", outputs)),
          catchError((e) => {
            console.log('Failed to refresh media outputs.');
            console.log(e);
            return EMPTY;
          })
        )
      )
    )
  );

  //  ██████ ██   ██  ██████   ██████  ███████ ███████
  // ██      ██   ██ ██    ██ ██    ██ ██      ██
  // ██      ███████ ██    ██ ██    ██ ███████ █████
  // ██      ██   ██ ██    ██ ██    ██      ██ ██
  //  ██████ ██   ██  ██████   ██████  ███████ ███████

  selectedMediaInputChanged$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(changeSelectedMediaInputAction),
        tap(async (action) => {
          this.mediaControlProvider.audioInputId = action.selectedId; 
          await this.mediaControlProvider.setupAudioGraph();
          console.log('Successfully set media intput.');
        }),
        catchError((e) => {
          console.log('Failed to set media intput.');
          console.log(e);
          return EMPTY;
        })
      ),
    { dispatch: false }
  );

  selectedMediaOutputChanged$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(changeSelectedMediaOutputAction),
        tap(async (action) => {
          this.mediaControlProvider.audioOutputId = action.selectedId; 
          await this.mediaControlProvider.setupAudioGraph();
          console.log('Successfully set media output.');
        }),
        catchError((e) => {
          console.log('Failed to set media output.');
          console.log(e);
          return EMPTY;
        })
      ),
    { dispatch: false }
  );



  inputGainChanged$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(changeInputGainAction),
        tap(async (action) => {
          this.mediaControlProvider.audioInputGain = action.gain; 
          //await this.mediaControlProvider.setupAudioGraph();
          console.log('Successfully set gain.');
        }),
        catchError((e) => {
          console.log('Failed to set gain.');
          console.log(e);
          return EMPTY;
        })
      ),
    { dispatch: false }
  );


  inputIsMutedChanged$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(changeInputIsMutedAction),
        tap(async (action) => {
          this.mediaControlProvider.audioInputIsMuted = action.isMuted; 
          //await this.mediaControlProvider.setupAudioGraph();
          console.log('Successfully set muting.');
        }),
        catchError((e) => {
          console.log('Failed to set muting.');
          console.log(e);
          return EMPTY;
        })
      ),
    { dispatch: false }
  );

}
