import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchCardComponent } from './watch-card.component';

describe('WatchCardComponent', () => {
  let component: WatchCardComponent;
  let fixture: ComponentFixture<WatchCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
