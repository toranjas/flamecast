import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeWizardComponent } from './episode-wizard.component';

describe('EpisodeWizardComponent', () => {
  let component: EpisodeWizardComponent;
  let fixture: ComponentFixture<EpisodeWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EpisodeWizardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
