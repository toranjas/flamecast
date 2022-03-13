import { Injectable, Inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Devices } from "./../../../_albedo/audio"
import { from, EMPTY } from "rxjs";
import { tap, mergeMap, map, catchError } from "rxjs/operators";
import { refreshMediaInputsAction, refreshMediaInputsSucceededAction, refreshMediaOutputsAction, refreshMediaOutputsSucceededAction, changeSelectedMediaInputAction, changeSelectedMediaOutputAction } from "./media-control.actions";

@Injectable()
export class MediaControlDeviceEffects {
  constructor(
    private store: Store,
    private actions$: Actions
    // ,
    // @Inject('MediaControlProvider')
    // private mediaControlProvider: MediaControlProvider
  ) {}

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

  // selectedMediaInputChanged$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(changeSelectedMediaInputAction),
  //       tap(async (action) => {
  //         this.mediaControlProvider.audioInput = action.selectedId; 
  //         await this.mediaControlProvider.setupAudioGraph();
  //         console.log('Successfully set media intput.');
  //       }),
  //       catchError((e) => {
  //         console.log('Failed to set media intput.');
  //         console.log(e);
  //         return EMPTY;
  //       })
  //     ),
  //   { dispatch: false }
  // );

  // selectedMediaOutputChanged$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(changeSelectedMediaOutputAction),
  //       tap(async (action) => {
  //         this.mediaControlProvider.audioOutput = action.selectedId; 
  //         await this.mediaControlProvider.setupAudioGraph();
  //         console.log('Successfully set media output.');
  //       }),
  //       catchError((e) => {
  //         console.log('Failed to set media output.');
  //         console.log(e);
  //         return EMPTY;
  //       })
  //     ),
  //   { dispatch: false }
  // );
}
