import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiCallService } from '../api-call-service';

@Component({
  selector: 'app-check-ticket',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule ],   
  templateUrl: './check-ticket.html',
  styleUrl: './check-ticket.css',
})
export class CheckTicket {
  
  ticketForm!: FormGroup;


  constructor(private fb: FormBuilder, private http: HttpClient,private apiCallService: ApiCallService,  private router: Router) {}

  ngOnInit() {
    this.ticketForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      ticketNumber: ['', Validators.required]
    });
  }

onSubmit() {
  if (this.ticketForm.invalid) {
    this.ticketForm.markAllAsTouched();
    return;
  }

  const payload = {
    email: this.ticketForm.value.email,
    tic_UniqueNo: Number(this.ticketForm.value.ticketNumber)
  };

  this.http.post<any>('https://localhost:7092/api/Home/TicketLogin', payload)
    .subscribe(res => {
      if (res.success) {

        if (res.data && res.data.length > 0) {
          localStorage.setItem("role", res.data[0].role);   
        }
       
        this.apiCallService.setTicket({
          data: res.data,
          ticketNo: this.ticketForm.value.ticketNumber
        });

      

        this.router.navigate(['/view-ticket']);
      } else {
        alert("Invalid ticket number or email");
      }
    });
}
}
