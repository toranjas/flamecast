import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostRecentlyUsedComponent } from './most-recently-used.component';

describe('MostRecentlyUsedComponent', () => {
  let component: MostRecentlyUsedComponent;
  let fixture: ComponentFixture<MostRecentlyUsedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MostRecentlyUsedComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostRecentlyUsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
