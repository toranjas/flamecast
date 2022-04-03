import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { createEpisodeAction } from '@app/episode/store/episode.actions';
import StorageProvider from '@app/shared/services/storage-providers/storage-provider';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { selectIsEpisodeLoaded } from '@app/episode/store/episode.selectors';
import { WithSubscribe } from '@app/core/mixins/subscription.mixin';

@Component({
  selector: 'app-create-episode',
  templateUrl: './create-episode.component.html',
  styleUrls: ['./create-episode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEpisodeComponent extends WithSubscribe() implements OnInit {
  episodeName = '';
  episodeLocation = '';

  constructor(
    private store: Store,
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject('StorageProvider') private storageProvider: StorageProvider,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.store
        .select(selectIsEpisodeLoaded)
        .subscribe((isLoaded) => this.episodeCreated(isLoaded)),
    );
  }

  selectFolder() {
    const dialog$ = this.storageProvider
      .openSelectFolderDialog('Select a folder to save your episode', 'This one will do')
      .pipe(
        take(1),
        tap((result) => {
          if (!result.canceled) {
            this.episodeLocation = result.folder;
            this.cdr.markForCheck();
          }
        }),
      )
      .subscribe();

    this.subscriptions.add(dialog$);
  }

  createEpisode() {
    // TODO: Validate fields, so it doesn't save if undefined or invalid
    this.store.dispatch(
      createEpisodeAction({
        episodeLocation: `${this.episodeLocation}`,
        episodeInfo: {
          title: this.episodeName,
        },
      }),
    );
  }

  private episodeCreated(isLoaded: boolean) {
    if (isLoaded) {
      this.router.navigate(['/information']);
    }
  }
}
