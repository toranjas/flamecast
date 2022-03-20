import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEpisodeAction } from '@app/episode/store/episode.actions';

@Component({
  selector: 'app-create-episode',
  templateUrl: './create-episode.component.html',
  styleUrls: ['./create-episode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEpisodeComponent {
  episodeName = '';
  episodeLocation = '';

  constructor(private store: Store) {}

  createEpisode() {
    this.store.dispatch(
      createEpisodeAction({
        episodeLocation: this.episodeLocation,
      }),
    );
  }
}
