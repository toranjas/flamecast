import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullPageComponent } from './full-page.component';

describe('FullPageComponent', () => {
  let component: FullPageComponent;
  let fixture: ComponentFixture<FullPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
