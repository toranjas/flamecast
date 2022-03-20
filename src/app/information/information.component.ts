import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { selectEpisodeInfo } from '@app/episode/info/store/info.selectors';
import { emptyEpisodeInfo } from '@app/episode/episode.utils';
import { Store } from '@ngrx/store';
import { startWith, tap } from 'rxjs/operators';
import { changeInfoPropertiesAction } from '@app/episode/info/store/info.actions';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent implements OnInit {
  episodeInfo$ = this.store.select(selectEpisodeInfo).pipe(
    tap((value) => console.log('Episode Info', value)),
    startWith(emptyEpisodeInfo()),
    tap((value) => console.log('Episode Info', value)),
  );

  constructor(private store: Store) {}

  ngOnInit(): void {}

  setShowName = ($event: any) => {
    this.store.dispatch(
      changeInfoPropertiesAction({ showName: $event.target.value }),
    );
  };
  setTitle = ($event: any) => {
    this.store.dispatch(
      changeInfoPropertiesAction({ title: $event.target.value }),
    );
  };
  // releaseDate: Date | undefined;
  setEpisodeNumber = ($event: any) => {
    this.store.dispatch(
      changeInfoPropertiesAction({ episodeNumber: $event.target.value }),
    );
  };
  setDescription = ($event: any) => {
    this.store.dispatch(
      changeInfoPropertiesAction({ description: $event.target.value }),
    );
  };
  setAuthor = ($event: any) => {
    this.store.dispatch(
      changeInfoPropertiesAction({ author: $event.target.value }),
    );
  };
  setCategory = ($event: any) => {
    this.store.dispatch(
      changeInfoPropertiesAction({ category: $event.target.value }),
    );
  };
  setCopyright = ($event: any) => {
    this.store.dispatch(
      changeInfoPropertiesAction({ copyright: $event.target.value }),
    );
  };
}
