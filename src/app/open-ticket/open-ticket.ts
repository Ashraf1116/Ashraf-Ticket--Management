
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiCallService } from '../api-call-service';

@Component({
  selector: 'app-open-ticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './open-ticket.html',
  styleUrls: ['./open-ticket.css']
})
export class OpenTicket {
  email: string = '';
  password: string = '';
 
  constructor(private http: HttpClient,private router: Router,private apiCallService: ApiCallService) {}

  onSubmit(): void {
    const loginPayload = {
      email: this.email,
      password: this.password
    };

    this.http.post('https://localhost:7092/api/Home/login', loginPayload)
      .subscribe({
        next: (res: any) => {
         

          // Store in Local Storage
          localStorage.setItem("cli_EmailId", res.cli_EmailId);
          localStorage.setItem("cli_Id", res.cli_Id);
          localStorage.setItem("cli_MobileNumber", res.cli_MobileNumber);
          localStorage.setItem("token", res.token);
          localStorage.setItem("role", res.role);
          localStorage.setItem("userData", JSON.stringify(res));

          alert('Login successful!');
            if (res.role === "Admin") {
          this.router.navigate(['/status-ticket']);
        } else {
          this.router.navigate(['/create-ticket']);
        }
      },
        error: (err) => {
          console.error("Login failed", err);
          alert("Invalid login credentials!");
        }
      });
  }


  // getalltickets() {
  //   this.apiCallService.getalltickets().subscribe({
  //     next: (res) => {
  //       if (res.success) {
  //         this.tickets = res.data;
  //       }
  //     },
  //     error: (err) => console.error("Error loading entity types:", err)
  //   });
  // }
}


