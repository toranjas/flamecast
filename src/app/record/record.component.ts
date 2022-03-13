import { Component, OnInit } from '@angular/core';
import { changeSelectedMediaInputAction, changeSelectedMediaOutputAction } from '@app/media-control/store/media-control.actions';
import { selectInputs, selectOutputs } from '@app/media-control/store/media-control.selectors';
import { Store } from '@ngrx/store';
import { startWith, tap } from 'rxjs/operators';

@Component({
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  inputs$ = this.store.select(selectInputs).pipe(startWith([]));

  outputs$ = this.store.select(selectOutputs).pipe(startWith([]));

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

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
      })
    );
  };

  selectedOutputChanged = ($event: any) => {
    console.log('Outputs changed', $event.target.selectedOptions);
    this.store.dispatch(
      changeSelectedMediaOutputAction({
        selectedId: this.getSelectedOptionId($event.target.selectedOptions),
      })
    );
  };

}
