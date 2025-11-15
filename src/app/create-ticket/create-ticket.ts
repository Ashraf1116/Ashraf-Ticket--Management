import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiCallService } from '../api-call-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface TicketRequest {
  tic_Name: string;
  subject: string;
  description: string;
  tic_ClientId: number;
}

export interface TicketResponse {
  success: boolean;
  message: string;
  ticketId?: number;
  ticketNumber?: number;
}

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-ticket.html',
  styleUrls: ['./create-ticket.css'],
})
export class CreateTicket {
  ticketForm!: FormGroup;
  submitting = false;
  serverResponse: TicketResponse | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient,private apiCallService: ApiCallService,  private router: Router) {}

  // ngOnInit(): void {
  //   this.ticketForm = this.fb.group({
  //     tic_Name: ['', [Validators.required, Validators.maxLength(100)]],
  //     subject: ['', [Validators.required, Validators.maxLength(150)]],
  //     description: ['', [Validators.required, Validators.maxLength(2000)]],
  //     tic_ClientId: [null, [Validators.required, Validators.min(1)]],
  //   });
  // }

  ngOnInit(): void {
  const clientId = localStorage.getItem("cli_Id");

  this.ticketForm = this.fb.group({
    tic_Name: ['', [Validators.required, Validators.maxLength(100)]],
    subject: ['', [Validators.required, Validators.maxLength(150)]],
    description: ['', [Validators.required, Validators.maxLength(2000)]],

    // 👇 Load value, disable control
    tic_ClientId: [
      { value: clientId ? Number(clientId) : null, disabled: true },
      [Validators.required, Validators.min(1)]
    ],
  });
}


  get f() {
    return this.ticketForm.controls;
  }

onSubmitcreate(): void {
    this.errorMessage = null;
    this.serverResponse = null;

    if (this.ticketForm.invalid) {
      this.ticketForm.markAllAsTouched();
      return;
    }

    this.submitting = true;

   // const payload: TicketRequest = this.ticketForm.value;

    const raw = this.ticketForm.getRawValue(); 
const payload: TicketRequest = raw;

    this.apiCallService.registerTicket(payload).subscribe({
      next: (res) => {
        this.serverResponse = res;
        this.resetForm();
        this.submitting = false;
      },
      error: (err) => {
        console.error('RegisterTicket error', err);
        this.errorMessage =
          err?.error?.message ||
          err?.message ||
          'Something went wrong while registering the ticket.';
        this.submitting = false;
      },
    });
  }

  // resetForm(): void {
  //   this.ticketForm.reset();
  //   this.serverResponse = null;
  //   this.errorMessage = null;
  // }

resetForm(): void {
  const clientId = localStorage.getItem("cli_Id");

  this.ticketForm.reset({
    tic_Name: '',
    subject: '',
    description: '',
    tic_ClientId: clientId ? Number(clientId) : null
  });

  this.ticketForm.get("tic_ClientId")?.disable(); // keep disabled
  this.errorMessage = null;
}


  onCancel() {
    this.router.navigate(['/home']);
  }
}
