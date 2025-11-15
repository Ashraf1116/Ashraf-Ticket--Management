import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTicket } from './open-ticket';

describe('OpenTicket', () => {
  let component: OpenTicket;
  let fixture: ComponentFixture<OpenTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenTicket]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenTicket);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
