import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { changeInputGainAction, changeInputIsMutedAction, changeSelectedMediaInputAction, changeSelectedMediaOutputAction } from '@app/media-control/store/media-control.actions';
import { selectInputGain, selectInputIsMuted, selectInputs, selectOutputs } from '@app/media-control/store/media-control.selectors';
import { Store } from '@ngrx/store';
import { map, startWith, tap } from 'rxjs/operators';
import { MediaControlProvider, MeteringData, dBFullScaleSamples } from './../../_albedo/audio';

@Component({
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
})
export class RecordComponent implements OnInit, AfterViewInit {

  // Input
  inputs$ = this.store.select(selectInputs).pipe(startWith([]));
  
  inputGain$ = this.store.select(selectInputGain).pipe(
    startWith({ gain: 1.0 }),
    map((project) => project.gain)
  );

  inputIsMuted$ = this.store.select(selectInputIsMuted).pipe(
    startWith({ isMuted: false }),
    map((project) => project.isMuted)
  );


  @ViewChild('leftCurrentPeakDBFS') leftCurrentPeakDBFS: ElementRef;
  @ViewChild('rightCurrentPeakDBFS') rightCurrentPeakDBFS: ElementRef;

  @ViewChild('inputLeftProgress') inputLeftProgress: ElementRef;
  @ViewChild('inputRightProgress') inputRightProgress: ElementRef;

  @ViewChild('inputLeftValue') inputLeftValue: ElementRef;
  @ViewChild('inputRightValue') inputRightValue: ElementRef;

  
  // Output
  outputs$ = this.store.select(selectOutputs).pipe(startWith([]));

  constructor(
    private store: Store,
    @Inject('MediaControlProvider')
    private mediaControlProvider: MediaControlProvider,
  ) {
    mediaControlProvider.inputMeteringCallback = this.inputMeteringCallback;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  // ----- DEVICE ----- //

  getSelectedOptionId = (options: HTMLCollection) => {
    if (!options) return null;
    if (options.length === 0) return null;
    return options[0].id;
  };

  selectedInputChanged = ($event: any) => {
    console.log('Inputs changed', $event.target.selectedOptions);
    this.store.dispatch(
      changeSelectedMediaInputAction({
        selectedId: this.getSelectedOptionId($event.target.selectedOptions),
      }),
    );
  };

  selectedOutputChanged = ($event: any) => {
    console.log('Outputs changed', $event.target.selectedOptions);
    this.store.dispatch(
      changeSelectedMediaOutputAction({
        selectedId: this.getSelectedOptionId($event.target.selectedOptions),
      }),
    );
  };

  inputGainChanged = ($event: any) => {
    console.log('Gain changed', $event.target.value);
    this.store.dispatch(changeInputGainAction({ gain: $event.target.value }));
  };

  inputIsMutedChanged = ($event: any) => {
    console.log('Is Muted changed', $event.target.checked);
    this.store.dispatch(
      changeInputIsMutedAction({ isMuted: $event.target.checked })
    );
  };


  // Metering
  private inputMeteringCallback = (meteringData: MeteringData) => {
    // All of this bypasses the ngrx store for performance reasons.
    // It could overwhelm the store with constant updates.

    this.setProgressBarValueToDBFS(
      this.inputLeftProgress,
      meteringData.leftCurrentPeakDBFS,
    );
    this.setProgressBarValueToDBFS(
      this.inputRightProgress,
      meteringData.rightCurrentPeakDBFS,
    );
    this.setSpanTextToDBFS(
      this.inputLeftValue,
      meteringData.leftCurrentPeakDBFS
    );
    this.setSpanTextToDBFS(
      this.inputRightValue,
      meteringData.rightCurrentPeakDBFS
    );
  };

  private setProgressBarValueToDBFS = (
    progressBar: ElementRef<any>,
    dBFS: number,
  ) => {
    if (progressBar) {
      progressBar.nativeElement.value = dBFullScaleSamples.toVisualMeterRange(
        dBFS,
        0,
        100,
      );
    }
  };

  private setSpanTextToDBFS = (
    span: ElementRef<any>,
    dBFS: number,
  ) => {
    if(span){
      span.nativeElement.textContent = dBFS.toFixed(2);
    }
  };
}
