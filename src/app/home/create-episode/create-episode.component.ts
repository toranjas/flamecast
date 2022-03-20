import { Component, ChangeDetectionStrategy, Inject, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEpisodeAction } from '@app/episode/store/episode.actions';
import StorageProvider from '@app/shared/services/storage-providers/StorageProvider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-episode',
  templateUrl: './create-episode.component.html',
  styleUrls: ['./create-episode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEpisodeComponent {
  episodeName = '';
  episodeLocation = '';

  constructor(
    private store: Store,
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject('StorageProvider') private storageProvider: StorageProvider,
  ) {}

  async selectFolder() {
    const result = await this.storageProvider.openSelectFolderDialog(
      'Select a folder to save your episode',
      'This one will do',
    );
    if (!result.canceled) {
      this.episodeLocation = result.folder;
      this.cdr.markForCheck();
    }
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

    this.router.navigate(['/information']);
  }
}
