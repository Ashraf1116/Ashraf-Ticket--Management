import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTicketStatus } from './user-ticket-status';

describe('UserTicketStatus', () => {
  let component: UserTicketStatus;
  let fixture: ComponentFixture<UserTicketStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTicketStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTicketStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
