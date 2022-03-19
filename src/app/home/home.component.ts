import { Component, OnInit } from '@angular/core';
import {
  createEpisodeAction,
  loadEpisodeAction,
} from '@app/episode/store/episode.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  episodeIdentifier = '';

  // Initialization
  constructor(private store: Store) {}

  ngOnInit(): void {
    console.log('HomeComponent INIT');
  }

  // Event handlers
  episodeIdentifierChange = ($event: any) => {
    this.episodeIdentifier = $event.target?.value ?? '';
  };

  createEpisode = async () => {
    await this.store.dispatch(
      createEpisodeAction({ episodeLocation: this.episodeIdentifier }),
    );
  };

  loadEpisode = async () => {
    await this.store.dispatch(
      loadEpisodeAction({ episodeLocation: this.episodeIdentifier }),
    );
  };
}
