import { Component, OnInit } from '@angular/core';
import { loadEpisodeAction } from '@app/episode/store/episode.actions';
import { Store } from '@ngrx/store';
import { startWith } from 'rxjs/operators';
import { loadMostRecentlyUsedItemsAction } from '../store/most-recently-used.actions';
import { selectMostRecentlyUsedItems } from '../store/most-recently-used.selectors';

@Component({
  selector: 'app-most-recently-used',
  templateUrl: './most-recently-used.component.html',
  styleUrls: ['./most-recently-used.component.css'],
})
export class MostRecentlyUsedComponent implements OnInit {
  mostRecentlyUsedItems$ = this.store.select(selectMostRecentlyUsedItems).pipe(startWith([]));

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadMostRecentlyUsedItemsAction());
  }

  loadEpisode = (episodeLocation: string) => {
    this.store.dispatch(loadEpisodeAction({ episodeLocation }));
  };

  refreshMostRecentList = () => {
    this.store.dispatch(loadMostRecentlyUsedItemsAction());
  };
}
