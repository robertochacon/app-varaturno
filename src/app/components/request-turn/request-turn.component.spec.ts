import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTurnComponent } from './request-turn.component';

describe('RequestTurnComponent', () => {
  let component: RequestTurnComponent;
  let fixture: ComponentFixture<RequestTurnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestTurnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
