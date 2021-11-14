import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-full-page',
  templateUrl: './full-page.component.html',
  styleUrls: ['./full-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
