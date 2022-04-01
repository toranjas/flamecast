import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { WithSubscribe } from '@app/core/mixins/subscription.mixin';
import { EpisodeInfo } from '@app/episode/episode.models';
import { selectEpisodeInfo } from '@app/episode/info/store/info.selectors';
import { changeInfoPropertiesAction } from '@app/episode/info/store/info.actions';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent extends WithSubscribe() implements OnInit {
  /**
   * Auto-save fields might fail, this flag will determine if there is something unsaved
   */
  isPendingUpdates = false;
  /**
   * UI Model for binding episode info
   */
  episodeInfo: EpisodeInfo;

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.store
        .select(selectEpisodeInfo)
        .pipe(take(1)) // No need to keep updating
        .subscribe((episode) => {
          this.episodeInfo = { ...episode };
        }),
    );
  }

  updateInfo() {
    // TODO: Must validate before saving (eg.: If there are)
    this.store.dispatch(changeInfoPropertiesAction(this.episodeInfo));
  }
}
