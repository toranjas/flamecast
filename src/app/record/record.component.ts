import { Component, OnInit } from '@angular/core';
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

}
