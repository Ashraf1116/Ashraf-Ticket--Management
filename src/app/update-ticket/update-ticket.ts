import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallService } from '../api-call-service';

@Component({
  selector: 'app-update-ticket',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './update-ticket.html',
  styleUrls: ['./update-ticket.css']
})
export class UpdateTicket implements OnInit {
  ticketForm: FormGroup;
  submitting: boolean = false;
  serverResponse: any;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private apiCallService: ApiCallService,
    private router: Router
  ) {
    this.ticketForm = this.fb.group({
      tic_UniqueNum: [{ value: '', disabled: true }, Validators.required],
      tic_Status: [1, Validators.required],
      tic_Name: ['', Validators.required],
      subject: ['', Validators.required],
      description: ['', Validators.required],

    });
  }

  ngOnInit(): void {
  
    this.apiCallService.selectedTicket.subscribe(selected => {
      if (selected) {
        this.fillForm(selected);
      }
    });

    
    this.apiCallService.currentTicket.subscribe(state => {
      if (state && state.data && !this.ticketForm.value.tic_UniqueNum) {
        const ticketNo = Number(state.ticketNo);
        const ticket = state.data.find(
          (x: any) => x.getAllTickets.tic_UniqueNum === ticketNo
        );
        if (ticket) {
          this.fillForm(ticket);
        }
      }
    });
  }

  private fillForm(ticket: any) {
    debugger;
    console.log("Autofill ticket data:", ticket);
    this.ticketForm.patchValue({
      tic_UniqueNum: ticket.tic_UniqueNum || ticket.getAllTickets?.tic_UniqueNum,
      tic_Status: ticket.tic_StatusId || ticket.getAllTickets?.tic_Status || 1,
      tic_Name: ticket.tic_Name || ticket.getAllTickets?.tic_Name,
      subject: ticket.subject || ticket.getAllTickets?.subject,
      description: ticket.description || ticket.getAllTickets?.description,
     
    });
  }

  get f() {
    return this.ticketForm.controls;
  }

onSubmitUpdate(): void {
  if (this.ticketForm.invalid) return;

  this.submitting = true;
  this.serverResponse = null;
  this.errorMessage = '';

  const raw = this.ticketForm.getRawValue();
  const payload = {
    ...raw,
    tic_Status: Number(raw.tic_Status)
  };

  this.apiCallService.updateTicket(payload).subscribe({
    next: (res: any) => {
      this.submitting = false;

      
      this.serverResponse = res;

      
      setTimeout(() => {
          this.serverResponse = null;
      }, 3000);
       this.router.navigate(['/status-ticket']);
    },
    error: (err) => {
      this.submitting = false;

      this.errorMessage = err?.error?.message 
        || "Failed to update ticket. Please try again.";

     
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);

      console.error(err);
    }
  });
}









  resetForm() {
  this.apiCallService.selectedTicket.subscribe(selected => {
    if (selected) {
      this.fillForm(selected);
    }
  }).unsubscribe(); 
}


  onCancel() {
    this.router.navigate(['/status-ticket']);
  }
}
